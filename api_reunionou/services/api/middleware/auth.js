const axios = require('axios');

module.exports = function(req, res, next){

    if((req.url !== '/auth/signin' && req.url !== '/auth/signup')){

        if((typeof req.headers.authorization !== undefined) && (typeof req.headers.authorization !== null)){
            let token = req.headers.authorization.split(' ')[1];

            axios
                .post('http://api_auth:3000/auth/check', {
                    body: {
                        'token': token
                    }
                })
                .then(result => {
                    if(result.status !== 200){
                        res.status(result.status).json(result.data);
                    } else {
                        next();
                    }
                })
                .catch(error => {
                    if(error.response)
                        res.status(error.response.status).json(error.response.data);
                    else
                        res.status(500).json(error);
                });

        } else res.status(500).json({'error': "Not Authorized"});

    } else {
        next();
    }
}