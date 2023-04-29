create database inventorymanagement;
use inventorymanagement;
create table employees(employee_id INT NOT NULL auto_increment primary KEY, 
					empfirst_name VARCHAR(100),emplast_name VARCHAR(50),
                    birth_date DATETIME,hire_date DATETIME,
                    contact_number VARCHAR(20),
					email VARCHAR(50),password VARCHAR(15) NOT NULL,
                    photo varchar (50),
					gender VARCHAR(50),
					role_id int not null,
                    constraint fk_role foreign key(role_id) references roles(role_id) on update cascade on delete cascade);

CREATE TABLE roles(role_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, role varchar(50));

CREATE TABLE warehouses(warehouse_id INT NOT NULL AUTO_INCREMENT primary KEY, 
					warehouse_name VARCHAR(20),	
                    capacity bigint);
                    
create table sections(section_id INT NOT NULL AUTO_INCREMENT primary KEY, 
					section_name VARCHAR(20), 
                    capacity bigint);

create table floors(floor_id INT NOT NULL AUTO_INCREMENT primary KEY, 
					floor_number int, 
                    capacity bigint);

 CREATE TABLE materials(material_id INT NOT NULL AUTO_INCREMENT primary KEY, 
					material_name VARCHAR(100),
                    material_description VARCHAR(100),
                    quantity INT NOT NULL,
                    unit_price INT NOT NULL, 
					photo varchar (50));


insert INTO roles(role) VALUES("Incharge");
INSERT INTO roles(role) VALUES("Store Manager");
INSERT INTO roles(role) VALUES("Supervisor");
INSERT INTO roles(role) VALUES("Store Worker");


INSERT INTO employees(empfirst_name,emplast_name,birth_date,hire_date,contact_number, role_id,email,password,photo,gender)
VALUES('Sahil','Mankar','1997-05-19','2021-07-07','8756789158', 2 ,'Sahil22@gmail.com','SM569654' ,'./images/SM.jpg', 'Male');

INSERT INTO employees(empfirst_name,emplast_name,birth_date,hire_date,contact_number, role_id,email,password,photo,gender)
VALUES('Rahul','Desai','1995-08-11','2021-08-04','9856789157', 2 ,'RD@gmail.com','RD854466' ,'./images/SM.jpg', 'Male');

INSERT INTO employees(empfirst_name,emplast_name,birth_date,hire_date,contact_number, role_id,email,password,photo,gender)
VALUES('Siddhesh','Pandit','1996-01-02','2021-09-12','7845967845', 3 ,'SP@gmail.com','SP789956' ,'./images/SM.jpg', 'Male');

INSERT INTO employees(empfirst_name,emplast_name,birth_date,hire_date,contact_number, role_id,email,password,photo,gender)
VALUES('Tejaswini','Salvi','1992-11-19','2020-09-01','9888754415', 3 ,'TS22@gmail.com','TS337845' ,'./images/SM.jpg', 'Female');

INSERT INTO employees(empfirst_name,emplast_name,birth_date,hire_date,contact_number, role_id,email,password,photo,gender)
VALUES('Vedant','Yadav','1987-01-07','2009-03-11','99887564123', 1 ,'VY@gmail.com','VY788814' ,'./images/SM.jpg', 'Male');
