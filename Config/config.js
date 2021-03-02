const env=process.env.NODE_ENV || 'development'

const config={
    development:{
        port: process.env.PORT,
        dbURL: process.env.DB_URL,
        privateKey: process.env.PRIVATE_KEY
    },
    production:{}
};
module.exports=config[env];