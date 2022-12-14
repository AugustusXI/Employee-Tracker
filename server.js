const inquirer = require("inquirer");
const mySQL = require("mysql2");
require("console.table");
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
// -------------------------------
function viewAllEmployees() {
  let sql = `SELECT * FROM employee`;
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.table(result, ["firstName", "lastName", "department"]);
  });
  welcome();
}

// --------------------------------
function viewDepartment() {
  var query = `SELECT d.id, d.name, r.salary AS budget
  FROM employee e
  LEFT JOIN role r
	ON e.role_id = r.id
  LEFT JOIN department d
  ON d.id = r.department_id
  GROUP BY d.id, d.name`;

  connection.query(query, function (err, res) {
    if (err) throw err;

    const departmentChoices = res.map((data) => ({
      value: data.id,
      name: data.name,
    }));

    console.table(res);
    // connection.query("SELECT * FROM departments", function (err, result, fields) {
    //   if (err) throw err;
    // });
    // let departmentList = [];
    // result.forEach((element) => {
    //   departmentList.push({
    //     name: element.name,
    //     value: element.name,
    //   });
    // });
  });
}
function viewRole(assignRole, updateRole) {
  inquirer
    .prompt([
      {
        type: "list",
        name: "employeeId",
        message: "assign an employee a role.",
        choices: assignRole,
      },
      {
        type: "list",
        name: "roleId",
        message: "update a role.",
        choices: updateRole,
      },
    ])
    .then(function (answer) {
      var query = `UPDATE employee SET role_id = ? WHERE id = ?`;
      connection.query(
        query,
        [answer.roleId, answer.employeeId],
        function (err, res) {
          if (err) throw err;

          welcome();
        }
      );
    });
}
function addRole() {
  var query = `SELECT d.id, d.name, r.salary AS budget
  FROM employee e
  LEFT JOIN role r
	ON e.role_id = r.id
  LEFT JOIN department d
  ON d.id = r.department_id
  GROUP BY d.id, d.name`;

  connection.query(query, function (err, res) {
    if (err) throw err;

    const departmentChoices = res.map(({ id, name }) => ({
      value: id,
      name: `${id} ${name}`,
    }));

    console.table(res);

    promptAddRole(departmentChoices);
  });
}
