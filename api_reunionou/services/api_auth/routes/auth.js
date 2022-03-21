let express = require('express');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Joi = require('joi');
const Connection = require("../config/connection");
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

    Connection.query("SELECT * FROM admin WHERE login="+"'"+login+"'", (error, result, fields) => {
        if(error){
            res.status(500).json(error500(error+' '+login+' '+pwd));
        } else {
            if(result[0] !== null && result[0] !== undefined){

                user = result[0];

                bcrypt.compare(pwd, user.paswwd).then((res) => {
                    if(res===true){

                        let privateKey = fs.readFileSync('../jwt_secret.txt');

                        let token = jwt.sign({sub: user.uuid}, privateKey, { algortihm: 'HS256', expiresIn: '1h' });
                        res.status(200).json({'token': token});

                    } else {
                        res.status(401).json(error401("Le mot de passe n'est pas valide"));
                    }
                });

            } else {

                Connection.query("SELECT * FROM client WHERE nom_client="+"'"+login+"'", (error, result, fields) => {
                    if(error){
                        res.status(500).json(error500(error+' '+login+' '+pwd));
                    } else {
                        if(result[0] !== null && result[0] !== undefined){

                            user = result[0];

                            bcrypt.compare(pwd, user.paswwd).then((res) => {
                                if(res===true){

                                    let privateKey = fs.readFileSync('../jwt_secret.txt');

                                    let token = jwt.sign({sub: user.uuid}, privateKey, { algortihm: 'HS256', expiresIn: '1h' });
                                    res.status(200).json({'token': token});

                                } else {
                                    res.status(401).json(error401("Le mot de passe n'est pas valide"));
                                }
                            });

                        } else {
                            res.status(401).json(error401("L'utilisateur n'existe pas."));
                        }
                    }
                });
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
    let pKey = fs.readFileSync('../jwt_secret.txt', 'utf-8');

    // Validity token
    jwt.verify(token, pKey, {algorithm: 'HS256'}, (err, decoded) => {
       if(err)  res.status(401).json({'valid': 'no', 'error': 'token non valide'});
       else{
           //Validity uuid
           if(typeof decoded.sub !== undefined){

               // Validity user
               Connection.query("SELECT * FROM admin WHERE uuid="+decoded.sub, (error, result, fields) => {
                   if(error) res.status(500).json(error500(error));
                   else {
                       if(typeof result[0] !== undefined){
                            res.status(200).json({'valid': 'yes', 'role': 'admin'});
                       } else {

                           Connection.query("SELECT * FROM client WHERE uuid="+decoded.sub, (err, result, fields) => {
                                if(error) res.status(500).json(error500(error));
                                else {
                                    if(typeof result[0] !== undefined){
                                        res.status(200).json({'valid': 'yes', 'role': 'client'});
                                    } else res.status(401).json(error401({'valid': 'no', 'error': 'Utilisateur non existant'}));
                                }
                           });
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

    let login = req.body.login;
    let pwd = req.body.pwd;
    let confpwd = req.body.confpwd;

    if(verifyDataSignUp(req.body)){



    } else {
        res.status(401).json(error401('Data Not Found'));
    }
});






function verifyDataSignUp(data){

    const schema = Joi.object().keys({
        login: Joi.string().min(1).pattern(/^[a-zA-Z]+/).required(),
        pwd: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        confpwd: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
    });


    const res = Joi.validate(data, schema);
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
