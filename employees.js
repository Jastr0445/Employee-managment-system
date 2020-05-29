var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "employee_DB"
});

connection.connect(function(err) {
  if (err) throw err;
  runSearch();
});
// make sure all cases are corrrect //
function runSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "Find all employees",
        "Find all departments",
        "Find all roles",
        "add employees ",
        "add departments",
        "add roles",
        "update employee role"

      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "Find all employees":
        employeeSearch();
        break;

      case "Find all departments":
        multiSearch();
        break;

      case "Find all roles":
        rangeSearch();
        break;

      case "Search for a specific employee":
        employeeSearch();
        break;


      } 
    });
}
// crud functions //

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  //createProduct();
});

function createEmployee() {
  console.log("Inserting a new employee...\n");
  var query = connection.query(
    "INSERT INTO employee SET ?",
    {
     first_name: "john",
     last_name: "doe",
     role_id: 8,
    },
    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " employee inserted!\n");
      // Call updateProduct AFTER the INSERT completes
      //updateProduct();
    }
  );

  // logs the actual query being run //
  console.log(query.sql);
}
// find out how to set primary key //
function createDepartment() {
  console.log("Inserting a new department...\n");
  var query = connection.query(
    "INSERT INTO department SET ?",
    {
      flavor: "Rocky Road",
      price: 3.0,
      quantity: 50
    },
    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " product inserted!\n");
      // Call updateProduct AFTER the INSERT completes
      //updateProduct();
    }
  );

  // logs the actual query being run
  console.log(query.sql);
}
function createRoles() {
  console.log("Inserting a new role...\n");
  var query = connection.query(
    "INSERT INTO role SET ?",
    {
      title: "webmaster",
      salary: 5000,
      department: 10,
    },
    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " role inserted!\n");
      // Call update AFTER the INSERT completes
      updateRole();
    }
  );

  // logs the actual query being run
  console.log(query.sql);
}

function updateEmployeeRole() {
  console.log("Updating employee role...\n");
  var query = connection.query(
    "UPDATE employee SET ? WHERE ?",
    [
      {
        first_name: "justin",
      },
      {
        id: 7
      }
    ],
    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " employee role updated!\n");
      // Call deleteProduct AFTER the UPDATE completes
      //updateRole();
    }
  );

  // logs the actual query being run
  console.log(query.sql);
}


// search functions //
function employeeSearch() {
  inquirer
    .prompt({
      name: "employee",
      type: "input",
      message: "Which employee would you like to search for?"
    })
    .then(function(answer) {
      var query = "SELECT title, name, department FROM employee WHERE ?";
      connection.query(query, { employee: answer.employee }, function(err, res) {
        for (var i = 0; i < res.length; i++) {
          console.log("manager: " + res[i].position + " || department: " + res[i].name + " || title: " + res[i].role);
        }
        runSearch();
      });
    });
}

function multiSearch() {
  var query = "SELECT employee FROM employee GROUP BY employee HAVING count(*) > 1";
  connection.query(query, function(err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].employee);
    }
    runSearch();
  });
}

function rangeSearch() {
  inquirer
    .prompt([
      {
        name: "start",
        type: "input",
        message: "Enter starting title: ",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
      {
        name: "end",
        type: "input",
        message: "Enter ending title: ",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function(answer) {
      var query = "SELECT first_name,last_name,role,department FROM employee_db WHERE position BETWEEN ? AND ?";
      connection.query(query, [answer.start, answer.end], function(err, res) {
        for (var i = 0; i < res.length; i++) {
          console.log(
            "first_name: " +
              res[i].first_name +
              " || last_name: " +
              res[i].last_name +
              " || title: " +
              res[i].role +
              " || department: " +
              res[i].department
          );
        }
        runSearch();
      });
    });
}

function employeeSearch() {
  inquirer
    .prompt({
      name: "employee",
      type: "input",
      message: "Which employee are you looking for?"
    })
    .then(function(answer) {
      console.log(answer.song);
      connection.query("SELECT * FROM employee WHERE ?", { employee: answer.employee }, function(err, res) {
        console.log(
          "salary: " +
            res[0].position +
            " || title: " +
            res[0].song +
            " || manager: " +
            res[0].artist +
            " || department: " +
            res[0].year
        );
        runSearch();
      });
    });
}

function getAllEmployees() {
  
      var query = "SELECT employee.first_name, employee.last_name, role.title, department.name,manager.first_name as managerfirst, manager.last_name as managerlast";
      query += "FROM employee INNER JOIN role ON role.id = employee.role_id";
      query += " INNER JOIN employee as manager ON employee.manager_id = manager.id";
      query += " INNER JOIN department ON department.id = role.department_id";
      connection.query(query, function(err, res) {
        console.log(res.length + " matches found!");
        for (var i = 0; i < res.length; i++) {
          console.log(
            i+1 + ".) " +
              "first_name: " +
              res[i].first_name +
              " last_name: " +
              res[i].last_name +
              " title : " +
              res[i].title +
              " department : " +
              res[i].name +
              " manager : " +
              res[i].managerfirst +
              managerlast
          );
        }

        runSearch();
      });
  
}
