const mongoose = require('mongoose');

module.exports = async ()=>{
    try {
        mongoose.set('strictQuery', true);
        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log(`Mongodb connected on ${conn.connection.host}`);
    } catch (err) {
        
    }
}