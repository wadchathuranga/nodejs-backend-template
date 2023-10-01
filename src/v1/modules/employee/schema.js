const mongoose = require("mongoose");

const { Config, Databases } = require('../../../../config');

const { MONGO_DB_NAME_V1 } = Config.APPLICATION;

const conn = Databases.Mongo.connect(MONGO_DB_NAME_V1);

mongoose.connection = conn;

const EmployeeSchema = new mongoose.Schema({
  employeeId: {
    type: String,
    required: [true, 'Employee id required!'],
    unique: true,
    index: true,
  },

  // nicNumber: {
  //   type: String,
  //   required: true,
  //   unique: true,
  //   index: true,
  // },

  employeeName: {
    type: String,
    required: true,
  },

  // gender: {
  //   type: String,
  //   enum: ['Male', 'Female', 'Other'],
  //   required: true,
  // },

  position: {
    type: String,
    required: true,
  },

  // type: {
  //   type: String,
  //   required: true,
  // },

  // dateOfBirth: {
  //   type: Date,
  //   require: true,
  // }
}, { timestamps: true });

EmployeeSchema.statics.findByEmployeeId = function (employeeId) {
  return this.findOne({ employeeId: employeeId });
};

EmployeeSchema.statics.findByNICNumber = function (nicNumber) {
  return this.findOne({ nicNumber: nicNumber });
};

const Employee = mongoose.model("Employee", EmployeeSchema);
module.exports = Employee;
