-- Active: 1678859769284@@127.0.0.1@3306@inventorymanagement

DROP DATABASE inventorymanagement;
create database inventorymanagement;
use inventorymanagement;
-- Table Creation
CREATE TABLE roles(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
					role varchar(50));
create table departments(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
						department varchar(50));

create table categories(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
						category varchar(50));

create table employees(id INT NOT NULL auto_increment primary KEY,
						firstname VARCHAR(100),
						lastname VARCHAR(50),
						birthdate DATETIME,hiredate DATETIME,
						contactnumber VARCHAR(20),email VARCHAR(50),password VARCHAR(15) NOT NULL,
						imageurl varchar (50),
						gender ENUM('male','female','other') NOT NULL,
						departmentid  int not null,constraint fk_departmentid foreign key(departmentid) references departments(id) on update cascade on delete cascade,
						roleid int not null,constraint fk_roleid foreign key(roleid) references roles(id) on update cascade on delete cascade);


CREATE TABLE materials(id INT NOT NULL AUTO_INCREMENT primary KEY,
						title VARCHAR(100),
						categoryid INT NOT NULL, constraint fk_categoryid FOREIGN KEY(categoryid) REFERENCES categories(id) on UPDATE cascade on delete cascade,
						quantity INT NOT NULL,
						unitprice INT NOT NULL,
						imageurl varchar (50));
 
create table floors(id INT NOT NULL AUTO_INCREMENT primary KEY, 
					level varchar(20),
					categoryid int not null,constraint fk_category_id foreign key(categoryid) references categories(id) on update cascade on delete cascade);

create table sections(id INT NOT NULL AUTO_INCREMENT primary KEY,
					 title VARCHAR(20), 
                     floorid int not null,constraint fk_floorid foreign key(floorid) references floors(id) on update cascade on delete cascade,
                     employeeid int not null,constraint fk_employeeid foreign key(employeeid) references employees(id) on update cascade on delete cascade);

CREATE TABLE warehouses(id INT NOT NULL AUTO_INCREMENT primary KEY,
						name VARCHAR(20),
                        sectionid int not null,constraint fk_sectionid foreign key(sectionid) references sections(id) on update cascade on delete cascade);

CREATE TABLE orderdetails(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
							employeeid INT NOT NULL,CONSTRAINT fk_employee_id FOREIGN KEY (employeeid) REFERENCES employees(id) ON UPDATE CASCADE ON DELETE CASCADE,
                            materialid INT NOT NULL,CONSTRAINT fk_materialid FOREIGN KEY (materialid) REFERENCES materials(id) ON UPDATE CASCADE ON DELETE CASCADE,
                            quantity INT NOT NULL,
                            warehouseid int not null,constraint fk_warehouseid foreign key(warehouseid) references warehouses(id) on update cascade on delete cascade);  

CREATE TABLE orders(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
					date DATETIME DEFAULT CURRENT_TIMESTAMP,
                    orderdetailid INT NOT NULL,CONSTRAINT fk_orderdetailsid FOREIGN KEY (orderdetailid) REFERENCES orderdetails(id) ON UPDATE CASCADE ON DELETE CASCADE ,
                    employeeid INT NOT NULL,CONSTRAINT fk_employees_id FOREIGN KEY (employeeid) REFERENCES employees(id) ON UPDATE CASCADE ON DELETE CASCADE ,
                    status ENUM('delivered','inprogress','cancelled') NOT NULL);


-- Insertion for material
INSERT INTO categories(category) VALUES ("Bearings");
INSERT INTO categories(category) VALUES ("1st Gear");
INSERT INTO categories(category) VALUES ("2nd Gear");
INSERT INTO categories(category) VALUES ("3rd Gear");
INSERT INTO categories(category) VALUES ("Reverse Gear");
INSERT INTO categories(category) VALUES ("Main Shaft");
INSERT INTO categories(category) VALUES ("Counter Shaft");
INSERT INTO categories(category) VALUES ("Housing");

