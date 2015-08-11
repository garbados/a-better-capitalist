var util = require('util');
var BaseModel = require('../models/base');

function BaseController () {
  BaseModel.apply(this, arguments);
}

util.inherits(BaseController, BaseModel);

module.exports = BaseController;
