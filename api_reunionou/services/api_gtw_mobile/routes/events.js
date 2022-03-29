let express = require('express');
let axios = require('axios');
let querystring = require('querystring');
let jwt = require('jsonwebtoken');
let fs = require('fs');
let Joi = require('joi');
let router = express.Router();



router.get('/', function(req, res, next){
    res.setHeader('Content-Type', 'application/json;charset=utf-8');

    let id_user = getUUIDFromAuthorization(req.headers.authorization);

    axios
        .get('http://api_events:3000/events?id_user='+id_user)
        .then(result => {
            res.status(result.status).json(result.data);
        })
        .catch(error => {
            if(error.response)
                res.status(error.response.status).json(error.response.data);
            else
                res.status(500).json(error);
        });
});

router.get('/eventsexpired', function(req, res, next){
    res.setHeader('Content-Type', 'application/json;charset=utf-8');

    let id_user = getUUIDFromAuthorization(req.headers.authorization);

    axios
        .get('http://api_events:3000/events/eventsexpired?id_user='+id_user)
        .then(result => {
            res.status(result.status).json(result.data);
        })
        .catch(error => {
            if(error.response)
                res.status(error.response.status).json(error.response.data);
            else
                res.status(500).json(error);
        });
});

router.get('/eventsinvitedexpired', function(req, res, next){
    res.setHeader('Content-Type', 'application/json;charset=utf-8');

    let id_user = getUUIDFromAuthorization(req.headers.authorization);

    axios
        .get('http://api_events:3000/events/eventsinvitedexpired?id_user='+id_user)
        .then(result => {
            res.status(result.status).json(result.data);
        })
        .catch(error => {
            if(error.response)
                res.status(error.response.status).json(error.response.data);
            else
                res.status(500).json(error);
        });
});

router.get('/:id', function(req, res, next){
    res.setHeader('Content-Type', 'application/json;charset=utf-8');

    let id_event = parseInt(req.params['id'], 10);
    if(verifyDataIdEvent(id_event) && !isNaN(id_event)){

        let id_user = getUUIDFromAuthorization(req.headers.authorization);

        axios
            .get('http://api_events:3000/events/'+id_event+"?id_user="+id_user)
            .then(result => {
                res.status(result.status).json(result.data);
            })
            .catch(error => {
                if(error.response)
                    res.status(error.response.status).json(error.response.data);
                else
                    res.status(500).json(error);
            });

    } else{
        res.status(401).json(error401('Id event non valide'));
    }

});

router.get('/:id/invites', function(req, res, next){
    res.setHeader('Content-Type', 'application/json;charset=utf-8');

    let id_event = parseInt(req.params['id'], 10);
    if(verifyDataIdEvent(id_event) && !isNaN(id_event)){

        let id_user = getUUIDFromAuthorization(req.headers.authorization);

        axios
            .get('http://api_events:3000/events/'+id_event+"/invites?id_user="+id_user)
            .then(result => {
                res.status(result.status).json(result.data);
            })
            .catch(error => {
                if(error.response)
                    res.status(error.response.status).json(error.response.data);
                else
                    res.status(500).json(error);
            });

    } else{
        res.status(401).json(error401('Id event non valide'));
    }
});

router.get('/:id/messages', function(req, res, next){
    res.setHeader('Content-Type', 'application/json;charset=utf-8');

    let id_event = parseInt(req.params['id'], 10);
    if(verifyDataIdEvent(id_event) && !isNaN(id_event)){

        let id_user = getUUIDFromAuthorization(req.headers.authorization);

        axios
            .get('http://api_events:3000/events/'+id_event+"/messages?id_user="+id_user)
            .then(result => {
                res.status(result.status).json(result.data);
            })
            .catch(error => {
                if(error.response)
                    res.status(error.response.status).json(error.response.data);
                else
                    res.status(500).json(error);
            });

    } else{
        res.status(401).json(error401('Id event non valide'));
    }
});



