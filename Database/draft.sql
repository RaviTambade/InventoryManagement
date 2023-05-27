create database inventorymanagement;
use inventorymanagement;
-- Table Creation
CREATE TABLE roles(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
					role varchar(50));
create table departments(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
						department varchar(50));
Create table genders(id  INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
					gender varchar(50));

create table employees(id INT NOT NULL auto_increment primary KEY,
						firstname VARCHAR(100),
						lastname VARCHAR(50),
						birthdate DATETIME,hiredate DATETIME,
						contactnumber VARCHAR(20),email VARCHAR(50),password VARCHAR(15) NOT NULL,
						photo varchar (50),
						genderid int not null,  constraint fk_genderid foreign key(genderid) references genders(id) on update cascade on delete cascade,
						departmentid  int not null,constraint fk_departmentid foreign key(departmentid) references departments(id) on update cascade on delete cascade,
						roleid int not null,constraint fk_roleid foreign key(roleid) references roles(id) on update cascade on delete cascade);


CREATE TABLE materials(id INT NOT NULL AUTO_INCREMENT primary KEY,
						name VARCHAR(100),
						type VARCHAR(100),
						quantity INT NOT NULL,
						unitprice INT NOT NULL,
						photo varchar (50));
 
create table floors(id INT NOT NULL AUTO_INCREMENT primary KEY, 
					name varchar(20),
					materialid int not null,constraint fk_Materialid foreign key(materialid) references materials(id) on update cascade on delete cascade);

create table sections(id INT NOT NULL AUTO_INCREMENT primary KEY,
					 name VARCHAR(20), 
                     floorid int not null,constraint fk_floorid foreign key(floorid) references floors(id) on update cascade on delete cascade);

CREATE TABLE warehouses(id INT NOT NULL AUTO_INCREMENT primary KEY,
						name VARCHAR(20),
                        sectionid int not null,constraint fk_sectionid foreign key(sectionid) references sections(id) on update cascade on delete cascade);

CREATE TABLE orderdetails(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
							workerid INT NOT NULL,CONSTRAINT fk_workersid FOREIGN KEY (workerid) REFERENCES employees(id) ON UPDATE CASCADE ON DELETE CASCADE,
                            materialid INT NOT NULL,CONSTRAINT fk_material_id FOREIGN KEY (materialid) REFERENCES materials(id) ON UPDATE CASCADE ON DELETE CASCADE,
                            quantity INT NOT NULL,
                            warehouseid int not null,constraint fk_warehouseid foreign key(warehouseid) references warehouses(id) on update cascade on delete cascade);  

CREATE TABLE orders(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
					date DATETIME DEFAULT CURRENT_TIMESTAMP,
                    orderdetailid INT NOT NULL,CONSTRAINT fk_orderdetailsid FOREIGN KEY (orderdetailid) REFERENCES orderdetails(id) ON UPDATE CASCADE ON DELETE CASCADE ,
                    employeeid INT NOT NULL,CONSTRAINT fk_employeeid FOREIGN KEY (employeeid) REFERENCES employees(id) ON UPDATE CASCADE ON DELETE CASCADE ,
                    status ENUM('delivered','inprogress','cancelled') NOT NULL);







