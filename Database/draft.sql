-- Database Creation
create database inventorymanagement;
use inventorymanagement;
-- Table Creation
CREATE TABLE roles(role_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, role varchar(50));
create table departments(department_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, department varchar(50));
create table employees(employee_id INT NOT NULL auto_increment primary KEY,empfirst_name VARCHAR(100),emplast_name VARCHAR(50),birth_date DATETIME,hire_date DATETIME,contact_number VARCHAR(20),email VARCHAR(50),password VARCHAR(15) NOT NULL,photo varchar (50),gender VARCHAR(50),department_id  int not null,constraint fk_department_id foreign key(department_id) references departments(department_id) on update cascade on delete cascade,role_id int not null,constraint fk_role foreign key(role_id) references roles(role_id) on update cascade on delete cascade);
CREATE TABLE materials(material_id INT NOT NULL AUTO_INCREMENT primary KEY, material_name VARCHAR(100),material_type VARCHAR(100),quantity INT NOT NULL,unit_price INT NOT NULL, photo varchar (50));
create table floors(floor_id INT NOT NULL AUTO_INCREMENT primary KEY, floor_number varchar(20), mid int not null,constraint fk_mid foreign key(mid) references materials(material_id) on update cascade on delete cascade);
create table sections(section_id INT NOT NULL AUTO_INCREMENT primary KEY,section_name VARCHAR(20), floors_id int not null,constraint fk_floors foreign key(floors_id) references floors(floor_id) on update cascade on delete cascade);
CREATE TABLE warehouses(warehouse_id INT NOT NULL AUTO_INCREMENT primary KEY,warehouse_name VARCHAR(20),sections_id int not null,constraint fk_sections foreign key(sections_id) references sections(section_id) on update cascade on delete cascade);
CREATE TABLE orderdetails(orderdetails_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,assigned_worker_id INT NOT NULL,CONSTRAINT fk_workers_id FOREIGN KEY (assigned_worker_id) REFERENCES employees(employee_id) ON UPDATE CASCADE ON DELETE CASCADE,material_id INT NOT NULL,CONSTRAINT fk_material_id FOREIGN KEY (material_id) REFERENCES materials(material_id) ON UPDATE CASCADE ON DELETE CASCADE,quantity INT NOT NULL,location_id int not null,constraint fk_warehouse foreign key(location_id) references warehouses(warehouse_id) on update cascade on delete cascade);  
CREATE TABLE orders(order_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,order_date DATETIME DEFAULT CURRENT_TIMESTAMP,orderdetails_id INT NOT NULL,CONSTRAINT fk_orderdetails_id FOREIGN KEY (orderdetails_id) REFERENCES orderdetails(orderdetails_id) ON UPDATE CASCADE ON DELETE CASCADE ,employee_id INT NOT NULL,CONSTRAINT fk_employee_id FOREIGN KEY (employee_id) REFERENCES employees(employee_id) ON UPDATE CASCADE ON DELETE CASCADE ,status ENUM('delivered','cancelled') NOT NULL);