insert into materials(title, categoryid, quantity, unitprice, imageurl) values ('Needle Bearing',1,784,20, '/assets/img/Bearing.jpeg');
insert into materials(title, categoryid, quantity, unitprice, imageurl) values ('Ball Bearing',1,800,30, '/assets/img/Bearing.jpeg');
insert into materials(title, categoryid, quantity, unitprice, imageurl) values ('Bush Bearing',1,4500,15, '/assets/img/Bearing.jpeg');
insert into materials(title, categoryid, quantity, unitprice, imageurl) values ('2nd Gear of ratio 3.4', 3,450,85, '/assets/img/2gear.jpeg');
insert into materials(title, categoryid, quantity, unitprice, imageurl) values ('2nd Gear of ratio 3.6', 3,400,85, '/assets/img/2gear.jpeg');
insert into materials(title, categoryid, quantity, unitprice, imageurl) values ('2nd Gear of ratio 4.2', 3,800,85, '/assets/img/2gear.jpeg');
insert into materials(title, categoryid, quantity, unitprice, imageurl) values ('1st Gear of ratio 8.81', 2,450,90, '/assets/img/1gear.jpeg');
insert into materials(title, categoryid, quantity, unitprice, imageurl) values ('1st Gear of ratio 9.23', 2,400,90, '/assets/img/1gear.jpeg');
insert into materials(title, categoryid, quantity, unitprice, imageurl) values ('1st Gear of ratio 7.72', 2,800,90, '/assets/img/1gear.jpeg');
insert into materials(title, categoryid, quantity, unitprice, imageurl) values ('3rd Gear of ratio 3.4', 4,450,85, '/assets/img/3gear.jpeg');
insert into materials(title, categoryid, quantity, unitprice, imageurl) values ('3rd Gear of ratio 3.6', 4,400,85, '/assets/img/3gear.jpeg');
insert into materials(title, categoryid, quantity, unitprice, imageurl) values ('3rd Gear of ratio 4.2', 4,0,85, '/assets/img/3gear.jpeg');
insert into materials(title, categoryid, quantity, unitprice, imageurl) values ('Reverse Gear of ratio 3.4', 5,450,85, '/assets/img/Rgear.jpeg');
insert into materials(title, categoryid, quantity, unitprice, imageurl) values ('Reverse Gear of ratio 3.6' , 5,400,85, '/assets/img/Rgear.jpeg');
insert into materials(title, categoryid, quantity, unitprice, imageurl) values ('Reverse Gear of ratio 4.2', 5,800,85, '/assets/img/Rgear.jpeg');
insert into materials(title, categoryid, quantity, unitprice, imageurl) values ('GB500 Main Shaft', 6,0,200, '/assets/img/ms.jpeg');
insert into materials(title, categoryid, quantity, unitprice, imageurl) values ('GB400 Main Shaft',6,87,250, '/assets/img/ms.jpeg');
insert into materials(title, categoryid, quantity, unitprice, imageurl) values ('GB540 Main Shaft', 6,79,400, '/assets/img/ms.jpeg');
insert into materials(title, categoryid, quantity, unitprice, imageurl) values ('GB500 Counter Shaft', 7,80,450, '/assets/img/cs.jpeg');
insert into materials(title, categoryid, quantity, unitprice, imageurl) values ('GB400 Counter Shaft', 7,89,200, '/assets/img/cs.jpeg');
insert into materials(title, categoryid, quantity, unitprice, imageurl) values ('Gb540 Counter Shaft', 7,0,500, '/assets/img/cs.jpeg');
insert into materials(title, categoryid, quantity, unitprice, imageurl) values ('GB500 Housing' , 8,50,2000, '/assets/img/housing.jpeg');
insert into materials(title, categoryid, quantity, unitprice, imageurl) values ('GB400 Housing', 8,8,2500, '/assets/img/housing.jpeg');
insert into materials(title, categoryid, quantity, unitprice, imageurl) values ('Gb540 Housing' , 8,0,3500, '/assets/img/housing.jpeg');

-- Insertion for roles
insert INTO roles(role) VALUES("Incharge");
INSERT INTO roles(role) VALUES("Store Manager");
INSERT INTO roles(role) VALUES("Supervisor");
INSERT INTO roles(role) VALUES("Store Worker");

-- Insertion for departments
insert INTO departments(department) VALUES("HR");
INSERT INTO departments(department) VALUES("Store");
INSERT INTO departments(department) VALUES("GB500 Line");
INSERT INTO departments(department) VALUES("GB400 Line");
INSERT INTO departments(department) VALUES("GB540 Line");
INSERT INTO departments(department) VALUES("worker");

