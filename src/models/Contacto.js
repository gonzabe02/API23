const mongoose = require('mongoose');
const { Schema } = mongoose;

const ContactosSchema = new Schema({
    nombre:String,
    numero:String,
    email:String,
    subject:String,
    message:String
});

const Contactos = mongoose.model('Contactos',ContactosSchema);

module.exports = Contactos;