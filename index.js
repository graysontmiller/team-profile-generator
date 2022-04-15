const inquirer = require("inquirer");

const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");

const generateTeam = require("./src/generated-team");


const team = [];

function promptUser() {
  console.log("Create your team:");
  inquirer
    .prompt([
      {
        type: "input",
        name: "managerName",
        message: "What is the manager's name?",
        validate: (answer) => {
          if ((answer = "")) {
            console.log("Please enter the manager name.");
            return false;
          }
          return true;
        },
      },
      {
        type: "number",
        name: "managerId",
        message: "Enter the manager's ID:",
        validate: (answer) => {
          if (answer <= 0) {
            console.log("Enter a valid id.");
            return false;
          }
          return true;
        },
      },
      {
        type: "input",
        name: "managerEmail",
        message: "What is the manager's email?",
        validate: (email) => {
          valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
          if (valid) {
            return true;
          } else {
            console.log("Please enter a valid email.");
            return false;
          }
        },
      },
      {
        type: "number",
        name: "officeNumber",
        message: "Enter the manager's office number",
        validate: (answer) => {
          if (answer <= 0) {
            console.log("Enter a valid office number");
            return false;
          }
          return true;
        },
      },
    ])
    .then((managerInput) => {
      const manager = new Manager(
        managerInput.managerName,
        managerInput.managerId,
        managerInput.managerEmail,
        managerInput.officeNumber
      );
      createTeam();
      team.push(manager);
      console.log(managerInput);
    });
}

function createTeam() {
  console.log("Creating Team");

  return inquirer
    .prompt([
      {
        type: "list",
        name: "role",
        message: "Add employee role:",
        choices: ["Engineer", "Intern"],
      },
      {
        type: "input",
        name: "employeeName",
        messase: "What is the employee's name?",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("Enter the employee name.");
            return false;
          }
        },
      },
      {
        type: "number",
        name: "id",
        message: "Enter the employee's id:",
        validate: (nameInput) => {
          if (isNaN(nameInput)) {
            console.log("Enter a valid Id.");
            return false;
          } else {
            return true;
          }
        },
      },
      {
        type: "input",
        name: "email",
        message: "Enter employee's email:",
        validate: (email) => {
          valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
          if (valid) {
            return true;
          } else {
            console.log("Enter employee's valid email.");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "github",
        message: "Enter employee's Github username:",
        when: (input) => input.role === "Engineer",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("Enter employee's valid Github username.");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "school",
        message: "Enter employee's school:",
        when: (input) => input.role === "Intern",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("Enter employee's valid school name.");
            return false;
          }
        },
      },
      {
        type: "confirm",
        name: "addEmployee",
        message: "Do you want to add another employee?",
      },
    ])
    .then((employeeData) => {
      let { employeeName, id, email, role, github, school, addEmployee } =
        employeeData;
      let employee;

      if (role === "Engineer") {
        employee = new Engineer(employeeName, id, email, github);
        console.log(employee);
      } else if (role === "Intern") {
        employee = new Intern(employeeName, id, email, school);

        console.log(employee);
      }
      team.push(employee);

      if (addEmployee) {
        return createTeam(team);
      } else {
        return team;
      }
    });
}

promptUser();

