module.exports = {
    PORT:process.env.PORT || '3000',
    MONGO_URI:process.env.MONGO_URI || 'mongodb://arthur12320:34323060@cluster0-shard-00-00-smkvf.mongodb.net:27017,cluster0-shard-00-01-smkvf.mongodb.net:27017,cluster0-shard-00-02-smkvf.mongodb.net:27017/twitterfake?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true',
    JWT_KEY: process.env.JWT_KEY || 'sadasjdsjbsjfbdbfdskfdbjfdsbfksjfbskbfdsjkfb'
}