-- Insertion for Employees
INSERT INTO employees(firstname,lastname,birthdate,hiredate,contactnumber,departmentid, roleid,email,password,imageurl,gender)VALUES('Sahil','Mankar','1997-05-19','2021-07-07','8756789158',2, 2 ,'Sahil22@gmail.com','SM569654' ,'/assets/img/mEmp.jpeg', 'male');
INSERT INTO employees(firstname,lastname,birthdate,hiredate,contactnumber,departmentid, roleid,email,password,imageurl,gender)VALUES('Rahul','Desai','1995-08-11','2021-08-04','9856789157',2, 2 ,'RD@gmail.com','RD854466' ,'/assets/img/mEmp.jpeg', 'male');
INSERT INTO employees(firstname,lastname,birthdate,hiredate,contactnumber,departmentid, roleid,email,password,imageurl,gender)VALUES('Siddhesh','Pandit','1996-01-02','2021-09-12','7845967845',3, 3 ,'SP@gmail.com','SP789956' ,'/assets/img/mEmp.jpeg', 'male');
INSERT INTO employees(firstname,lastname,birthdate,hiredate,contactnumber,departmentid, roleid,email,password,imageurl,gender)VALUES('Tejaswini','Salvi','1992-11-19','2020-09-01','9888754415',4, 3 ,'TS22@gmail.com','TS337845' ,'/assets/img/fEmp.jpeg', 'female');
INSERT INTO employees(firstname,lastname,birthdate,hiredate,contactnumber,departmentid, roleid,email,password,imageurl,gender)VALUES('samiksha','raut','1992-11-19','2020-09-01','7844726596',5, 3 ,'TS22@gmail.com','TS337845' ,'/assets/img/fEmp.jpeg', 'female');
INSERT INTO employees(firstname,lastname,birthdate,hiredate,contactnumber,departmentid, roleid,email,password,imageurl,gender)VALUES('Vedant','Yadav','1987-01-07','2009-03-11','99887564123',1, 1 ,'VY@gmail.com','VY788814' ,'/assets/img/mEmp.jpeg', 'male');
INSERT INTO employees(firstname,lastname,birthdate,hiredate,contactnumber,departmentid, roleid,email,password,imageurl,gender)VALUES('sameer','jadhav','1999-05-12','2018-03-11','8455786547',6,4,'SM@gmail.com','VY788815' ,'/assets/img/mEmp.jpeg', 'male');
INSERT INTO employees(firstname,lastname,birthdate,hiredate,contactnumber,departmentid, roleid,email,password,imageurl,gender)VALUES('kalpesh','joshi','1998-01-14','2018-03-11','9987458745',6, 4 ,'KJgmail.com','KG788816' ,'/assets/img/mEmp.jpeg', 'male');
INSERT INTO employees(firstname,lastname,birthdate,hiredate,contactnumber,departmentid, roleid,email,password,imageurl,gender)VALUES('suraj','Yadav','1998-02-07','2018-03-11','8755469321',6 , 4,'SY@gmail.com','SY88817' ,'/assets/img/mEmp.jpeg', 'male');
INSERT INTO employees(firstname,lastname,birthdate,hiredate,contactnumber,departmentid, roleid,email,password,imageurl,gender)VALUES('manoj','sharma','1998-04-20','2018-03-11','9766132597',6, 4,'MS@gmail.com','MS788818' ,'/assets/img/mEmp.jpeg', 'male');
INSERT INTO employees(firstname,lastname,birthdate,hiredate,contactnumber,departmentid, roleid,email,password,imageurl,gender)VALUES('sahil','dhumak','1998-08-14','2018-03-11','9877452163',6, 4,'SDgmail.com','SD788819' ,'/assets/img/mEmp.jpeg', 'male');
INSERT INTO employees(firstname,lastname,birthdate,hiredate,contactnumber,departmentid, roleid,email,password,imageurl,gender)VALUES('siddhesh','pandit','1998-11-22','2018-03-11','9987554412',6, 4 ,'VSPgmail.com','VSP788810' ,'/assets/img/mEmp.jpeg', 'male');
INSERT INTO employees(firstname,lastname,birthdate,hiredate,contactnumber,departmentid, roleid,email,password,imageurl,gender)VALUES('shankar','kambale','1998-10-26','2018-03-11','7877455512',6, 4 ,'SK@gmail.com','SK788811' ,'/assets/img/mEmp.jpeg', 'male');
INSERT INTO employees(firstname,lastname,birthdate,hiredate,contactnumber,departmentid, roleid,email,password,imageurl,gender)VALUES('sumit','malap','1998-01-02','2018-03-11','9989745624',6, 4,'SM@gmail.com','SM788812' ,'/assets/img/mEmp.jpeg', 'male');
INSERT INTO employees(firstname,lastname,birthdate,hiredate,contactnumber,departmentid, roleid,email,password,imageurl,gender)VALUES('shubham','ghanekar','1998-03-22','2018-03-11','8955746251',6, 4,'SGgmail.com','SG788813' ,'/assets/img/mEmp.jpeg', 'male');
INSERT INTO employees(firstname,lastname,birthdate,hiredate,contactnumber,departmentid, roleid,email,password,imageurl,gender)VALUES('vinaya','satpute','1998-01-06','2018-03-11','9587994765',6, 4 ,'VS@gmail.com','VS7888122' ,'/assets/img/fEmp.jpeg', 'female');


