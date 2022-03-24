var express = require('express');
const { v4: uuidv4 } = require('uuid');
const Joi = require('joi');
const Connection = require("../config/connection");
var router = express.Router();

/* Récupère tous les évenements de l'utilisateur */
router.get('/', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json;charset=utf-8');

    // Récupère les données de la requête
    let id_user = req.query['id_user'];
    let ev_invite = null;
    let ev_createur = null;

    if(id_user!==undefined&&id_user!==null){

        //Récupère tous les events où il est invité
        let req1 = "SELECT * FROM events WHERE id IN (SELECT id_event FROM invitation WHERE id_invite='"+id_user+"')";
        Connection.query(req1, (error, result, fields) => {
            if(!error){
                if(result[0]!==undefined && result[0]!==null){
                    ev_invite = result;
                }

                //Récupère tous les events créer par l'utilisateur
                let req2 = "SELECT * FROM events WHERE id_createur='"+id_user+"'";
                Connection.query(req2, (error, result, fields) => {
                    if(!error){
                        if(result[0]!==undefined && result[0]!==null){

                            ev_createur = result;

                            res.status(200).json({"events": ev_invite.concat(ev_createur)});

                        } else{
                            if(ev_invite===null)
                                res.status(204).json({"message": "L'utilisateur n'est invité ou n'a créer aucun évenement"});
                            else
                                res.status(200).json({"events": ev_invite});
                        }
                    } else{
                        let message = req.app.get('env') === 'development' ? error : "Erreur dans la table events";
                        res.status(500).json(error500(message));
                    }
                });

            } else{
                let message = req.app.get('env') === 'development' ? error : "Erreur dans la table events";
                res.status(500).json(error500(message));
            }
        });

    } else
        res.status(401).json(error401("Vous devez être connecté pour accéder à ce service"));
});


/**Recupere les evenements passés et créer par un utilisateur */
router.get('/eventsexpired', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json;charset=utf-8');

    // Récupère les données de la requête
    let id_user = req.query['id_user'];

    // Date au format datetime pour comparer avec bdd
    let today=new Date();
    today = today.getUTCFullYear() + '-' +
    ('00' + (today.getUTCMonth()+1)).slice(-2) + '-' +
    ('00' + today.getUTCDate()).slice(-2) + ' ' + 
    ('00' + today.getUTCHours()).slice(-2) + ':' + 
    ('00' + today.getUTCMinutes()).slice(-2) + ':' + 
    ('00' + today.getUTCSeconds()).slice(-2);

    if(id_user!==undefined&&id_user!==null){

        //Récupère tous les events passés par rapport à la date du jour et créer par l'utilisateur
       
        Connection.query("SELECT * FROM events WHERE date_rv<'"+today+"' AND id_createur='"+id_user+"'", (error, result, fields) => {
            if(!error){
                if(result==undefined && result==null){
                    res.status(200).json({"events":result});
                }else{
                    if(result==null){
                        res.status(204).json({"message": "Aucun évènements passés"});
                    }else{
                        res.status(200).json({"events": result});
                    }
                }
            }else{
                let message = req.app.get('env') === 'development' ? error : "Erreur dans la table events";
                res.status(500).json(error500(message));
            }
        });

    }else{
        res.status(401).json(error401("Vous devez être connecté pour accéder à ce service"));
    }
});


