USE employees;

INSERT INTO department (name)
VALUES ("Sales");
INSERT INTO department (name)
VALUES ("Engineering");
INSERT INTO department (name)
VALUES ("Finance");
INSERT INTO department (name)
VALUES ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES ("Designer", 100000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Lead Engineer", 150000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 120000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Junior Developer", 80000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("Creative Director", 250000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Tadej", "Pogacar", 1, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jonas", "Vingegaard", 2, 4);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Wout", "Van Aert", 1, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Primoz", "Roglic", 3, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jay", "Vine", 1, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Julian", "Alaphilipe", 4, null);