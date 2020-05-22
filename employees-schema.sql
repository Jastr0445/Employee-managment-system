DROP DATABASE IF EXISTS employee_DB;
CREATE database employee_DB;

USE employee_DB;

CREATE TABLE employee (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT UNSIGNED NOT NULL,
  INDEX role_ind (role_id),
  CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,
  manager_id INT UNSIGNED,
  INDEX man_ind (manager_id),
  CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
);

CREATE TABLE role (
  id INT auto_increment PRIMARY key,
 title VARCHAR(30) UNIQUE NOT NULL,
 salary DECIMAL NOT NULL,
 department_id INT NOT NULL,
  INDEX dep_ind (department_id),
);

CREATE TABLE department (
  id INT auto_increment PRIMARY KEY,
  NAME VARCHAR(30) UNIQUE NOT NULL,
);