-- Insertion for floors
insert into floors(level,categoryid) values('A1',1);
insert into floors(level,categoryid) values('A2',1);
insert into floors(level,categoryid) values('A3',1);
insert into floors(level,categoryid) values('B1',2);
insert into floors(level,categoryid) values('B2',2);
insert into floors(level,categoryid) values('B3',2);
insert into floors(level,categoryid) values('C1',3);
insert into floors(level,categoryid) values('C2',3);
insert into floors(level,categoryid) values('C3',3);
insert into floors(level,categoryid) values('D1',4);
insert into floors(level,categoryid) values('D2',4);
insert into floors(level,categoryid) values('D3',4);
insert into floors(level,categoryid) values('E1',5);
insert into floors(level,categoryid) values('E2',5);
insert into floors(level,categoryid) values('E3',5);
insert into floors(level,categoryid) values('F1',6);
insert into floors(level,categoryid) values('F2',6);
insert into floors(level,categoryid) values('F3',6);
insert into floors(level,categoryid) values('G1',7);
insert into floors(level,categoryid) values('G2',7);
insert into floors(level,categoryid) values('G3',7);
insert into floors(level,categoryid) values('H1',8);
insert into floors(level,categoryid) values('H2',8);
insert into floors(level,categoryid) values('H3',8);

-- Insertion for Sections
insert into sections(title, floorid,employeeid)values('Section 1', 1,1);
insert into sections(title, floorid,employeeid)values('Section 1', 2,1);
insert into sections(title, floorid,employeeid)values('Section 1', 3,1);
insert into sections(title, floorid,employeeid)values('Section 2', 4,2);
insert into sections(title, floorid,employeeid)values('Section 2', 5,2);
insert into sections(title, floorid,employeeid)values('Section 2', 6,2);
insert into sections(title, floorid,employeeid)values('Section 3', 7,3);
insert into sections(title, floorid,employeeid)values('Section 3', 8,3);
insert into sections(title, floorid,employeeid)values('Section 3', 9 ,3);
insert into sections(title, floorid,employeeid)values('Section 4', 10,4);
insert into sections(title, floorid,employeeid)values('Section 4', 11,4);
insert into sections(title, floorid,employeeid)values('Section 4', 12,4);
insert into sections(title, floorid,employeeid)values('Section 5', 13,5);
insert into sections(title, floorid,employeeid)values('Section 5', 14,5);
insert into sections(title, floorid,employeeid)values('Section 5', 15,5);
insert into sections(title, floorid,employeeid)values('Section 6', 16,6);
insert into sections(title, floorid,employeeid)values('Section 6', 17,6);
insert into sections(title, floorid,employeeid)values('Section 6', 18,6);
insert into sections(title, floorid,employeeid)values('Section 7', 19,7);
insert into sections(title, floorid,employeeid)values('Section 7', 20,7);
insert into sections(title, floorid,employeeid)values('Section 7', 21,7);
insert into sections(title, floorid,employeeid)values('Section 8', 22,8);
insert into sections(title, floorid,employeeid)values('Section 8', 23,8);
insert into sections(title, floorid,employeeid)values('Section 8', 24,8);