-- Insertion for material
insert into materials(name, type, quantity, unitprice, photo) values ('Needle Bearing','Bearing',784,20, '/assets/img/Bearing.jpeg');
insert into materials(name, type, quantity, unitprice, photo) values ('Ball Bearing','Bearing',800,30, '/assets/img/Bearing.jpeg');
insert into materials(name, type, quantity, unitprice, photo) values ('Bush Bearing','Bearing',4500,15, '/assets/img/Bearing.jpeg');
insert into materials(name, type, quantity, unitprice, photo) values ('2nd Gear of ratio 3.4','2nd Gear',450,85, '/assets/img/2gear.jpeg');
insert into materials(name, type, quantity, unitprice, photo) values ('2nd Gear of ratio 3.6','2nd Gear',400,85, '/assets/img/2gear.jpeg');
insert into materials(name, type, quantity, unitprice, photo) values ('2nd Gear of ratio 4.2','2nd Gear',800,85, '/assets/img/2gear.jpeg');
insert into materials(name, type, quantity, unitprice, photo) values ('1st Gear of ratio 8.81','1st Gear',450,90, '/assets/img/1gear.jpeg');
insert into materials(name, type, quantity, unitprice, photo) values ('1st Gear of ratio 9.23','1st Gear',400,90, '/assets/img/1gear.jpeg');
insert into materials(name, type, quantity, unitprice, photo) values ('1st Gear of ratio 7.72','1st Gear',800,90, '/assets/img/1gear.jpeg');
insert into materials(name, type, quantity, unitprice, photo) values ('3rd Gear of ratio 3.4','3rd Gear',450,85, '/assets/img/3gear.jpeg');
insert into materials(name, type, quantity, unitprice, photo) values ('3rd Gear of ratio 3.6','3rd Gear',400,85, '/assets/img/3gear.jpeg');
insert into materials(name, type, quantity, unitprice, photo) values ('3rd Gear of ratio 4.2','3rd Gear',0,85, '/assets/img/3gear.jpeg');
insert into materials(name, type, quantity, unitprice, photo) values ('Reverse Gear of ratio 3.4','Reverse Gear',450,85, '/assets/img/Rgear.jpeg');
insert into materials(name, type, quantity, unitprice, photo) values ('Reverse Gear of ratio 3.6','Reverse Gear',400,85, '/assets/img/Rgear.jpeg');
insert into materials(name, type, quantity, unitprice, photo) values ('Reverse Gear of ratio 4.2','Reverse Gear',800,85, '/assets/img/Rgear.jpeg');
insert into materials(name, type, quantity, unitprice, photo) values ('GB500 Main Shaft','Main Shaft',0,200, '/assets/img/ms.jpeg');
insert into materials(name, type, quantity, unitprice, photo) values ('GB400 Main Shaft','Main Shaft',87,250, '/assets/img/ms.jpeg');
insert into materials(name, type, quantity, unitprice, photo) values ('GB540 Main Shaft','Main Shaft',79,400, '/assets/img/ms.jpeg');
insert into materials(name, type, quantity, unitprice, photo) values ('GB500 Counter Shaft','Counter Shaft',80,450, '/assets/img/cs.jpeg');
insert into materials(name, type, quantity, unitprice, photo) values ('GB400 Counter Shaft','Counter Shaft',89,200, '/assets/img/cs.jpeg');
insert into materials(name, type, quantity, unitprice, photo) values ('Gb540 Counter Shaft','Counter Shaft',0,500, '/assets/img/cs.jpeg');
insert into materials(name, type, quantity, unitprice, photo) values ('GB500 Housing','Housing',50,2000, '/assets/img/housing.jpeg');
insert into materials(name, type, quantity, unitprice, photo) values ('GB400 Housing','Housing',8,2500, '/assets/img/housing.jpeg');
insert into materials(name, type, quantity, unitprice, photo) values ('Gb540 Housing','Housing',0,3500, '/assets/img/housing.jpeg');

-- Insertion for floors
insert into floors(name,materialid) values('A1',1);
insert into floors(name,materialid) values('A2',2);
insert into floors(name,materialid) values('A3',3);
insert into floors(name,materialid) values('B1',4);
insert into floors(name,materialid) values('B2',5);
insert into floors(name,materialid) values('B3',6);
insert into floors(name,materialid) values('C1',7);
insert into floors(name,materialid) values('C2',8);
insert into floors(name,materialid) values('C3',9);
insert into floors(name,materialid) values('D1',10);
insert into floors(name,materialid) values('D2',11);
insert into floors(name,materialid) values('D3',12);
insert into floors(name,materialid) values('E1',13);
insert into floors(name,materialid) values('E2',14);
insert into floors(name,materialid) values('E3',15);
insert into floors(name,materialid) values('F1',16);
insert into floors(name,materialid) values('F2',17);
insert into floors(name,materialid) values('F3',18);
insert into floors(name,materialid) values('G1',19);
insert into floors(name,materialid) values('G2',20);
insert into floors(name,materialid) values('G3',21);
insert into floors(name,materialid) values('H1',22);
insert into floors(name,materialid) values('H2',23);
insert into floors(name,materialid) values('H3',24);


