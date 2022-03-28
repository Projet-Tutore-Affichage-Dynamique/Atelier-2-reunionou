let express = require('express');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Joi = require('joi');
const Connection = require("../config/connection");
const fs = require('fs');
let router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json;charset=utf-8');

    res.status(500).json({
        "type": "error",
        "error": "500",
        "message": error,
    });

});


router.post('/signin', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json;charset=utf-8');

    let login = req.body.login;
    let pwd = req.body.pwd;
    let user = null;

    Connection.query("SELECT * FROM utilisateur WHERE login='"+login+"'", (error, result, fields) => {
        if(error){
            res.status(500).json(error500(error+' '+login+' '+pwd));
        } else {
            if(result[0] !== null && result[0] !== undefined){

                user = result[0];

                bcrypt.compare(pwd, user.pwd).then((ok) => {
                    if(ok){

                        updated_lastConnection(result[0].id);

                        let privateKey = fs.readFileSync('./jwt_secret.txt');

                        let token = jwt.sign({ admin: result[0].admin, sub: user.id }, privateKey, { algorithm: 'HS256', expiresIn: '2h' });
                        res.status(200).json({'token': token, 'user': user});

                    } else {
                        res.status(401).json(error401("Le mot de passe n'est pas valide"));
                    }
                });

            } else {
                res.status(401).json(error401("L'utilisateur n'existe pas."));
            }
        }
    });
});
router.get('/signin', function(req, res, next) {
    res.status(405).json({
        "type": "error",
        "error": "405",
        "message": "Méthode non autorisée pour cette URL"
    });
});





router.post('/check', function(req, res, next) {

    let token = req.body.token;
    let pKey = fs.readFileSync('./jwt_secret.txt', 'utf-8');

    // Validity token
    jwt.verify(token, pKey, {algorithm: 'HS256'}, (err, decoded) => {
       if(err)  res.status(401).json({'valid': 'no', 'error': 'token non valide'});
       else{
           //Validity uuid
           if(typeof decoded.sub !== undefined){

               // Validity user
               Connection.query("SELECT * FROM utilisateur WHERE id="+"'"+decoded.sub+"'", (error, result, fields) => {
                   if(error) res.status(500).json(error500(error));
                   else {
                       if(typeof result[0] !== undefined){

                           if(result[0].admin === 1)
                               res.status(200).json({'valid': 'yes', 'role': 'admin'});
                           else
                               res.status(200).json({'valid': 'yes', 'role': 'user'});

                       } else {
                            res.status(401).json(error401({'valid': 'no', 'error': 'Utilisateur non existant'}));
                       }
                   }
               });

           } else res.status(401).json({'valid': 'no', 'error': 'uuid non existant'});

       }
    });
});
router.get('/check', function(req, res, next) {
    res.status(405).json({
        "type": "error",
        "error": "405",
        "message": "Méthode non autorisée pour cette URL"
    });
});




router.post('/signup', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json;charset=utf-8');

    //Récupérer les données du body
    let login = req.body.login;
    let pwd = req.body.pwd;
    let confpwd = req.body.confpwd;
    let email = req.body.email;

    //Vérifie si les données sont présente et ne contiennent pas de caractères interdits  ||  Vérifie que les mots de passe sont identiques
    if(verifyDataSignUp(req.body) && confpwd===pwd){

        //Vérifie si le login n'est pas déjà utilisé
        Connection.query("SELECT * FROM utilisateur WHERE login="+"'"+login+"'", (error, result, fields) => {
           if(result[0]===undefined || result[0]===null){

               // Génération du uuid utilisateur  ||  Cryptage du mdp
               let id = uuidv4();
               let salt = bcrypt.genSaltSync(10);
               const hash = bcrypt.hashSync(pwd, salt);
               // Insertion du nouvel utilisateur
               Connection.query("INSERT INTO utilisateur (`id`,`login`,`pwd`,`email`,`admin`,`last_connected`) VALUES ('"+id+"', '"+login+"', '"+hash+"', '"+email+"', "+0+", NOW())", (error, result, fields) => {
                    if(error)
                        res.status(500).json(error500("Création de l'utilisateur impossible"));
                    else
                        res.status(200).json({"message": "Création de l'utilisateur réussie"});
               });

           } else{
               res.status(401).json(error401("Login utilisateur déjà utilisé"));
           }
        });

    } else {
        res.status(401).json(error401('Données fausses ou manquantes'));
    }
});
router.get('/signup', function(req, res, next) {
    res.status(405).json({
        "type": "error",
        "error": "405",
        "message": "Méthode non autorisée pour cette URL"
    });
});






