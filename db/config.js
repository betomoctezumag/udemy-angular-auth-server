const mongoose = require("mongoose");

const dbConnect = async() => {
    try {
        await mongoose.connect(process.env.MONGO_DB);
        console.log('DB online');
    } catch (error) {
        console.log(error);
        throw new Error('No fue posible conectarse a la base de datos');
    }
};

module.exports = { dbConnect };