-- Insertion for material
insert into materials(material_name, material_type, quantity, unit_price, photo) values ('Needle Bearing','Bearing',784,20, './images/SM.jpg');
insert into materials(material_name, material_type, quantity, unit_price, photo) values ('Ball Bearing','Bearing',800,30, './images/SM.jpg');
insert into materials(material_name, material_type, quantity, unit_price, photo) values ('Bush Bearing','Bearing',4500,15, './images/SM.jpg');
insert into materials(material_name, material_type, quantity, unit_price, photo) values ('2nd Gear of ratio 3.4','2nd Gear',450,85, './images/SM.jpg');
insert into materials(material_name, material_type, quantity, unit_price, photo) values ('2nd Gear of ratio 3.6','2nd Gear',400,85, './images/SM.jpg');
insert into materials(material_name, material_type, quantity, unit_price, photo) values ('2nd Gear of ratio 4.2','2nd Gear',800,85, './images/SM.jpg');
insert into materials(material_name, material_type, quantity, unit_price, photo) values ('1st Gear of ratio 8.81','1st Gear',450,90, './images/SM.jpg');
insert into materials(material_name, material_type, quantity, unit_price, photo) values ('1st Gear of ratio 9.23','1st Gear',400,90, './images/SM.jpg');
insert into materials(material_name, material_type, quantity, unit_price, photo) values ('1st Gear of ratio 7.72','1st Gear',800,90, './images/SM.jpg');
insert into materials(material_name, material_type, quantity, unit_price, photo) values ('3rd Gear of ratio 3.4','3rd Gear',450,85, './images/SM.jpg');
insert into materials(material_name, material_type, quantity, unit_price, photo) values ('3rd Gear of ratio 3.6','3rd Gear',400,85, './images/SM.jpg');
insert into materials(material_name, material_type, quantity, unit_price, photo) values ('3rd Gear of ratio 4.2','3rd Gear',800,85, './images/SM.jpg');
insert into materials(material_name, material_type, quantity, unit_price, photo) values ('Reverse Gear of ratio 3.4','Reverse Gear',450,85, './images/SM.jpg');
insert into materials(material_name, material_type, quantity, unit_price, photo) values ('Reverse Gear of ratio 3.6','Reverse Gear',400,85, './images/SM.jpg');
insert into materials(material_name, material_type, quantity, unit_price, photo) values ('Reverse Gear of ratio 4.2','Reverse Gear',800,85, './images/SM.jpg');
insert into materials(material_name, material_type, quantity, unit_price, photo) values ('GB500 Main Shaft','Main Shaft',80,200, './images/SM.jpg');
insert into materials(material_name, material_type, quantity, unit_price, photo) values ('GB400 Main Shaft','Main Shaft',87,250, './images/SM.jpg');
insert into materials(material_name, material_type, quantity, unit_price, photo) values ('GB540 Main Shaft','Main Shaft',79,400, './images/SM.jpg');
insert into materials(material_name, material_type, quantity, unit_price, photo) values ('GB500 Counter Shaft','Counter Shaft',80,450, './images/SM.jpg');
insert into materials(material_name, material_type, quantity, unit_price, photo) values ('GB400 Counter Shaft','Counter Shaft',89,200, './images/SM.jpg');
insert into materials(material_name, material_type, quantity, unit_price, photo) values ('Gb540 Counter Shaft','Counter Shaft',102,500, './images/SM.jpg');
insert into materials(material_name, material_type, quantity, unit_price, photo) values ('GB500 Housing','Housing',50,2000, './images/SM.jpg');
insert into materials(material_name, material_type, quantity, unit_price, photo) values ('GB400 Housing','Housing',78,2500, './images/SM.jpg');
insert into materials(material_name, material_type, quantity, unit_price, photo) values ('Gb540 Housing','Housing',90,3500, './images/SM.jpg');

-- Insertion for floors
insert into floors(floor_number,mid) values('A1',1);
insert into floors(floor_number,mid) values('A2',2);
insert into floors(floor_number,mid) values('A3',3);
insert into floors(floor_number,mid) values('B1',4);
insert into floors(floor_number,mid) values('B2',5);
insert into floors(floor_number,mid) values('B3',6);
insert into floors(floor_number,mid) values('C1',7);
insert into floors(floor_number,mid) values('C2',8);
insert into floors(floor_number,mid) values('C3',9);
insert into floors(floor_number,mid) values('D1',10);
insert into floors(floor_number,mid) values('D2',11);
insert into floors(floor_number,mid) values('D3',12);
insert into floors(floor_number,mid) values('E1',13);
insert into floors(floor_number,mid) values('E2',14);
insert into floors(floor_number,mid) values('E3',15);
insert into floors(floor_number,mid) values('F1',16);
insert into floors(floor_number,mid) values('F2',17);
insert into floors(floor_number,mid) values('F3',18);
insert into floors(floor_number,mid) values('G1',19);
insert into floors(floor_number,mid) values('G2',20);
insert into floors(floor_number,mid) values('G3',21);
insert into floors(floor_number,mid) values('H1',22);
insert into floors(floor_number,mid) values('H2',23);
insert into floors(floor_number,mid) values('H3',24);


