const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const {validationResult} = require('express-validator');
// base de datos 
const db = require("../database/models");

//asignando la carpeta public como recurso estatico
const publicPath = path.resolve(__dirname, './public');
app.use(express.static(publicPath));

const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));


let adminController = {
  index: async (req,res) => {
    let usersDB = await db.Users.findAll();

    res.render('./admin/manageUsers',{
      usersDB,
      user: req.session.userLogged
    });
  },
   // formulario p crear
  add: async (req, res) => {
    let users = await db.Users.findAll();

    res.render('./admin/addProduct',{
      users
    });
  },

  //  formulario de editar
  edit: async (req, res) => {
    const idUser = req.params.id;

		const UsertoEdit = await db.Users.findByPk(idUser);

    res.render('./admin/editProduct',{ 
    users : UsertoEdit, 
  });
    	
  },
  // Clientes - Mostrar todos los clientes
  list: (req, res) => {    
		res.render('./admin/users',{
    dataUsers: users,
    user: req.session.userLogged});
  },
  // Edit 
  editUsers:(req, res) => {
    let idUser = req.params.id;
		userEdit = users.find(item => item.id == idUser);
    res.render('./admin/editUser',{ user : UsertoEdit });
  },
  // Actualizar - método de actualizar
  updateUser: (req, res) => {
    let resultValidation = validationResult(req);
    if(resultValidation.isEmpty()){
      const {username,email,password,password2,idImage} = req.body;
		const idUser = req.params.id;
    const fileNameUser = (req.file) ? req.file.filename : image;
    const usersNews = [];
    users.map(item =>{
			if(item.id == idCustomer){
				item.username_user = name; 
        item.email = email; 
        item.password = pass;
        item.password2 = password2;        
        item.image = idImage;    
        usersNews.push(item);
			}else{
        usersNews.push(item);
      }			
		});		
		fs.writeFileSync(usersFilePath,JSON.stringify(usersNews),'utf-8');
		res.render('./admin/users',{dataUsers: customersNews});	
    }else{
      res.render('./admin/editUser',{
        user : usertoEdit,
        errors: resultValidation.mapped(),
        oldData: req.body,
        user: req.session.userLogged
      });
    }    	
  },
  // Eliminar 
  deleteUser: (req, res) => {
    let idUser = req.params.id;
		UserDelete = users.find(item => item.id == idUser);
    return res.render('./admin/deleteUser',{
      userDelete,
      user: req.session.userLogged
    });
  },
  // Borrar 
  destroyUser: (req, res) => {
    let idUser = req.params.id;
		const UsersNews = [];
		users.map(item =>{
			if(item.id != idUser){
				UsersNews.push(item);
			}			
		});		
		fs.writeFileSync(usersFilePath,JSON.stringify(customersNews),'utf-8');
		res.render('./admin/users',{
      dataUsers: UsersNews,
      user: req.session.userLogged
    });		
  },
}

module.exports = adminController;