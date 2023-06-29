const { Router } = require('express');
const contactoController = require('../controllers/contactoController');
const jwtValidator = require('../middleware/jwtValidator');
const checkFields = require('../middleware/validateFields');
const { check } = require('express-validator');

const router = Router();

router.get(
  '/',
  [check('jwt').not().isEmpty(), checkFields],
  jwtValidator,
  contactoController.getContacts
); // GET CONTACTOS

router.get(
  '/:id',
  [check('jwt').not().isEmpty(), checkFields],
  jwtValidator,
  contactoController.getContactById
); // GET CONTACTOS BY ID

router.post(
  '/',
  [
    check('jwt').not().isEmpty(),
    check('nombre').not().isEmpty(),
    check('numero').not().isEmpty(),
    check('email').not().isEmpty(),
    check('subject').not().isEmpty(),
    check('message').not().isEmpty(),
    checkFields,
  ],
  
  contactoController.createContact
); // POST CONTACTOS

router.put(
  '/:id',
  [check('jwt').not().isEmpty(), checkFields],
  jwtValidator,
  contactoController.updateContact
); // PUT PRODUCTOS

router.delete(
  '/:id',
  [check('jwt').not().isEmpty(), checkFields],
  jwtValidator,
  contactoController.deleteContact
); // DELETE PRODUCTOS

module.exports = router;