-- Insertion for Sections
insert into sections(section_name, floors_id)values('Section 1', 1);
insert into sections(section_name, floors_id)values('Section 1', 2);
insert into sections(section_name, floors_id)values('Section 1', 3);
insert into sections(section_name, floors_id)values('Section 2', 4);
insert into sections(section_name, floors_id)values('Section 2', 5);
insert into sections(section_name, floors_id)values('Section 2', 6);
insert into sections(section_name, floors_id)values('Section 3', 7);
insert into sections(section_name, floors_id)values('Section 3', 8);
insert into sections(section_name, floors_id)values('Section 3', 9);
insert into sections(section_name, floors_id)values('Section 4', 10);
insert into sections(section_name, floors_id)values('Section 4', 11);
insert into sections(section_name, floors_id)values('Section 4', 12);
insert into sections(section_name, floors_id)values('Section 5', 13);
insert into sections(section_name, floors_id)values('Section 5', 14);
insert into sections(section_name, floors_id)values('Section 5', 15);
insert into sections(section_name, floors_id)values('Section 6', 16);
insert into sections(section_name, floors_id)values('Section 6', 17);
insert into sections(section_name, floors_id)values('Section 6', 18);
insert into sections(section_name, floors_id)values('Section 7', 19);
insert into sections(section_name, floors_id)values('Section 7', 20);
insert into sections(section_name, floors_id)values('Section 7', 21);
insert into sections(section_name, floors_id)values('Section 8', 22);
insert into sections(section_name, floors_id)values('Section 8', 23);
insert into sections(section_name, floors_id)values('Section 8', 24);