-- Insertion for Sections
insert into sections(name, floorid)values('Section 1', 1);
insert into sections(name, floorid)values('Section 1', 2);
insert into sections(name, floorid)values('Section 1', 3);
insert into sections(name, floorid)values('Section 2', 4);
insert into sections(name, floorid)values('Section 2', 5);
insert into sections(name, floorid)values('Section 2', 6);
insert into sections(name, floorid)values('Section 3', 7);
insert into sections(name, floorid)values('Section 3', 8);
insert into sections(name, floorid)values('Section 3', 9);
insert into sections(name, floorid)values('Section 4', 10);
insert into sections(name, floorid)values('Section 4', 11);
insert into sections(name, floorid)values('Section 4', 12);
insert into sections(name, floorid)values('Section 5', 13);
insert into sections(name, floorid)values('Section 5', 14);
insert into sections(name, floorid)values('Section 5', 15);
insert into sections(name, floorid)values('Section 6', 16);
insert into sections(name, floorid)values('Section 6', 17);
insert into sections(name, floorid)values('Section 6', 18);
insert into sections(name, floorid)values('Section 7', 19);
insert into sections(name, floorid)values('Section 7', 20);
insert into sections(name, floorid)values('Section 7', 21);
insert into sections(name, floorid)values('Section 8', 22);
insert into sections(name, floorid)values('Section 8', 23);
insert into sections(name, floorid)values('Section 8', 24);


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


-- Insertion for roles
insert INTO roles(role) VALUES("Incharge");
INSERT INTO roles(role) VALUES("Store Manager");
INSERT INTO roles(role) VALUES("Supervisor");
INSERT INTO roles(role) VALUES("Store Worker");

-- Insertion for Genders
insert INTO genders(gender) VALUES("Male");
INSERT INTO genders(gender) VALUES("Female");
INSERT INTO genders(gender) VALUES("Others");

-- Insertion for departments
insert INTO departments(department) VALUES("HR");
INSERT INTO departments(department) VALUES("Store");
INSERT INTO departments(department) VALUES("GB500 Line");
INSERT INTO departments(department) VALUES("GB400 Line");
INSERT INTO departments(department) VALUES("GB540 Line");
INSERT INTO departments(department) VALUES("worker");

-- Insertion for Employees
INSERT INTO employees(firstname,lastname,birthdate,hiredate,contactnumber,departmentid, roleid,email,password,photo,genderid)VALUES('Sahil','Mankar','1997-05-19','2021-07-07','8756789158',2, 2 ,'Sahil22@gmail.com','SM569654' ,'/assets/img/mEmp.jpeg', 1);
INSERT INTO employees(firstname,lastname,birthdate,hiredate,contactnumber,departmentid, roleid,email,password,photo,genderid)VALUES('Rahul','Desai','1995-08-11','2021-08-04','9856789157',2, 2 ,'RD@gmail.com','RD854466' ,'/assets/img/mEmp.jpeg', 1);
INSERT INTO employees(firstname,lastname,birthdate,hiredate,contactnumber,departmentid, roleid,email,password,photo,genderid)VALUES('Siddhesh','Pandit','1996-01-02','2021-09-12','7845967845',3, 3 ,'SP@gmail.com','SP789956' ,'/assets/img/mEmp.jpeg', 1);
INSERT INTO employees(firstname,lastname,birthdate,hiredate,contactnumber,departmentid, roleid,email,password,photo,genderid)VALUES('Tejaswini','Salvi','1992-11-19','2020-09-01','9888754415',4, 3 ,'TS22@gmail.com','TS337845' ,'/assets/img/fEmp.jpeg', 2);
INSERT INTO employees(firstname,lastname,birthdate,hiredate,contactnumber,departmentid, roleid,email,password,photo,genderid)VALUES('samiksha','raut','1992-11-19','2020-09-01','7844726596',5, 3 ,'TS22@gmail.com','TS337845' ,'/assets/img/fEmp.jpeg', 2);
INSERT INTO employees(firstname,lastname,birthdate,hiredate,contactnumber,departmentid, roleid,email,password,photo,genderid)VALUES('Vedant','Yadav','1987-01-07','2009-03-11','99887564123',1, 1 ,'VY@gmail.com','VY788814' ,'/assets/img/mEmp.jpeg', 1);
INSERT INTO employees(firstname,lastname,birthdate,hiredate,contactnumber,departmentid, roleid,email,password,photo,genderid)VALUES('sameer','jadhav','1999-05-12','2018-03-11','8455786547',6,4,'SM@gmail.com','VY788815' ,'/assets/img/mEmp.jpeg', 1);
INSERT INTO employees(firstname,lastname,birthdate,hiredate,contactnumber,departmentid, roleid,email,password,photo,genderid)VALUES('kalpesh','joshi','1998-01-14','2018-03-11','9987458745',6, 4 ,'KJgmail.com','KG788816' ,'/assets/img/mEmp.jpeg', 1);
INSERT INTO employees(firstname,lastname,birthdate,hiredate,contactnumber,departmentid, roleid,email,password,photo,genderid)VALUES('suraj','Yadav','1998-02-07','2018-03-11','8755469321',6 , 4,'SY@gmail.com','SY88817' ,'/assets/img/mEmp.jpeg', 1);
INSERT INTO employees(firstname,lastname,birthdate,hiredate,contactnumber,departmentid, roleid,email,password,photo,genderid)VALUES('manoj','sharma','1998-04-20','2018-03-11','9766132597',6, 4,'MS@gmail.com','MS788818' ,'/assets/img/mEmp.jpeg', 1);
INSERT INTO employees(firstname,lastname,birthdate,hiredate,contactnumber,departmentid, roleid,email,password,photo,genderid)VALUES('sahil','dhumak','1998-08-14','2018-03-11','9877452163',6, 4,'SDgmail.com','SD788819' ,'/assets/img/mEmp.jpeg', 1);
INSERT INTO employees(firstname,lastname,birthdate,hiredate,contactnumber,departmentid, roleid,email,password,photo,genderid)VALUES('siddhesh','pandit','1998-11-22','2018-03-11','9987554412',6, 4 ,'VSPgmail.com','VSP788810' ,'/assets/img/mEmp.jpeg', 1);
INSERT INTO employees(firstname,lastname,birthdate,hiredate,contactnumber,departmentid, roleid,email,password,photo,genderid)VALUES('shankar','kambale','1998-10-26','2018-03-11','7877455512',6, 4 ,'SK@gmail.com','SK788811' ,'/assets/img/mEmp.jpeg', 1);
INSERT INTO employees(firstname,lastname,birthdate,hiredate,contactnumber,departmentid, roleid,email,password,photo,genderid)VALUES('sumit','malap','1998-01-02','2018-03-11','9989745624',6, 4,'SM@gmail.com','SM788812' ,'/assets/img/mEmp.jpeg', 1);
INSERT INTO employees(firstname,lastname,birthdate,hiredate,contactnumber,departmentid, roleid,email,password,photo,genderid)VALUES('shubham','ghanekar','1998-03-22','2018-03-11','8955746251',6, 4,'SGgmail.com','SG788813' ,'/assets/img/mEmp.jpeg', 1);
INSERT INTO employees(firstname,lastname,birthdate,hiredate,contactnumber,departmentid, roleid,email,password,photo,genderid)VALUES('vinaya','satpute','1998-01-06','2018-03-11','9587994765',6, 4 ,'VS@gmail.com','VS7888122' ,'/assets/img/fEmp.jpeg', 2);


