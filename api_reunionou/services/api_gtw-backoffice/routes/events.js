let express = require('express');
let axios = require('axios');
let querystring = require('querystring');
let jwt = require('jsonwebtoken');
let fs = require('fs');
let Joi = require('joi');
let router = express.Router();



router.get('/all', function(req, res, next){

    console.log(verify_adminUser(req.headers.authorization));
    if(verify_adminUser(req.headers.authorization)){
        console.log('coucou');

        axios
            .get('http://api_events:3000/events/all')
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
        res.status(401).json({"error": "Vous n'etes pas authorisé à accéder à l'api pour admin"});
    }
});



router.delete('/:id', function(req, res, next){

    if(verify_adminUser(req.headers.authorization)){

        let id = getUUIDFromAuthorization(req.headers.authorization);
        let id_user = verifyDataIdEvent(req.params['id']);

        axios
            .delete('http://api_users:3000/events/'+id_user,
                querystring.stringify({
                    "id_user": id
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
        res.status(401).json({"error": "Vous n'etes pas authorisé à accéder à l'api pour admin"});
    }
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

function verify_adminUser(autho){
    let token = autho.split(' ')[1];
    let pKey = fs.readFileSync('./jwt_secret.txt', 'utf-8');

    try{
        let decoded = jwt.verify(token, pKey, {algorithm: 'HS256'});

        return (decoded.admin === 1);
    } catch(err){
        return false;
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