/* Récupère les données de l'évenement */
router.get('/:id', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json;charset=utf-8');

    // Récupère les données de la requête
    let id_event = req.params['id'];
    let id_user = req.query['id_user'];

    if(id_user!==undefined&&id_user!==null){

        //Verifie si l'utilisateur est le créateur de l'evenement
        Connection.query("SELECT * FROM events WHERE id_createur='"+id_user+"'", (error, result, fields) => {
            if(!error){
                if(result[0]!==undefined && result[0]!==null){

                    //Récupère les données de l'evenement
                    Connection.query("SELECT * FROM events WHERE id='"+id_event+"'", (error, result, fields) => {
                        if(!error){

                            res.status(200).json({"event": result[0]});

                        } else{
                            let message = req.app.get('env') === 'development' ? error : "Erreur dans la table events";
                            res.status(500).json(error500(message));
                        }
                    });

                } else{

                    //Vérifie si l'utilisateur est invité à l'evenement
                    Connection.query("SELECT * FROM invitation WHERE id_event='"+id_event+"' AND id_invite='"+id_user+"'", (error, result, fields) => {
                        if(!error){
                            if(result[0]!==undefined && result[0]!==null){

                                //Récupère les données de l'evenement
                                Connection.query("SELECT * FROM events WHERE id='"+id_event+"'", (error, result, fields) => {
                                    if(!error){

                                        res.status(200).json({"event": result[0]});

                                    } else{
                                        let message = req.app.get('env') === 'development' ? error : "Erreur dans la table events";
                                        res.status(500).json(error500(message));
                                    }
                                });

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

    } else
        res.status(401).json(error401("Vous devez être connecté pour accéder à ce service"));
});


// Récupère tous les messages de l'event  --  URL = localhost/events/:id/messages?id_user='[id_user]'
router.get('/:id/messages', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json;charset=utf-8');

    // Récupère les données
    let id_event = req.params['id'];
    let id_user = req.query['id_user'];

    if(id_user!==undefined&&id_user!==null){

        //Récupère tous les messages de l'evenement
        Connection.query("SELECT id_createur, message, date FROM messages WHERE id_event='"+id_event+"'", (error, result, fields) => {
           if(!error){
               let datas = {
                   "messages": result[0]
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
        res.status(401).json(error401("Vous devez être connecté pour accéder à ce service"));
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




router.post('/accept', function(req, res, next){
    res.setHeader('Content-Type', 'application/json;charset=utf-8');

    //Récupérer les données
    let msg = " ";
    if(req.body.message!==undefined) msg = req.body.message;
    let id_user = req.body.id_user;
    let id_event = req.body.id_event;

    // Récupérer le nom de l'utilisateur
    Connection.query("SELECT login FROM utilisateur WHERE id='"+id_user+"'", (error, result, fields) => {
        if(!error){

            let login = result[0].login;

            if(login!==null && login!==undefined){

                // Vérifie si l'utilisateur est invité à l'evenement
                Connection.query("SELECT * FROM invitation WHERE id_event='"+id_event+"' AND id_invite='"+id_user+"'", (error, result, fields) => {
                    if(!error){
                        if(result[0]!==undefined && result[0]!==null){

                            // Modifie le status d'invitation de l'utilisateur et insert un message
                            msg = login+" participe a l evenement. "+msg;
                            let rq = "UPDATE invitation SET status="+1+" WHERE id_event="+id_event+" AND id_invite='"+id_user+"'; INSERT INTO messages VALUES ("+id_event+", '"+id_user+"', '"+msg+"', NOW())";
                            console.log(rq);

                            Connection.query(rq, (error, result, fields) => {
                                if(!error){

                                    res.status(200).json({"message": "Vous avez accepter l'invitation"});

                                } else {
                                    let message = req.app.get('env') === 'development' ? error : "Erreur, vous ne pouvez pas rejoindre l'evenement pour l'instant";
                                    res.status(500).json(error500(message))
                                }
                            });

                        } else
                            res.status(401).json(error401("L'utilisateur n'est pas invité à l'evenement"));
                    } else{
                        let message = req.app.get('env') === 'development' ? error : "Erreur lors la vérification dans la table invitation";
                        res.status(500).json(error500(message));
                    }
                });
            } else
                res.status(401).json(error401('Utilisateur non trouvé'));
        } else {
            let message = req.app.get('env') === 'development' ? error : "Erreur lors de la récupération du login utilisateur";
            res.status(500).json(error500(message));
        }
    });
});




router.post("/decline", function(req, res, next){
    res.setHeader('Content-Type', 'application/json;charset=utf-8');

    //Récupérer les données
    let msg = " ";
    if(req.body.message!==undefined) msg = req.body.message;
    let id_user = req.body.id_user;
    let id_event = req.body.id_event;

    // Récupérer le nom de l'utilisateur
    Connection.query("SELECT login FROM utilisateur WHERE id='"+id_user+"'", (error, result, fields) => {
        if(!error){

            let login = result[0].login;

            if(login!==null && login!==undefined){

                // Vérifie si l'utilisateur est invité à l'evenement
                Connection.query("SELECT * FROM invitation WHERE id_event='"+id_event+"' AND id_invite='"+id_user+"'", (error, result, fields) => {
                    if(!error){
                        if(result[0]!==undefined && result[0]!==null){

                            // Modifie le status d'invitation de l'utilisateur et insert un message
                            msg = login+" ne participe pas a l evenement. "+msg;
                            let rq = "UPDATE invitation SET status="+2+" WHERE id_event="+id_event+" AND id_invite='"+id_user+"'; INSERT INTO messages VALUES ("+id_event+", '"+id_user+"', '"+msg+"', NOW())";
                            console.log(rq);

                            Connection.query(rq, (error, result, fields) => {
                                if(!error){

                                    res.status(200).json({"message": "Vous avez decliné l'invitation"});

                                } else {
                                    let message = req.app.get('env') === 'development' ? error : "Erreur, vous ne pouvez pas rejoindre l'evenement pour l'instant";
                                    res.status(500).json(error500(message))
                                }
                            });

                        } else
                            res.status(401).json(error401("L'utilisateur n'est pas invité à l'evenement"));
                    } else{
                        let message = req.app.get('env') === 'development' ? error : "Erreur lors la vérification dans la table invitation";
                        res.status(500).json(error500(message));
                    }
                });
            } else
                res.status(401).json(error401('Utilisateur non trouvé'));
        } else {
            let message = req.app.get('env') === 'development' ? error : "Erreur lors de la récupération du login utilisateur";
            res.status(500).json(error500(message));
        }
    });
});
////// Route pour Rejoindre ou decliner une invitation d'un event //////

////// Route pour Supprimer un event ///////




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