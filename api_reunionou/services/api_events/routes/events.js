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


/* Invite un utilisateur dans l'évenement */
router.post('/invite', function(req, res, next) {
    res.status(300).json({"message": "Path Not Defined"});
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

                res.status(200).json(error500("Création du nouvel evenement réussie"));

            } else{
                res.status(500).json(error500(error));
            }
        });

    } else{
        res.status(401).json(error401('Données fausses ou manquantes'));
    }
});



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