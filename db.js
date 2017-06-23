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
  hooks: {
    //
  },
  classMethods: {

  },
  instanceMethods: {
    greet: function() {
      return this.name;
    }
  },
  getterMethods: {
    //
  },
  setterMethods: {
    //
  }
})

var Location = db.define('location', {
  address: {
    type: Sequelize.STRING
  }
})

module.exports = {
  Puppy,
  Location,
  db
}