router.post('/modify_pwd', function(req, res, next){
    res.setHeader('Content-Type', 'application/json;charset=utf-8');

    //Récupérer les données du body
    let id_user = req.body.id_user;
    let oldPwd = req.body.oldPwd;
    let newPwd = req.body.newPwd;
    let confPwd = req.body.confPwd;
    let user = null;

    if(verifyDataModifyPwd(req.body) && newPwd===confPwd){

        // Récupère l'ancien mdp dans la bdd
        Connection.query("SELECT pwd FROM utilisateur WHERE id='"+id_user+"'", (error, result, fields) => {
            if(error){
                res.status(500).json(error500(error));
            } else {
                if(result[0] !== null && result[0] !== undefined){
                    user = result[0];

                    bcrypt.compare(oldPwd, user.pwd).then((ok) => {
                        if(ok){

                            let salt = bcrypt.genSaltSync(10);
                            const hash = bcrypt.hashSync(newPwd, salt);
                            // Insertion du nouvel utilisateur
                            Connection.query("UPDATE utilisateur SET pwd='"+hash+"' WHERE id='"+id_user+"'", (error, result, fields) => {
                                if(error)
                                    res.status(500).json(error500("Modification du mot de passe impossible"));
                                else{
                                    let privateKey = fs.readFileSync('./jwt_secret.txt');
                                    let token = jwt.sign({ sub: user.id }, privateKey, { algorithm: 'HS256', expiresIn: '1h' });

                                    res.status(200).json({"message": "Modification du mot de passe réussie", "token": token});
                                }
                            });

                        } else {
                            res.status(401).json(error401("Votre mot de passe n'est pas valide"));
                        }
                    });
                } else {
                    res.status(401).json(error401("L'utilisateur n'existe pas."));
                }
            }
        });

    } else{
        res.status(401).json(error401('Données fausses ou manquantes'));
    }
});





function updated_lastConnection(id){
    let rq = "UPDATE utilisateur SET last_connected = NOW() WHERE id='"+id+"'";

    Connection.query(rq, (error, result, fields) => {
        if(!error)
            return true;
        else
            return false;
    });
}


function verifyDataModifyPwd(data){
    const schema = Joi.object().keys({
        id_user: Joi.string().pattern(/^[a-zA-Z0-9\-]{36}/).required(),
        oldPwd: Joi.string().pattern(new RegExp('^[a-zA-Z0-9\_\*\!\.]{3,30}$')).required(),
        newPwd: Joi.string().pattern(new RegExp('^[a-zA-Z0-9\_\*\!\.]{3,30}$')).required(),
        confPwd: Joi.string().pattern(new RegExp('^[a-zA-Z0-9\_\*\!\.]{3,30}$')).required(),
    });


    const res = schema.validate(data);
    const { value, error } = res;
    const valid = error == null;
    if (!valid) {
        return false
    } else {
        return true;
    }
}

function verifyDataSignUp(data){

    const schema = Joi.object().keys({
        login: Joi.string().min(1).pattern(/^[a-zA-Z0-9]+/).required(),
        pwd: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        confpwd: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        email: Joi.string().email().required()
    });


    const res = schema.validate(data);
    const { value, error } = res;
    const valid = error == null;
    if (!valid) {
        return false
    } else {
        return true;
    }
}

function error401(error){
    return {
        "type": "error",
        "error": "401",
        "message": error
    };
}

function error500(error){
    return {
        "type": "error",
        "error": "500",
        "message": error
    };
}


module.exports = router;