-- Insertion for warehouses
insert into warehouses(name, sectionid) values ('warehouse 1', 1);
insert into warehouses(name, sectionid) values ('warehouse 1', 2);
insert into warehouses(name, sectionid) values ('warehouse 1', 3);
insert into warehouses(name, sectionid) values ('warehouse 1', 4);
insert into warehouses(name, sectionid) values ('warehouse 1', 5);
insert into warehouses(name, sectionid) values ('warehouse 1', 6);
insert into warehouses(name, sectionid) values ('warehouse 1', 7);
insert into warehouses(name, sectionid) values ('warehouse 1', 8);
insert into warehouses(name, sectionid) values ('warehouse 1', 9);
insert into warehouses(name, sectionid) values ('warehouse 1', 10);
insert into warehouses(name, sectionid) values ('warehouse 1', 11);
insert into warehouses(name, sectionid) values ('warehouse 1', 12);
insert into warehouses(name, sectionid) values ('warehouse 2', 13);
insert into warehouses(name, sectionid) values ('warehouse 2', 14);
insert into warehouses(name, sectionid) values ('warehouse 2', 15);
insert into warehouses(name, sectionid) values ('warehouse 2', 16);
insert into warehouses(name, sectionid) values ('warehouse 2', 17);
insert into warehouses(name, sectionid) values ('warehouse 2', 18);
insert into warehouses(name, sectionid) values ('warehouse 2', 19);
insert into warehouses(name, sectionid) values ('warehouse 2', 20);
insert into warehouses(name, sectionid) values ('warehouse 2', 21);
insert into warehouses(name, sectionid) values ('warehouse 2', 22);
insert into warehouses(name, sectionid) values ('warehouse 2', 23);
insert into warehouses(name, sectionid) values ('warehouse 2', 24);


-- insertion for orderdetails
insert into orderdetails(employeeid, materialid, quantity, warehouseid)values(10,3,100,1);
insert into orderdetails(employeeid, materialid, quantity,warehouseid)values(11,4,50,2);
insert into orderdetails(employeeid, materialid, quantity,warehouseid)values(12,5,30,3);
insert into orderdetails(employeeid, materialid, quantity,warehouseid)values(13,4,74,4);
insert into orderdetails(employeeid, materialid, quantity,warehouseid)values(14,7,40,5);
insert into orderdetails(employeeid, materialid, quantity,warehouseid)values(15,8,7,6);
insert into orderdetails(employeeid, materialid, quantity,warehouseid)values(16,9,89,7);
insert into orderdetails(employeeid, materialid, quantity,warehouseid)values(12,14,30,13);
insert into orderdetails(employeeid, materialid, quantity,warehouseid)values(13,15,74,14);
insert into orderdetails(employeeid, materialid, quantity,warehouseid)values(14,16,40,15);
insert into orderdetails(employeeid, materialid, quantity,warehouseid)values(15,17,78,16);
insert into orderdetails(employeeid, materialid, quantity,warehouseid)values(16,18,89,17);
insert into orderdetails(employeeid, materialid, quantity,warehouseid)values(12,14,30,13);
insert into orderdetails(employeeid, materialid, quantity,warehouseid)values(12,15,74,14);
insert into orderdetails(employeeid, materialid, quantity,warehouseid)values(12,16,40,15);
insert into orderdetails(employeeid, materialid, quantity,warehouseid)values(12,17,78,16);
insert into orderdetails(employeeid, materialid, quantity,warehouseid)values(12,18,89,17);
insert into orderdetails(employeeid, materialid, quantity,warehouseid)values(13,18,100,17);
insert into orderdetails(employeeid, materialid, quantity,warehouseid)values(14,17,10,16);