-- Insertion for warehouses
insert into warehouses(warehouse_name, sections_id) values ('warehouse 1', 1);
insert into warehouses(warehouse_name, sections_id) values ('warehouse 1', 2);
insert into warehouses(warehouse_name, sections_id) values ('warehouse 1', 3);
insert into warehouses(warehouse_name, sections_id) values ('warehouse 1', 4);
insert into warehouses(warehouse_name, sections_id) values ('warehouse 1', 5);
insert into warehouses(warehouse_name, sections_id) values ('warehouse 1', 6);
insert into warehouses(warehouse_name, sections_id) values ('warehouse 1', 7);
insert into warehouses(warehouse_name, sections_id) values ('warehouse 1', 8);
insert into warehouses(warehouse_name, sections_id) values ('warehouse 1', 9);
insert into warehouses(warehouse_name, sections_id) values ('warehouse 1', 10);
insert into warehouses(warehouse_name, sections_id) values ('warehouse 1', 11);
insert into warehouses(warehouse_name, sections_id) values ('warehouse 1', 12);
insert into warehouses(warehouse_name, sections_id) values ('warehouse 2', 13);
insert into warehouses(warehouse_name, sections_id) values ('warehouse 2', 14);
insert into warehouses(warehouse_name, sections_id) values ('warehouse 2', 15);
insert into warehouses(warehouse_name, sections_id) values ('warehouse 2', 16);
insert into warehouses(warehouse_name, sections_id) values ('warehouse 2', 17);
insert into warehouses(warehouse_name, sections_id) values ('warehouse 2', 18);
insert into warehouses(warehouse_name, sections_id) values ('warehouse 2', 19);
insert into warehouses(warehouse_name, sections_id) values ('warehouse 2', 20);
insert into warehouses(warehouse_name, sections_id) values ('warehouse 2', 21);
insert into warehouses(warehouse_name, sections_id) values ('warehouse 2', 22);
insert into warehouses(warehouse_name, sections_id) values ('warehouse 2', 23);
insert into warehouses(warehouse_name, sections_id) values ('warehouse 2', 24);


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
INSERT INTO employees(empfirst_name,emplast_name,birth_date,hire_date,contact_number,department_id, role_id,email,password,photo,gender)VALUES('Sahil','Mankar','1997-05-19','2021-07-07','8756789158',2, 2 ,'Sahil22@gmail.com','SM569654' ,'./images/SM.jpg', 'Male');
INSERT INTO employees(empfirst_name,emplast_name,birth_date,hire_date,contact_number,department_id, role_id,email,password,photo,gender)VALUES('Rahul','Desai','1995-08-11','2021-08-04','9856789157',2, 2 ,'RD@gmail.com','RD854466' ,'./images/SM.jpg', 'Male');
INSERT INTO employees(empfirst_name,emplast_name,birth_date,hire_date,contact_number,department_id, role_id,email,password,photo,gender)VALUES('Siddhesh','Pandit','1996-01-02','2021-09-12','7845967845',3, 3 ,'SP@gmail.com','SP789956' ,'./images/SM.jpg', 'Male');
INSERT INTO employees(empfirst_name,emplast_name,birth_date,hire_date,contact_number,department_id, role_id,email,password,photo,gender)VALUES('Tejaswini','Salvi','1992-11-19','2020-09-01','9888754415',4, 3 ,'TS22@gmail.com','TS337845' ,'./images/SM.jpg', 'Female');
INSERT INTO employees(empfirst_name,emplast_name,birth_date,hire_date,contact_number,department_id, role_id,email,password,photo,gender)VALUES('samiksha','raut','1992-11-19','2020-09-01','7844726596',5, 3 ,'TS22@gmail.com','TS337845' ,'./images/SM.jpg', 'Female');
INSERT INTO employees(empfirst_name,emplast_name,birth_date,hire_date,contact_number,department_id, role_id,email,password,photo,gender)VALUES('Vedant','Yadav','1987-01-07','2009-03-11','99887564123',1, 1 ,'VY@gmail.com','VY788814' ,'./images/SM.jpg', 'Male');
INSERT INTO employees(empfirst_name,emplast_name,birth_date,hire_date,contact_number,department_id, role_id,email,password,photo,gender)VALUES('sameer','jadhav','1999-05-12','2018-03-11','8455786547',6,4,'SM@gmail.com','VY788815' ,'./images/SM.jpg', 'Male');
INSERT INTO employees(empfirst_name,emplast_name,birth_date,hire_date,contact_number,department_id, role_id,email,password,photo,gender)VALUES('kalpesh','joshi','1998-01-14','2018-03-11','9987458745',6, 4 ,'KJgmail.com','KG788816' ,'./images/SM.jpg', 'Male');
INSERT INTO employees(empfirst_name,emplast_name,birth_date,hire_date,contact_number,department_id, role_id,email,password,photo,gender)VALUES('suraj','Yadav','1998-02-07','2018-03-11','8755469321',6 , 4,'SY@gmail.com','SY88817' ,'./images/SM.jpg', 'Male');
INSERT INTO employees(empfirst_name,emplast_name,birth_date,hire_date,contact_number,department_id, role_id,email,password,photo,gender)VALUES('manoj','sharma','1998-04-20','2018-03-11','9766132597',6, 4,'MS@gmail.com','MS788818' ,'./images/SM.jpg', 'Male');
INSERT INTO employees(empfirst_name,emplast_name,birth_date,hire_date,contact_number,department_id, role_id,email,password,photo,gender)VALUES('sahil','dhumak','1998-08-14','2018-03-11','9877452163',6, 4,'SDgmail.com','SD788819' ,'./images/SM.jpg', 'Male');
INSERT INTO employees(empfirst_name,emplast_name,birth_date,hire_date,contact_number,department_id, role_id,email,password,photo,gender)VALUES('siddhesh','pandit','1998-11-22','2018-03-11','9987554412',6, 4 ,'VSPgmail.com','VSP788810' ,'./images/SM.jpg', 'Male');
INSERT INTO employees(empfirst_name,emplast_name,birth_date,hire_date,contact_number,department_id, role_id,email,password,photo,gender)VALUES('shankar','kambale','1998-10-26','2018-03-11','7877455512',6, 4 ,'SK@gmail.com','SK788811' ,'./images/SM.jpg', 'Male');
INSERT INTO employees(empfirst_name,emplast_name,birth_date,hire_date,contact_number,department_id, role_id,email,password,photo,gender)VALUES('sumit','malap','1998-01-02','2018-03-11','9989745624',6, 4,'SM@gmail.com','SM788812' ,'./images/SM.jpg', 'Male');
INSERT INTO employees(empfirst_name,emplast_name,birth_date,hire_date,contact_number,department_id, role_id,email,password,photo,gender)VALUES('shubham','ghanekar','1998-03-22','2018-03-11','8955746251',6, 4,'SGgmail.com','SG788813' ,'./images/SM.jpg', 'Male');
INSERT INTO employees(empfirst_name,emplast_name,birth_date,hire_date,contact_number,department_id, role_id,email,password,photo,gender)VALUES('vinaya','satpute','1998-01-06','2018-03-11','9587994765',6, 4 ,'VS@gmail.com','VS7888122' ,'./images/SM.jpg', 'Female');

