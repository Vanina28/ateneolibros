const express = require('express');
const router = express.Router();
const { body } = require("express-validator");
const path = require('path');
const fs = require('fs');
const usersController = require('../controllers/usersController.js');
const db = require("../database/models");
const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));


// async function validateEmail(emailRegistrando){  
//   const usersAll = await db.Usuarios.findAll();
//   return usersAll.includes(emailRegistrando);
// }

async function validateEmail(emailRegistrando){  
  const usersAll = await users;
  return usersAll.includes(emailRegistrando);
}

/* Validación del formulario */
const validateFormRegister = [
  body('username').notEmpty().withMessage('Debes completar el campo nombre de usuario').isLength({ min: 2 }).withMessage('Los nombres de usuario deben tener al menos 2 caracteres'),
  body('email').notEmpty().withMessage('Debes completar el campo de email').isEmail().withMessage('Debes ingresar un email valido').custom((value, {req}) => (validateEmail(req.body.email))).withMessage('El correo ya existe'),
  body('password').notEmpty().withMessage('Debes completar el campo de contraseña').isLength({ min: 6 }).withMessage('Debes generar una contraseña de al menos 6 caracteres').isStrongPassword({minLength: 6, minLowercase: 1, minUppercase: 1, minNumbers: 1,minSymbols: 1}).withMessage('La contraseña no tiene un estandar fuerte'),
  body('password2').notEmpty().withMessage('Debes completar el campo de confirmación de contraseña').isLength({ min: 6 }).withMessage('Debes generar una contraseña de al menos 6 caracteres').custom((value, {req}) => (value === req.body.pass)).withMessage('las contraseñas no coinciden')]
  
/**************  formulario de registro ****************/
const validateLogin= [
  body('email').notEmpty().withMessage('Debes completar el campo de email').isEmail().withMessage('Debes ingresar un email valido'),
  body('pass').notEmpty().withMessage('Debes completar el campo de contraseña').isLength({ min: 6 }).withMessage('La contraseña no es correcta')
];

/************** Validación del formulario ****************/
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

/*** Registro ***/
router.get('/register',guestMiddleware, usersController.register);
router.post('/register',validateFormRegister, usersController.create);

/*** Login ***/
router.get('/login',guestMiddleware, usersController.login);
router.post('/login',validateLogin, usersController.loginProcess);

/*** Profile***/
router.get('/profile',authMiddleware, usersController.profile);

/*** Log out***/
router.get('/logout', usersController.logout);

module.exports = router;