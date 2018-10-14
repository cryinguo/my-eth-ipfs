const config = {
    express: {
        // when deployed , change url host
        url: `http://127.0.0.1:`, 
        port: '3001',       
    },

    db: {
        url:`mongodb://localhost:27017/test`,
    },

    ipfsApi: {
        host: `localhost`
    }

}

module.exports = config;