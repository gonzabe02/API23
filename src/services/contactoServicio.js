const ContactosModel = require("../models/Contacto");

class contactoServicio {
  async getContacts() {
    try {
      const contactos = await ContactosModel.find();
      return contactos;
    } catch (err) {
      console.error(err);
      throw new Error("Error in getContactos Service");
    }
  }

  async getContactById(id) {
    try {
      let contact = await ContactosModel.findOne({_id:id});
      return contact;
    } catch (err) {
      console.error(err);
      throw new Error("Error in getContactById Service");
    }
  }

  async getContactByEmail(cat) {
    try {
      let contact = await ContactosModel.find({ email: cat });
      return contact;
    } catch (err) {
      console.error(err);
      throw new Error("Error in getProductsByEmail Service");
    }
  }

  async isContactRegistered(nombre) {
    try {
      let contact = await ContactosModel.exists({ nombre });
      if(contact){
        return true;
      }
      return false;
    } catch (err) {
      console.error(err);
      throw new Error("Error in isContactRegistered Service");
    }
  }

  async createContact(contact) {
    try {
      let savedContact = await ContactosModel.create(contact);
      return savedContact;
    
    } catch (err) {
      console.error(err);
      throw new Error("Error in createContact Service",err);
    }
  }

  async updateContact(id, fields, contact) {
    try {
      fields.nombre ? contact.nombre = fields.nombre : false;
      fields.numero ? contact.numero = fields.numero : false;
      fields.email ? contact.email = fields.email : false;
      fields.subject ? contact.subject = fields.subject : false;
      fields.message ? contact.message = fields.message : false;

      await ContactosModel.findOneAndUpdate({_id:id}, contact);
      return contact;
    } catch (err) {
      console.error(err);
      throw new Error("Error in updateContact Service");
    }
  }

  async deleteContact(id) {
    try {
      await ContactosModel.findOneAndDelete({_id:id});
    } catch (err) {
      console.error(err);
      throw new Error("Error in delete Service");
    }
  }
}

module.exports = new contactoServicio();