-- insertion for orderdetails
insert into orderdetails(assigned_worker_id, material_id, quantity, location_id)values(10,3,100,1);
insert into orderdetails(assigned_worker_id, material_id, quantity,location_id)values(11,4,50,1);
insert into orderdetails(assigned_worker_id, material_id, quantity,location_id)values(12,5,30,1);
insert into orderdetails(assigned_worker_id, material_id, quantity,location_id)values(13,4,74,1);
insert into orderdetails(assigned_worker_id, material_id, quantity,location_id)values(14,7,40,1);
insert into orderdetails(assigned_worker_id, material_id, quantity,location_id)values(15,8,7,1);
insert into orderdetails(assigned_worker_id, material_id, quantity,location_id)values(16,9,89,1);
insert into orderdetails(assigned_worker_id, material_id, quantity,location_id)values(12,14,30,2);
insert into orderdetails(assigned_worker_id, material_id, quantity,location_id)values(13,15,74,2);
insert into orderdetails(assigned_worker_id, material_id, quantity,location_id)values(14,16,40,2);
insert into orderdetails(assigned_worker_id, material_id, quantity,location_id)values(15,17,78,2);
insert into orderdetails(assigned_worker_id, material_id, quantity,location_id)values(16,18,89,2);

-- insertion for orders
INSERT INTO orders(order_date, orderdetails_id, employee_id,status)VALUES ('2023-06-04  08:35:25',1 , 4,'delivered');
INSERT INTO orders(order_date, orderdetails_id, employee_id,status)VALUES ('2023-01-16  09:35:25',2 ,3,'delivered');
INSERT INTO orders(order_date, orderdetails_id, employee_id,status)VALUES ('2023-04-12  12:35:25',3 , 3,'cancelled');
INSERT INTO orders(order_date, orderdetails_id, employee_id,status)VALUES ('2023-08-25  06:35:25',4,4, 'delivered');
INSERT INTO orders(order_date, orderdetails_id, employee_id,status)VALUES ('2023-06-04  08:35:25',5 , 4,'delivered');
INSERT INTO orders(order_date, orderdetails_id, employee_id,status)VALUES ('2023-01-16  09:35:25',6,3,'delivered');
INSERT INTO orders(order_date, orderdetails_id, employee_id,status)VALUES ('2023-04-12  12:35:25',7, 3,'cancelled');
INSERT INTO orders(order_date, orderdetails_id, employee_id,status)VALUES ('2023-04-12  12:35:25',8 , 3,'cancelled');
INSERT INTO orders(order_date, orderdetails_id, employee_id,status)VALUES ('2023-08-25  06:35:25',9,4, 'delivered');
INSERT INTO orders(order_date, orderdetails_id, employee_id,status)VALUES ('2023-06-04  08:35:25',10 , 4,'delivered');
INSERT INTO orders(order_date, orderdetails_id, employee_id,status)VALUES ('2023-01-16  09:35:25',11,3,'delivered');
INSERT INTO orders(order_date, orderdetails_id, employee_id,status)VALUES ('2023-04-12  12:35:25',12, 3,'delivered');

select * from orderdetails;
select employees.employee_id, employees.empfirst_name, employees.emplast_name, roles.role
from employees
Inner join roles on employees.role_id= roles.role_id;  


-- query for orderdetails
-- employees.empfirst_name, employees.emplast_name, materials.material_name, materials.material_type 

select orders.order_id, employees.empfirst_name,employees.emplast_name, orders.order_date, orders.status, materials.material_id, materials.material_name, materials.material_type, orderdetails.quantity
from orders
inner join materials on orders.orderdetails_id = materials.material_id
inner join orderdetails on orders.orderdetails_id = orderdetails.orderdetails_id
inner join employees on employees.employee_id = orders.employee_id  where employees.employee_id=3;


select  warehouses.warehouse_name, sections.section_name,floors.floor_number,materials.material_id, materials.material_name, materials.material_type 
FROM warehouses 
INNER JOIN sections ON  warehouses.sections_id=  sections.section_id
INNER JOIN floors ON  sections.floors_id=  floors.floor_id
INNER JOIN materials ON  floors.mid=  materials.material_id 


select  employees.empfirst_name,employees.emplast_name, materials.material_id, materials.material_name, materials.material_type, orderdetails.quantity, warehouses.warehouse_name, section_name,floor_number
from orderdetails  
inner join employees on orderdetails.assigned_worker_id = employees.employee_id
inner join materials on orderdetails.material_id = materials.material_id
inner join warehouses on orderdetails.location_id= warehouses.warehouse_id
 INNER JOIN sections ON  warehouses.sections_id=  sections.section_id
 INNER JOIN floors ON  sections.floors_id=  floors.floor_id





