const axios = require('axios');

module.exports = function(req, res, next){

    let test = req.url.split('/');
    //console.log('test: '+test[1]);

    if((req.url !== '/auth/signin' && req.url !== '/auth/signup') && (test[1]==='commandes' || test[1]==='auth')){

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