const dbconnection = require("../dbconnection");
const mySQL = require("mysql2");
// const connection = mySQL.createConnection({
//   host: "localhost",
//   port: 3306,
//   user: "root",
//   password: "L19l6363",
//   database: "employeesdb",
// });
function viewAllEmployees() {
  console.log("View all employees");

  var query = `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
FROM employee e
LEFT JOIN role r
  ON e.role_id = r.id
LEFT JOIN department d
ON d.id = r.department_id
LEFT JOIN employee m
  ON m.id = e.manager_id`;

  connection.query(query, function (err, res) {
    if (err) throw err;

    console.table(res);
    console.log("stop lookin at muh employees!");

    firstPrompt();
  });
}
