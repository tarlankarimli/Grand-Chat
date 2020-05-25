const config = {
    development: {
        url: 'http://173.212.220.153:8090'
    },
    production: {
        url: 'http://173.212.220.153:8090'
    }
}

export default config[process.env.NODE_ENV]