const contactoServicio = require("../services/contactoServicio");
let instance = null;

class contactoController {
  static getInstance() {
    if (!instance) {
      return new contactoController();
    }
    return instance;
  }

  async getContacts(req, res) {
    try {
      const contact = await contactoServicio.getContacts();
      return res.status(200).json(contact);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        method: "getContacts",
        message: err,
      });
    }
  }

  async getContactById(req, res) {
    try { 
      const id = req.params.id;
      let contact = await contactoServicio.getContactById(id);
      if (!contact) {
        return res.status(404).json({
          method: "getContactById",
          message: "Not Found",
        });
      }
      return res.status(200).json(contact);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        method: "getContactById",
        message: err,
      });
    }
  }

  async getContactByEmail(req, res) {
    try {
      const cat = req.params.cat;
      let contact = await contactoServicio.getContactByEmail(cat);
      return res.status(200).json(contact);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        method: "getProductByEmail",
        message: err,
      });
    }
  }

  async createContact(req, res) {
    try {      
      const contact = req.body
      let isRegistered = await contactoServicio.isContactRegistered(
        contact.nombre
      );
      if (!isRegistered) {
        let newContact = await contactoServicio.createContact(contact);

        return res.status(201).json({
          message: "Created!",
          contact: newContact,
        });
      }
      return res.status(400).json({
        message: "The contact is already registered",
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        method: "createContact",
        message: err.message,
      });
    }
  }

  async updateContact(req, res) {
    try {
      let contact = await contactoServicio.getContactById(req.params.id);
      if (!contact) {
        return res
          .status(404)
          .json({ method: "updateContact", message: "Not Found" });
      }
      const modifiedContact = await contactoServicio.updateContact(
        req.params.id,
        req.body,
        contact
      );
      return res.status(200).json(modifiedContact);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        method: "updateContact",
        message: err,
      });
    }
  }

  async deleteContact(req, res) {
    try {
      let isContact = await contactoServicio.getContactById(req.params.id);
      if (isContact) {
        await contactoServicio.deleteContact(req.params.id);
        return res.status(204).json({ message: "No Content" });
      }
      return res.status(404).json({ message: "Not Found" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        method: "deleteContact",
        message: err,
      });
    }
  }
}

module.exports = new contactoController();