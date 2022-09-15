const inquirer = require("inquirer");
const mySQL = require("mysql2");
require("console.table");
const employees = require("./controllers/employees");
require("dotenv").config();
const express = require("express");

// set up the port
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// --------------------------------------------------
// handle the connection to the database

const connection = mySQL.createConnection({
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});
connection.connect((err) => {
  if (err) {
    console.log("Not connected to database");
    throw err;
  } else {
    console.log("Connected to database");
  }
  welcome();
});
// ---------------------------------------------
// main inquirer function to handle the questions

function welcome() {
  console.log("Welcome to the Employee Tracker");
  inquirer
    .prompt({
      name: "menu",
      type: "list",
      message: "Welcome",
      choices: [
        "View All Employees",
        "View All Employees By Role",
        "View All Employees By Department",
        "View All Employees By Manager",
        "Add Employee",
        "Add Role",
        "Add Department",
        "Update Employee Role",
      ],
    })
    .then((answer) => {
      switch (answer.menu) {
        case "View All Employees":
          viewAllEmployees();
          break;
        case "View ALL Employees By Role":
          viewRole();
          break;
        case "View ALL Employees By Department":
          viewDepartment();
          break;
        case "View All Employees By Manager":
          viewManager();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Add Role":
          addRole();
          break;
        case "Add Deparment":
          addDepartment();
          break;
        case "Update Employee Role":
          updateEmployee();
      }
    });
}
