
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { body } = require("express-validator");
const adminController = require("../controllers/adminController");


 const validations = require("../middlewares/validations")


let multerDiskStorageUsers = multer.diskStorage({
  destination: (req, file, callback) => {
    let folder = path.join(__dirname, "../public/images/avatars");
    callback(null, folder);
  },
  filename: (req, file, callback) => {
    let imageName = "avatar-" + Date.now() + path.extname(file.originalname);
    callback(null, imageName);
  },
});

let fileUploadUser = multer({ storage: multerDiskStorageUsers });


const db = require("../database/models");

const validateFormEditUser = [
  body('username').notEmpty().withMessage('Debes completar el campo de nombre de usuario'),
  body('email').notEmpty().withMessage('Debes completar el campo de email').isEmail().withMessage('Debes ingresar un email valido'),
  body('pass').notEmpty().withMessage('Debes completar el campo de contraseña').isLength({ min: 6 }).withMessage('Debes generar una contraseña de al menos 6 caracteres'),
  body('password2').notEmpty().withMessage('Debes completar el campo de confirmación de contraseña').isLength({ min: 6 }).withMessage('Debes generar una contraseña de al menos 6 caracteres').custom((value, {req}) => (value === req.body.pass)).withMessage('las contraseñas no coinciden')
];


/************** Validación del formulario ****************/
const authMiddleware = require('../middlewares/authMiddleware');


/*** GET USUARIO ***/
router.get("/users",authMiddleware, adminController.users);

/*** EDITAR USUARIO ***/
router.get("/user/edit/:id",authMiddleware, adminController.editUsers);
router.put("/user/edit/:id", fileUploadUser.single("image"),validateFormEditUser, adminController.updateUser);

/*** ELIMINAR USUARIO***/
router.get("/user/delete/:id", authMiddleware, adminController.deleteUser);
router.delete("/user/delete/:id", adminController.destroyUser);

module.exports = router;