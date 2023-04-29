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
                    warehouse_capacity int not null,
                    constraint fk_capacity foreign key(warehouse_capacity) references sections(section_id) on update cascade on delete cascade);

create table sections(section_id INT NOT NULL AUTO_INCREMENT primary KEY, 
					section_name VARCHAR(20), 
                    section_capacity int not null,
					constraint fk_capacity foreign key(section_capacity) references floors(floor_id) on update cascade on delete cascade);


create table floors(floor_id INT NOT NULL AUTO_INCREMENT primary KEY, 
					floor_number varchar(20), 
                    mid int not null,
					constraint fk_mid foreign key(mid) references materials(material_id) on update cascade on delete cascade);

insert into floors(floor_number,mid) values('A1',1);
insert into floors(floor_number,mid) values('A2',2);
insert into floors(floor_number,mid) values('A3',3);


insert into floors(floor_number,mid) values('B1',4);
insert into floors(floor_number,mid) values('B2',4);
insert into floors(floor_number,mid) values('B3',4);


insert into floors(floor_number,mid) values('C1',4);
insert into floors(floor_number,mid) values('C2',4);
insert into floors(floor_number,mid) values('C3',4);


insert into floors(floor_number,mid) values('D1',4);
insert into floors(floor_number,mid) values('D2',4);
insert into floors(floor_number,mid) values('D3',4);

insert into floors(floor_number,mid) values('E1',4);
insert into floors(floor_number,mid) values('E2',4);
insert into floors(floor_number,mid) values('E3',4);

insert into floors(floor_number,mid) values('F1',4);
insert into floors(floor_number,mid) values('F2',4);
insert into floors(floor_number,mid) values('F3',4);


drop table floors, materials;
select * from materials;
 CREATE TABLE materials(material_id INT NOT NULL AUTO_INCREMENT primary KEY, 
					material_name VARCHAR(100),
                    material_type VARCHAR(100),
                    quantity INT NOT NULL,
                    unit_price INT NOT NULL, 
					photo varchar (50));
 
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
