var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/mypuppies', {logging: false})

var Puppy = db.define('puppy', {
  //columns aka schema
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  age: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  favFood: {
    type: Sequelize.STRING,
  },
  fullName: {
    type: Sequelize.VIRTUAL
  }
}, {
  instanceMethods: {
    greet: function() {
      return this.name;
    }
  },
  getterMethods: {
    //
  },
})

var FaveLocation = db.define('faveLocation', {
  address: {
    type: Sequelize.STRING,
    allowNull: false,
  }
})

Puppy.hasOne(FaveLocation) // this puts puppy foreign key/id on fave location model schema
// Puppy.belongsTo(FaveLocation) // --> this puts faveLocation foreign key/id on puppy model schema

module.exports = {
  Puppy,
  FaveLocation,
  db
}

