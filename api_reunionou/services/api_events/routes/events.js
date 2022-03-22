var express = require('express');
const { v4: uuidv4 } = require('uuid');
const Joi = require('joi');
const Connection = require("../config/connection");
var router = express.Router();

/* Récupère tous les évenements de l'utilisateur */
router.get('/', function(req, res, next) {
    res.status(300).json({"message": "Path Not Defined"});
});


/* Récupère les données de l'évenement */
router.get('/:id', function(req, res, next) {
    res.status(300).json({"message": "Path Not Defined"});
});


// Récupère tous les messages de l'event  --  URL = localhost/events/:id/messages?id_user='[id_user]'
router.get('/:id/messages', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json;charset=utf-8');

    // Récupère les données
    let id_event = req.param['id'];
    let id_user = req.query['id_user'];
    if(id_user!==undefined&&id_user!==null){

        Connection.query("SELECT id_createur, message, date FROM messages WHERE id_event='"+id_event, (error, result, fields) => {
           if(!error){
               let datas = {
                   "messages": result
               };

               //Verifie si l'utilisateur est le créateur de l'evenement
               Connection.query("SELECT * FROM events WHERE id_createur='"+id_user+"'", (error, result, fields) => {
                   if(!error){
                       if(result[0]!==undefined && result[0]!==null){
                           res.status('200').json(datas);
                       } else{

                           //Vérifie si l'utilisateur est invité à l'evenement
                           Connection.query("SELECT * FROM invitation WHERE id_event='"+id_event+"' AND id_invite='"+id_user+"'", (error, result, fields) => {
                               if(!error){
                                   if(result[0]!==undefined && result[0]!==null){

                                       res.status('200').json(datas);

                                   } else{
                                       res.status(401).json(error401("Vous n'etes pas autorisé à accéder à cet évenement"));
                                   }
                               } else {
                                   let message = req.app.get('env') === 'development' ? error : "Erreur dans la table events";
                                   res.status(500).json(error500(message));
                               }
                           });

                       }

                   } else {
                       let message = req.app.get('env') === 'development' ? error : "Erreur dans la table events";
                       res.status(500).json(error500(message));
                   }
               });

           } else{
               let message = req.app.get('env') === 'development' ? error : "Erreur lors de la récupération des messages";
               res.status(500).json(error500(message));
           }
        });

    } else
        res.status(401).json(error401("L'id utilisateur n'existe pas"));
});


/* Invite un utilisateur dans l'évenement */
router.post('/invite', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json;charset=utf-8');

    // Recupere les données du body
    let id_event = req.body.id_event;
    let id_user = req.body.id_user;
    let id_invite = req.body.id_invite;

    // Verifie si l'event est bien a l'utilisateur
    Connection.query("SELECT * FROM events WHERE id_createur='"+id_user+"' AND id='"+id_event+"'", (error, result, fields) => {
       if(!error){
           if(result[0]!==undefined && result[0]!==null){

               // Verifie si l'utilisateur existe
               Connection.query("SELECT * FROM utilisateur WHERE id='"+id_invite+"'", (error, result, fields) => {
                   if(!error){
                       if(result[0]!==undefined && result[0]!==null){

                           // Insert l'utilisateur
                           Connection.query("INSERT INTO invitation VALUES ('"+id_event+"', '"+id_invite+"', "+0+")", (error, result, fields) => {
                              if(!error){

                                  res.status(200).json({"message": "Invitation de l'utilisateur à l'event réussie"});

                              } else{
                                  let message = req.app.get('env') === 'development' ? error : "Erreur lors de l'insertion d'une invitation";
                                  res.status(500).json(error500(message));
                              }
                           });

                       } else{
                           res.status(401).json(error401("L'utilisateur que vous voulez inviter n'existe pas"));
                       }

                   } else{
                       let message = req.app.get('env') === 'development' ? error : "Erreur avec la base de données Utilisateur";
                       res.status(500).json(error500(message));
                   }
               });

           } else{
               res.status(401).json(error401("Cet event ne vous appartient pas ou il n'existe pas"));
           }

       } else{
           let message = req.app.get('env') === 'development' ? error : "Erreur avec la base de données event";
           res.status(500).json(error500(message));
       }
    });
});


/* Créer un nouvel évenement */
router.post('/create', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json;charset=utf-8');

    //Récupérer les données du body
    let titre = req.body.titre;
    let description = req.body.description;
    let date = req.body.date;
    let heure = req.body.heure;
    let lieu = req.body.lieu;
    let id_user = req.body.id_user;

    if(verifyDataCreate(req.body)){

        let date_RV = dateToMysqlFormat(new Date(date+" "+heure+":00"));
        console.log("INSERT INTO events (`id_createur`, `titre`, `description`, `date_RV`, `geoloc`) VALUES ('"+id_user+"', '"+titre+"', '"+description+"', '"+date_RV+"', '"+lieu+"')");

        Connection.query("INSERT INTO events (`id_createur`, `titre`, `description`, `date_RV`, `geoloc`) VALUES ('"+id_user+"', '"+titre+"', '"+description+"', '"+date_RV+"', '"+lieu+"')", (error, result, fields) => {
            if(!error){

                res.status(200).json({"message": "Création du nouvel evenement réussie"});

            } else{
                let message = req.app.get('env') === 'development' ? error : "Erreur lors de la création du nouvel evenement";
                res.status(500).json(error500(message));
            }
        });

    } else{
        res.status(401).json(error401('Données fausses ou manquantes'));
    }
});


/* Créer un nouveau message */
router.post('/post_message', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json;charset=utf-8');

    //Récupérer les données du body
    let id_event = req.body.id_event;
    let message = req.body.message;
    let id_user = req.body.id_user;

    if(verifyDataMessage(req.body)){

        Connection.query("INSERT INTO messages (`id_event`,`id_createur`,`message`, `date`) VALUES ('"+id_event+"', '"+id_user+"', '"+message+"', NOW())", (error, result, fields) => {
            if(!error){

                res.status(200).json({"message": "Envoie du message réussie"});

            } else{
                let message = req.app.get('env') === 'development' ? error : "Erreur lors de l'envoie du message";
                res.status(500).json(error500(error));
            }
        });

    } else{
        res.status(401).json(error401('Données fausses ou manquantes'));
    }
});



function verifyDataMessage(data){
    const schema = Joi.object().keys({
        id_event: Joi.number().integer().min(1).max(99999999999).required(),
        message: Joi.string().min(1).max(256).required(),
        id_user: Joi.string().pattern(/^[a-zA-Z0-9\-]{36}/).required(),
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


function verifyDataCreate(data){

    const schema = Joi.object().keys({
        titre: Joi.string().min(1).pattern(/^[a-zA-Z0-9\s]+/).max(128).required(),
        description: Joi.string().min(1).max(256).required(),
        date: Joi.string().required(),
        heure: Joi.string().pattern(/^[0-9]{2}:{1}[0-9]{2}/).required(),
        lieu: Joi.string().min(1).max(256).required(),
        id_user: Joi.string().pattern(/^[a-zA-Z0-9\-]{36}/).required(),
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

function dateToMysqlFormat(date) {
    return date.toISOString().slice(0, 19).replace('T', ' ');
};

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