-- Database Creation
create database inventorymanagement;
use inventorymanagement;

-- Table Creation
CREATE TABLE roles(role_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, role varchar(50));
create table employees(employee_id INT NOT NULL auto_increment primary KEY,empfirst_name VARCHAR(100),emplast_name VARCHAR(50),birth_date DATETIME,hire_date DATETIME,contact_number VARCHAR(20),email VARCHAR(50),password VARCHAR(15) NOT NULL,photo varchar (50),gender VARCHAR(50),role_id int not null,constraint fk_role foreign key(role_id) references roles(role_id) on update cascade on delete cascade);
CREATE TABLE materials(material_id INT NOT NULL AUTO_INCREMENT primary KEY, material_name VARCHAR(100),material_type VARCHAR(100),quantity INT NOT NULL,unit_price INT NOT NULL, photo varchar (50));
create table floors(floor_id INT NOT NULL AUTO_INCREMENT primary KEY, floor_number varchar(20), mid int not null,constraint fk_mid foreign key(mid) references materials(material_id) on update cascade on delete cascade);
create table sections(section_id INT NOT NULL AUTO_INCREMENT primary KEY,section_name VARCHAR(20), floors_id int not null,constraint fk_floors foreign key(floors_id) references floors(floor_id) on update cascade on delete cascade);
CREATE TABLE warehouses(warehouse_id INT NOT NULL AUTO_INCREMENT primary KEY,warehouse_name VARCHAR(20),sections_id int not null,constraint fk_sections foreign key(sections_id) references sections(section_id) on update cascade on delete cascade);

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

-- Insertion for Employees
INSERT INTO employees(empfirst_name,emplast_name,birth_date,hire_date,contact_number, role_id,email,password,photo,gender)VALUES('Sahil','Mankar','1997-05-19','2021-07-07','8756789158', 2 ,'Sahil22@gmail.com','SM569654' ,'./images/SM.jpg', 'Male');
INSERT INTO employees(empfirst_name,emplast_name,birth_date,hire_date,contact_number, role_id,email,password,photo,gender)VALUES('Rahul','Desai','1995-08-11','2021-08-04','9856789157', 2 ,'RD@gmail.com','RD854466' ,'./images/SM.jpg', 'Male');
INSERT INTO employees(empfirst_name,emplast_name,birth_date,hire_date,contact_number, role_id,email,password,photo,gender)VALUES('Siddhesh','Pandit','1996-01-02','2021-09-12','7845967845', 3 ,'SP@gmail.com','SP789956' ,'./images/SM.jpg', 'Male');
INSERT INTO employees(empfirst_name,emplast_name,birth_date,hire_date,contact_number, role_id,email,password,photo,gender)VALUES('Tejaswini','Salvi','1992-11-19','2020-09-01','9888754415', 3 ,'TS22@gmail.com','TS337845' ,'./images/SM.jpg', 'Female');
INSERT INTO employees(empfirst_name,emplast_name,birth_date,hire_date,contact_number, role_id,email,password,photo,gender)VALUES('Vedant','Yadav','1987-01-07','2009-03-11','99887564123', 1 ,'VY@gmail.com','VY788814' ,'./images/SM.jpg', 'Male');

-- employees and their role
select employees.empfirst_name, employees.emplast_name, roles.role
from employees
Inner join roles on employees.role_id= roles.role_id;  

-- sections in warehouse
SELECT warehouses.warehouse_name, sections.section_name
FROM warehouses
INNER JOIN sections ON  warehouses.sections_id=  sections.section_id;

-- floors in section
SELECT sections.section_name, floors.floor_number
FROM sections
INNER JOIN floors ON  sections.floors_id=  floors.floor_id;

-- materials in floor
SELECT floors.floor_number, materials.material_name, materials.material_type
FROM floors
INNER JOIN materials ON  floors.mid=  materials.material_id;
