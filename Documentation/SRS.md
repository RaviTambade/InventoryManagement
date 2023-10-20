Inventory management
Title:- Inventory Management
Category- Web application

Purpose
The purpose of developing this “Inventory management system” is to maintain
required material and storing material in an organized manner in the warehouse. Also
supply required material for the assembly lines. And keep employees connected to each
other virtually.

Scope
This system is being produced for manufacturing companies to maintain their
warehouses and it's only accessible for its authorized employees (not for everyone). This
system will be built by considering the Incharge's perspective, store manager’s
perspective, supervisor’s perspective and store workers perspective.
This system will only allow Incharge to add new employees and give him/her the
authorization as per their role. This system will allow store managers to see stocks
available in the warehouse, add new material in the warehouse and to update quantities
of materials in the warehouse.. Similarly the supervisor can see all available material
and order it as per their requirements. Furthermore, the supervisor can see the name
and contact number of the worker that is delivering the order. This system will provide
store workers to see the ordered material information, location is in the warehouse and
from where its been ordered.
This system will have numerous constraints on what it can do. This system will
not allow any employees to see or update information of employees except Incharge.
Only store managers will be allowed to add, update and delete material status. Store
manager cannot add more material in the warehouse if it's full. The only supervisor can
order materials which are available in the warehouse. Supervisor can order only 10
items in one order. Store workers have to deliver orders in a given time.
Existing system
The present system is a manual system.Manual system involves paper work in the
form of maintaining various files and manuals. Maintaining critical information in the
files and manuals is full of risk and a tedious process.

A manual system has the following disadvantages.
❖ In the existing system store managers have to manually search to check whether
the material is available or not.
❖ In the existing system store managers have to inform every supervisor about the
available stock.
❖ In the existing system store managers have to manually maintain checked-in and
checked-out material data.
❖ In the existing system supervisors have to call store managers to order required
material.
❖ Supervisors have to manually maintain order history in files.
❖ Sometimes store workers deliberately delay the orders.
❖ It's difficult for store workers to remember material’s location in the warehouse,
it's become a time consuming task for workers to find required material.
❖ Store workers have to write down the list of ordered materials.
❖ Breakdowns in communication between store manager, supervisor and worker
leads to delay in execution.
Proposed System
Inventory management will resolve all the disadvantages of the existing system.
The goal is to achieve a user-friendly UI,portable, maintainable, durable and secure
system that helps to reduce additional workload and time of employees.
Advantages for Incharge
Advantages for incharge are explained below
Authority and security: Only incharge can add, remove and give permissions to
the employees. Which keeps the organization safe and secure.
Overview of the whole system: incharge can easily see details about every
material, employee information,orders history, warehouse status which gives full
control of the system to the incharge.
Advantages for Store Managers
Advantages for Store Managers are explained below
Time saving: store managers can see all the stocks which are currently available
in the warehouse,Similarly store managers can search material by its id which will save a
lot of time.
Breakout from tedious paperwork: all the incoming and outgoing material
records will be automatically stored in a database which will make this process
effortless.
Easy for monitoring: store managers can easily update quantities, as well as add,
remove material in the warehouse. Similar store manager will be notified in case of
shortage in material, excessive material, overload on warehouse which will provide store
managers complete control over warehouse
Advantages for Supervisor’s
Advantages for supervisor’s are explained below
Easy to order: supervisor’s can see all the stocks which are currently available in
the warehouse,Similarly supervisor’s can search material by its id and order various
materials at the same time.
Maintainable: every order details will be stored in order history which will save a
lot of paperwork and time.
Easy to monitor: after every order supervisor’s will get the name and contact
number of the store worker so in case of delay the supervisor can call the worker.
Advantages for Store Workers
Advantages for store workers are explained below
Time saving: store workers can see all order details and its location in the
warehouse which save lots of time.
maintainable : orders history will be saved in the database which helps to
maintain their work record.
Store workers will get a supervisor's contact number in case of any problem or
query.

Functional requirements
This system will only be accessible for employees of the company. Depending upon the
role every employee will have different authorization. In this system every employee will
see his/her personal information.
Incharge
❖ Incharge can add a new employee and give him/her authorization as per the role.
❖ On Inchages dashboard he/she can see details of every employee. As well as
incharge can see available material, required material, history of material which
is ordered by supervisors.
Store Manager
❖ Only the store managers will be authorized for insertion, modification and
deletion of the materials in the warehouse.
❖ Store managers can search material by material id to check available quantities .
❖ all the incoming and outgoing material records will be automatically stored in a
database.
❖ Store managers can see information of store workers as well as performance of
every worker in graph format.
Supervisors
❖ Supervisors can see quantities of material which is available in warehouse
❖ Supervisors can search material by its material id
❖ Supervisors can order various material at same time
❖ Supervisors can see their orders history.
❖ Supervisor can see information of the store worker who’s delivering the order.
Store workers
❖ Store workers can see all the information about ordered materials.
❖ Store workers can see the exact location in the warehouse of ordered materials.

Non Functional requirements:
Security
● Employees with a valid user and password will use this application(Not for
everyone).
● No employee can access other employees' details except incharge .
● Only Incharge will be able to give authorization to employees. Similarly add new
employees and remove existing employees.
Availability
● Uptime: 24* 7 available
Maintainability
● A Commercial database software will be used to maintain System data
Persistence.
● A Web Server will be installed to host online Inventory Management(Web
Application) to management server capabilities.
● The IT operations team will easily monitor and configure System using
administrative tools provided by Servers.
● Separate environment will be maintained for system for isolation in production,
testing, and development
Portability
● The system will provide a portable User Interface (HTML, CSS, Angular) through
which users will be able to access the web application.
● The system can be deployed to a single server, multi-server, to any OS, Cloud
(Azure or AWS or GCP).
Accessibility
● Only registered employees will be able to log in after authentication.
Durability
● The system will maintain employee details.
● The system will implement backup and recovery for retaining users data, and
their business data over time.
● The system will use cache for faster data retrieval and improve performance.
Modularity
● The system will be designed and developed using reusable, independent or
dependent business scenarios in the form of modules.
● These modules will be loosely coupled and highly cohesive.
Scalability
● The system will be able to provide a consistent user experience to users
irrespective of load.
Safety
● The employees login page will be secure from malicious attacks, and phishing.
● Separate environments will be maintained for systems for isolation in
production, testing, and development.
● The IT operations team will easily monitor and configure System using
administrative tools provided by Servers.
SOFTWARE TOOLS
Database Server: Microsoft SQL Server-2012
Client: Microsoft Internet Explorer or any web browser
Development Tools: Microsoft Visual Studio 2019
Programming Language: C#.Net