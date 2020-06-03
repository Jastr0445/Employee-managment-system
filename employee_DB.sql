DROP DATABASE IF EXISTS employee_DB;
CREATE database employee_DB;

USE employee_DB;

CREATE TABLE employee (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT UNSIGNED NOT NULL,
  INDEX role_ind (role_id),
  manager_id INT UNSIGNED,
  INDEX man_ind (manager_id),
  CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
);

CREATE TABLE role (
 id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 title VARCHAR(30) UNIQUE NOT NULL,
 salary DECIMAL NOT NULL,
 department_id INT NOT NULL
);

CREATE TABLE department (
  id INT auto_increment PRIMARY KEY,
  NAME VARCHAR(30) UNIQUE NOT NULL
);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("jon","smith",7);

INSERT INTO role (title, salary, department_id)
VALUES ("webmaster",1000, 10);

INSERT INTO department (name)
VALUES ("tech-support");

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY ''