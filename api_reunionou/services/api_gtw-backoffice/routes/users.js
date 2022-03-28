let express = require('express');
let axios = require('axios');
let querystring = require('querystring');
const fs = require("fs");
const jwt = require("jsonwebtoken");
const Joi = require('joi');
let router = express.Router();



router.get('/', function(req, res, next){

    if(verify_adminUser(req.headers.authorization)){

        axios
            .get('http://api_users:3000/users/'+req.url, {})
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
        let id_user = verify_IdUser(req.params['id']);

        axios
            .delete('http://api_users:3000/users/'+id_user,
                querystring.stringify({
                    "id": id
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






function verify_adminUser(autho){
    let token = autho.split(' ')[1];
    let pKey = fs.readFileSync('./jwt_secret.txt', 'utf-8');
    jwt.verify(token, pKey, {algorithm: 'HS256'}, (err, decoded) => {
        if(decoded.admin === 1){
            return true;
        } else{
            return false;
        }
    });

}


function verify_IdUser(id){
    const schema = Joi.string().pattern(/^[a-zA-Z0-9\-]+/).required();

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



module.exports = router;