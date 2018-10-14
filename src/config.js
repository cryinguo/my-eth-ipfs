const config = {
    express: {
        // when deployed , change url host
        host: "localhost", 
        port: '3001', 
        url: `http://{host}:port`      
    },

    db: {
        url:`mongodb://localhost:27017/test`,
    },

    ipfsApi: {
        host: `localhost`
    }

}

module.exports = config;