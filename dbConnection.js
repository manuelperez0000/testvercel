const mongoose = require('mongoose')
require('dotenv').config({ path: '.env' })
const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.NODE_ENV_MONGO);
        console.log('DB connected');
    } catch (error) {
        console.log('DB error', error);
    }
}
module.exports = dbConnect;