router.post('/invite', function(req, res, next){
    res.setHeader('Content-Type', 'application/json;charset=utf-8');

    // Recupere les données du body
    let id_event = req.body.id_event;
    let id_invite = req.body.id_invite;

    if(verifyDataIdEvent(id_event) && verifyDataIdUser(id_invite)){

        let id_user = getUUIDFromAuthorization(req.headers.authorization);

        axios
            .post('http://api_events:3000/events/invite',
                querystring.stringify({
                    'id_event': id_event,
                    'id_user': id_user,
                    'id_invite': id_invite
                }),
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }
            )
            .then(result => {
                res.status(result.status).json(result.data);
            })
            .catch(error => {
                if(error.response)
                    res.status(error.response.status).json(error.response.data);
                else
                    res.status(500).json(error);
            });

    } else{
        res.status(401).json(error401('Données fausses ou manquantes'));
    }
});




router.post('/create', function(req, res, next){
    res.setHeader('Content-Type', 'application/json;charset=utf-8');

    let id_user = getUUIDFromAuthorization(req.headers.authorization);

    axios
        .post('http://api_events:3000/events/create',
            querystring.stringify({
                'titre': req.body.titre,
                'description': req.body.description,
                'date': req.body.date,
                'heure': req.body.heure,
                'lieu': req.body.lieu,
                'id_user': id_user
            }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        )
        .then(result => {
            res.status(result.status).json(result.data);
        })
        .catch(error => {
            if(error.response)
                res.status(error.response.status).json(error.response.data);
            else
                res.status(500).json(error);
        });
});




router.post('/post_message', function(req, res, next){
    res.setHeader('Content-Type', 'application/json;charset=utf-8');

    let id_user = getUUIDFromAuthorization(req.headers.authorization);

    axios
        .post('http://api_events:3000/events/post_message',
            querystring.stringify({
                'id_event': req.body.id_event,
                'message': req.body.message,
                'id_user': id_user
            }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        )
        .then(result => {
            res.status(result.status).json(result.data);
        })
        .catch(error => {
            if(error.response)
                res.status(error.response.status).json(error.response.data);
            else
                res.status(500).json(error);
        });
});

router.delete('/refresheventsexpired', function(req, res, next){

    let id_user = getUUIDFromAuthorization(req.headers.authorization);

    axios
        .delete('http://api_events:3000/events/refresheventsexpired?id_user='+id_user),
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
        .then(result => {
            res.status(result.status).json(result.data);
        })
        .catch(error => {
            if(error.response)
                res.status(error.response.status).json(error.response.data);
            else
                res.status(500).json(error);
        });
        
});


router.post('/accept', function(req, res, next){
    res.setHeader('Content-Type', 'application/json;charset=utf-8');

    let id_user = getUUIDFromAuthorization(req.headers.authorization);

    axios
        .post('http://api_events:3000/events/accept',
            querystring.stringify({
                'id_event': req.body.id_event,
                'message': req.body.message,
                'id_user': id_user
            }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        )
        .then(result => {
            res.status(result.status).json(result.data);
        })
        .catch(error => {
            if(error.response)
                res.status(error.response.status).json(error.response.data);
            else
                res.status(500).json(error);
        });
});




router.post('/decline', function(req, res, next){
    res.setHeader('Content-Type', 'application/json;charset=utf-8');

    let id_user = getUUIDFromAuthorization(req.headers.authorization);

    axios
        .post('http://api_events:3000/events/decline',
            querystring.stringify({
                'id_event': req.body.id_event,
                'message': req.body.message,
                'id_user': id_user
            }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        )
        .then(result => {
            res.status(result.status).json(result.data);
        })
        .catch(error => {
            if(error.response)
                res.status(error.response.status).json(error.response.data);
            else
                res.status(500).json(error);
        });
});







function verifyDataIdUser(id){
    const schema = Joi.string().pattern(/^[a-zA-Z0-9\-]{36}/).required();

    const res = schema.validate(id);
    const { value, error } = res;
    const valid = error == null;
    if (!valid) {
        return false
    } else {
        return true;
    }
}


function verifyDataIdEvent(id){
    const schema = Joi.number().integer().min(1).max(99999999999).required();

    const res = schema.validate(id);
    const { value, error } = res;
    const valid = error == null;
    if (!valid) {
        return false
    } else {
        return true;
    }
}

function getUUIDFromAuthorization(autho){
    let token = autho.split(' ')[1];
    let id_user = null;
    let pKey = fs.readFileSync('./jwt_secret.txt', 'utf-8');
    jwt.verify(token, pKey, {algorithm: 'HS256'}, (err, decoded) => {
        id_user = decoded.sub;
    });

    return id_user;
}

function error401(error){
    return {
        "type": "error",
        "error": "401",
        "message": error
    };
}

module.exports = router;