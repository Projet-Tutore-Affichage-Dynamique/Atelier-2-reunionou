let express = require('express');
let axios = require('axios');
let querystring = require('querystring');
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



router.post('/signup', function(req, res, next){
    res.setHeader('Content-Type', 'application/json;charset=utf-8');

    axios
        .post('http://api_users:3000/auth/signup',
            querystring.stringify(req.body),
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



module.exports = router;