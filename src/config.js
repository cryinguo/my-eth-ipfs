const config = {
    express: {
        url: `http://172.26.143.194:`, 
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