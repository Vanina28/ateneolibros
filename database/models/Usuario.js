module.exports = function(sequelize, dataTypes){
  
    // Alias de como llamaremos esta tabla en proximas consultas
    let alias = "Usuarios";
  
    //Declarar lo datos de la tabla usuarios
    let cols = {
      idUser:{
        type: dataTypes.NUMBER,
        primaryKey: true,
        allowNull: false,
        validate:{
          notNull: true,
        }
      },
      email:{
        type: dataTypes.STRING(50),
        allowNull: false,
        validate:{
          notNull: true,
          isEmail: true
        }
      },
      username:{
        type: dataTypes.STRING(50),
      },
      password:{
        type: dataTypes.STRING(70),
        allowNull: false,
        validate:{
          notNull: true,
          min: 6,
        }
      },
      password2:{
        type: dataTypes.STRING(70),
        allowNull: false,
        validate:{
          notNull: true,
          min: 6,
          equals: this.pass,
        }
      },
      idImages:{
        type: dataTypes.STRING(100)
      }
    }
  
    // nombre de la tabla en la base de datos
    let config = {
        tableName:'users',
        timestamps: false
    },
  
    let Usuario = sequelize.define(alias,cols, config);
  
    // Relaciones de la tabla Usuarios N:1
    Usuario.associate = function(models){
      Usuario.hasMany(models.idImages,{
        as: "usuarios",
        foreignKey: "idImages"
      })
    }