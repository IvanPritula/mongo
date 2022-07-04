const client = require('../index');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


module.exports = () => {
  const db = client();

  return db.collection('users');
};
//рабочая
