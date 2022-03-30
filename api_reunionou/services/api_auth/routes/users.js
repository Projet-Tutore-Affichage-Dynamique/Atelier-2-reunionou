let express = require('express');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Joi = require('joi');
const Connection = require("../config/connection");
const {BIT} = require("mysql/lib/protocol/constants/types");
let router = express.Router();



router.get('/', function(req, res, next){

    Connection.query("SELECT id, login, email, last_connected FROM utilisateur WHERE admin="+0, (error, result, fields) => {
        if(!error){

            if(result!==undefined && result!==null){

                res.status(200).json({'users': result});

            } else{
                res.status(401).json(error401("Il n'y a pas d'utilisateur correspondant"));
            }

        } else{
            let message = req.app.get('env') === 'development' ? error : "Erreur dans la table utilisateur";
            res.status(500).json(error500(message));
        }
    });

});

router.get('/inactiveusers', function(req, res, next){

    let today=new Date();
    today = today.getUTCFullYear() + '-' +
    ('00' + (today.getUTCMonth())).slice(-2) + '-' +
    ('00' + today.getUTCDate()).slice(-2) + ' ' + 
    ('00' + today.getUTCHours()).slice(-2) + ':' + 
    ('00' + today.getUTCMinutes()).slice(-2) + ':' + 
    ('00' + today.getUTCSeconds()).slice(-2);
    Connection.query("SELECT * FROM utilisateur WHERE last_connected<='"+today+"'", (error, result, fields) => {
        if(!error){

            if(result!==undefined && result!==null){

                res.status(200).json({'users': result});

            } else{
                res.status(401).json(error401("Il n'y a pas d'utilisateur inactifs"));
            }

        } else{
            let message = req.app.get('env') === 'development' ? error : "Erreur dans la table utilisateur";
            res.status(500).json(error500(message));
        }
    });

});


/**
 * Permet à un admin de supprimer les utilisateurs inactifs depuis 1 mois
 */

 router.delete('/deleteinactiveusers', function(req, res, next){

    // Récupérer les données
    let id = req.body.id;

    let dateUnactive=new Date();
    dateUnactive = dateUnactive.getUTCFullYear() + '-' +
    ('00' + (dateUnactive.getUTCMonth())).slice(-2) + '-' +
    ('00' + dateUnactive.getUTCDate()).slice(-2) + ' ' + 
    ('00' + dateUnactive.getUTCHours()).slice(-2) + ':' + 
    ('00' + dateUnactive.getUTCMinutes()).slice(-2) + ':' + 
    ('00' + dateUnactive.getUTCSeconds()).slice(-2);


    // Vérifie que l'utilisateur connecté est bien un admin
    Connection.query("SELECT admin FROM utilisateur WHERE id='"+id+"'", (error, result, fields) => {
        if(!error){
            console.log(result[0])
            if(result[0].admin===1){

                //Supprimer l'utilisateur selectionné
                Connection.query("DELETE FROM utilisateur WHERE last_connected<='"+dateUnactive+"'", (error, result, fields) => {
                    if(!error)
                        res.status(200).json(error401("Suppression des utilisateurs inactifs réussie"));
                    else
                        res.status(500).json(error401("Erreur lors de la suppression des utilisateur"));
                });

            } else
                res.status(401).json(error401("Vous n'etes pas autorisé à supprimer un utilisateur"));
        } else {
            let message = req.app.get('env') === 'development' ? error : "Erreur dans la table utilisateur";
            res.status(500).json(error500(message));
        }
    });

});


router.delete('/:id', function(req, res, next){

    // Récupérer les données
    let id_user = req.params['id'];
    let id = req.body.id;

    // Vérifie que l'utilisateur connecté est bien un admin
    Connection.query("SELECT admin FROM utilisateur WHERE id='"+id+"'", (error, result, fields) => {
        if(!error){

            if(result[0].admin===1){

                //Supprimer l'utilisateur selectionné
                Connection.query("DELETE FROM utilisateur WHERE id='"+id_user+"'", (error, result, fields) => {
                    if(!error)
                        res.status(200).json(error401("Suppression de l'utilisateur réussie"));
                    else
                        res.status(500).json(error401("Erreur lors de la suppression de l'utilisateur"));
                });

            } else
                res.status(401).json(error401("Vous n'etes pas autorisé à supprimer un utilisateur"));
        } else {
            let message = req.app.get('env') === 'development' ? error : "Erreur dans la table utilisateur";
            res.status(500).json(error500(message));
        }
    });

});








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
