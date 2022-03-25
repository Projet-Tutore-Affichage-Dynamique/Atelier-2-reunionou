let express = require('express');
let axios = require('axios');
let querystring = require('querystring');
const fs = require("fs");
const jwt = require("jsonwebtoken");
let router = express.Router();

/* GET users listing. */
router.post('/signin', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json;charset=utf-8');

    let login, password;

    if(req.headers.authorization) {
        const base64Credentials = req.headers.authorization.split(' ')[1];
        const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
        [login, password] = credentials.split(':');

        console.log("login: "+login+"  mdp: "+password);

        axios
            .post('http://api_users:3000/auth/signin',
                querystring.stringify({
                        'login': login,
                        'pwd': password
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
        res.status(401).json({"error": "Missing Credentials"});
    }
});





router.post('/modify_pwd', function(res, req , next){
    res.setHeader('Content-Type', 'application/json;charset=utf-8');

    //Récupérer les données du body
    let oldPwd = req.body.oldPwd;
    let newPwd = req.body.newPwd;
    let confPwd = req.body.confPwd;
    let id_user = getUUIDFromAuthorization(req.headers.authorization);

    axios
        .post('http://api_users:3000/auth/modify_pwd',
            querystring.stringify({
                "id_user": id_user,
                "oldPwd": oldPwd,
                "newPwd": newPwd,
                "confPwd": confPwd
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