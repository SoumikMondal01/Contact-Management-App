const express= require('express');
const router= express.Router();
const {getContact, UpdateContact, createContact, deleteContact, getContacts}= require('../controllers/contactControllers');
const validationToken = require('../middleware/validateTokenHandler');

router.use(validationToken);
router.route('/').get(getContacts).post(createContact)
router.route('/:id').get(getContact).put(UpdateContact).delete(deleteContact);


module.exports = router