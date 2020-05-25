const config = {
    development: {
        Localtoken: "token",
        ProfilName: "name"
    },
    production: {
        Localtoken: "token",
        ProfilName: "name"
    }
}

export default config[process.env.NODE_ENV]