-- insertion for orderdetails
insert into orderdetails(workerid, materialid, quantity, warehouseid)values(10,3,100,1);
insert into orderdetails(workerid, materialid, quantity,warehouseid)values(11,4,50,2);
insert into orderdetails(workerid, materialid, quantity,warehouseid)values(12,5,30,3);
insert into orderdetails(workerid, materialid, quantity,warehouseid)values(13,4,74,4);
insert into orderdetails(workerid, materialid, quantity,warehouseid)values(14,7,40,5);
insert into orderdetails(workerid, materialid, quantity,warehouseid)values(15,8,7,6);
insert into orderdetails(workerid, materialid, quantity,warehouseid)values(16,9,89,7);
insert into orderdetails(workerid, materialid, quantity,warehouseid)values(12,14,30,13);
insert into orderdetails(workerid, materialid, quantity,warehouseid)values(13,15,74,14);
insert into orderdetails(workerid, materialid, quantity,warehouseid)values(14,16,40,15);
insert into orderdetails(workerid, materialid, quantity,warehouseid)values(15,17,78,16);
insert into orderdetails(workerid, materialid, quantity,warehouseid)values(16,18,89,17);
insert into orderdetails(workerid, materialid, quantity,warehouseid)values(12,14,30,13);
insert into orderdetails(workerid, materialid, quantity,warehouseid)values(12,15,74,14);
insert into orderdetails(workerid, materialid, quantity,warehouseid)values(12,16,40,15);
insert into orderdetails(workerid, materialid, quantity,warehouseid)values(12,17,78,16);
insert into orderdetails(workerid, materialid, quantity,warehouseid)values(12,18,89,17);
insert into orderdetails(workerid, materialid, quantity,warehouseid)values(13,18,100,17);
insert into orderdetails(workerid, materialid, quantity,warehouseid)values(14,17,10,16);

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
INSERT INTO orders(date, orderdetailid, employeeid,status)VALUES ('2023-05-26  12:40:25',14, 3,'delivered');
