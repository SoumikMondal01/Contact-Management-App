const asyncHandler = require("express-async-handler")
const Contact = require ('../models/contactModel')

//GET
const getContacts = asyncHandler(async(req, res)=>{
    const contacts =await Contact.find({user_id: req.user.id});
    res.status(200).json(contacts);
});
//POST
const createContact = asyncHandler(async(req, res)=>{
    console.log(req.body);
    const {name, email, phone}= req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are mendatory");
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id
    })

    res.status(201).json(contact);
});
//GET
const getContact = asyncHandler(async(req, res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found")
    }
    res.status(200).json(contact);
});
//POST
const UpdateContact = asyncHandler(async(req, res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found")
    }

    if(contact.user_id.toString()!== req.user.id){
        res.status(403);
        throw new Error("User don't have permisson to update other user contact")
    }
    
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true }
    )
    res.status(200).json(updatedContact);
});
//DELETE
const deleteContact = asyncHandler(async(req, res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found")
    }
    if(contact.user_id.toString()!==req.user.id){
        res.status(404);
        throw new Error("User don't have permisson to delete others contact")
    }
    await Contact.remove();
    res.status(200).json(contact);
});

module.exports= {getContacts, createContact, UpdateContact, deleteContact, getContact}