-- insertion for orders
INSERT INTO orders(date, orderdetailid, employeeid,status)VALUES ('2023-02-04  08:35:25',1 , 4,'delivered');
INSERT INTO orders(date, orderdetailid, employeeid,status)VALUES ('2023-01-16  09:35:25',2 ,3,'delivered');
INSERT INTO orders(date, orderdetailid, employeeid,status)VALUES ('2023-04-12  12:35:25',3 , 3,'cancelled');
INSERT INTO orders(date, orderdetailid, employeeid,status)VALUES ('2023-04-25  06:35:25',4,4, 'delivered');
INSERT INTO orders(date, orderdetailid, employeeid,status)VALUES ('2023-01-04  08:35:25',5 , 4,'delivered');
INSERT INTO orders(date, orderdetailid, employeeid,status)VALUES ('2023-01-16  09:35:25',6,3,'delivered');
INSERT INTO orders(date, orderdetailid, employeeid,status)VALUES ('2023-04-12  12:35:25',7, 3,'cancelled');
INSERT INTO orders(date, orderdetailid, employeeid,status)VALUES ('2023-04-12  12:35:25',8 , 3,'cancelled');
INSERT INTO orders(date, orderdetailid, employeeid,status)VALUES ('2023-01-25  06:35:25',9,4, 'delivered');
INSERT INTO orders(date, orderdetailid, employeeid,status)VALUES ('2023-03-04  08:35:25',10 , 4,'delivered');
INSERT INTO orders(date, orderdetailid, employeeid,status)VALUES ('2023-01-16  09:35:25',11,3,'delivered');
INSERT INTO orders(date, orderdetailid, employeeid,status)VALUES ('2023-04-12  12:35:25',12, 3,'delivered');
INSERT INTO orders(date, orderdetailid, employeeid,status)VALUES ('2023-05-26  12:35:25',13, 3,'delivered');
INSERT INTO orders(date, orderdetailid, employeeid,status)VALUES ('2023-05-29  12:40:25',19, 3,'delivered');



-- get material by id
select materials.id, materials.title, materials.quantity, materials.unitprice, materials.imageurl, categories.category from materials inner join categories on categories.id =materials.categoryid where materials.id = 5;
 
 -- get all materials
 select materials.id, materials.title, materials.quantity, materials.unitprice, materials.imageurl, categories.category  from materials inner join categories on categories.id =materials.categoryid;

-- get material by category
select materials.id, materials.title, materials.quantity, materials.unitprice, materials.imageurl, categories.category from materials inner join categories on categories.id =materials.categoryid where materials.categoryid =7;

-- employees and their role and department
select  employees.id, employees.firstname,employees.lastname,employees.email,employees.contactnumber, departments.department, roles.role
 from employees 
 inner join departments on employees.departmentid=departments.id  
 inner join roles on employees.roleid=roles.id;


-- get employee by id
select  employees.id, employees.birthdate, employees.hiredate, employees.firstname, employees.lastname, employees.email,employees.contactnumber, employees.imageurl, employees.gender ,departments.department, roles.role   from employees   inner join departments on employees.departmentid=departments.id  inner join roles on employees.roleid=roles.id  where employees.id = 2;


-- get orders from date - to date
select orders.id, employees.firstname,employees.lastname, orders.date, orders.status, materials.id, materials.title, categories.category, orderdetails.quantity from orders inner join materials on orders.orderdetailid = materials.id  inner join employees on employees.id = orders.employeeid   inner join categories on categories.id = materials.categoryid  inner join orderdetails on orders.orderdetailid = orderdetails.id  WHERE (date BETWEEN '2023-03-01' AND '2023-05-05' );

-- get orders ordered today
select orders.id, materials.id, materials.title, categories.category, orderdetails.quantity, orders.status  from orders  inner join materials on orders.orderdetailid = materials.id inner join categories on materials.categoryid = categories.id  inner join orderdetails on orders.orderdetailid=orderdetails.id WHERE orders.date >= CAST(CURRENT_TIMESTAMP AS date);

-- out of stock material
select  materials.id, materials.title, materials.quantity, materials.unitprice, materials.imageurl, categories.category from materials inner join categories on categories.id =materials.categoryid  where quantity = 0



-- add table catagories  -
-- enum for gender    -
-- material name = title  -
-- material types = categoryid  -
-- photo to imageurl         -
-- floor name to level add employee id -
-- inside floor store material category-
-- section name = title add emplyeeid -
-- worker id = employeeid -