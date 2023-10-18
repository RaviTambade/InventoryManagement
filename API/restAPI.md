
<h4>Employees </h4>

```console

    http://localhost:5140/api/employees/employees

```
Description    : Return Total Employees

Parameter      : EmployeeId

Body           : None

Response        :

```console

  {
    "userId": 0,
    "department": "string",
    "role": "string",
    "hireDate": "2023-10-17T09:35:03.460Z"
  }


```
Token required : No

<hr>

           

```console

http://localhost:5140/api/employees/employee/{id}

```

Description    : Return Employee of given id

Parameter      : EmployeeId

Body           : None

Response        :

```console

{
  "userId": 3,
  "department": "Store",
  "role": "Store Manager",
  "hireDate": "0001-01-01T00:00:00"
}

```
Token required : No

<hr>

 
 ```console

http://localhost:5140/api/employees/employee/{id}

```

Description    : Return Employee of given id

Parameter      : EmployeeId

Body           : None

Response        :

```console

{
  "userId": 3,
  "department": "Store",
  "role": "Store Manager",
  "hireDate": "0001-01-01T00:00:00"
}

```
Token required : No

<hr>

 ```console

http://localhost:5140/api/employees/department/{department}

```

Description    : Return Employees of given department

Parameter      : Department

Body           : None

Response        :

```console
{
  "userId": 3,
  "department": "Store",
  "role": "Store Manager",
  "hireDate": "0001-01-01T00:00:00"
}

```
Token required : No

<hr>

 ```console

http://localhost:5140/api/employees/roles/{role}

```

Description    : Return Employees of given role

Parameter      : role

Body           : None

Response        :

```console

{
    "userId": 0,
    "department": "string",
    "role": "string",
    "hireDate": "2023-10-17T09:46:08.327Z"
  }
```
Token required : No

<hr>

 ```console

http://localhost:5140/api/employees/role/{id}

```

Description    : Return EmployeeS Role of given id

Parameter      : EmployeeId

Body           : None

Response        :

```console

{  
  "role": "Store Manager", 
}

```
Token required : No

<hr>

 ```console

http://localhost:5140/api/employees/employees/{id}

```

Description    : Delete Employee of given id

Parameter      : EmployeeId

Body           : None

Response        :

```console
true

```
Token required : No

<hr>

 ```console

http://localhost:5140/api/employees/departments

```

Description    : Return Employee of given id

Parameter      : EmployeeId

Body           : None

Response        :

```console

{
  "userId": 3,
  "department": "Store",
  "role": "Store Manager",
  "hireDate": "0001-01-01T00:00:00"
}

```
Token required : No

<hr>

 ```console

http://localhost:5140/api/employees/employee/{id}

```

Description    : Return Employee of given id

Parameter      : EmployeeId

Body           : None

Response        :

```console

{
  "userId": 3,
  "department": "Store",
  "role": "Store Manager",
  "hireDate": "0001-01-01T00:00:00"
}

```
Token required : No

<hr>

 ```console

http://localhost:5140/api/employees/employee/{id}

```

Description    : Return Employee of given id

Parameter      : EmployeeId

Body           : None

Response        :

```console

{
  "userId": 3,
  "department": "Store",
  "role": "Store Manager",
  "hireDate": "0001-01-01T00:00:00"
}

```
Token required : No

<hr>

 

 
<h4>WareHouse   </h4>

```console

    http://localhost:5131/api/warehouse/warehouses

```
Method         : Get

Description    : Return Total Sections in warehouse

Parameter      :  noun

Body           : None

Response        :

```console

   {
    "id": 0,
    "employeeId": 0,
    "section": "string",
    "materialType": "string",
    "imageUrl": "string"
  }


```
Token required : Yes

<hr>

           
```console

    http://localhost:5131/api/warehouse/warehouse

```
Method         : Post

Description    : Insert new section in warehouse

Parameter      :  Noun

Body           : 

```console


{
    "id": 0,
  "employeeId": 0,
  "section": "string",
  "materialType": "string",
  "imageUrl": "string"
}

```

Response        :

```console

   True


```
Token required : Yes

<hr>

```console

http://localhost:5131/api/warehouse/warehouse

```
Method         : Put

Description    : Update warehouse staff

Parameter      : EmployeeId

Body           :

```console

{
  "id": 0,
  "employeeId": 0
}

```
Response        :

```console

true

```
Token required : Yes

<hr>


```console

http://localhost:5131/api/warehouse/{id}

```
Method         : Delete

Description    : Remove section from the warehouse

Parameter      : Id

Body           : Noun


Response        :

```console

true

```
Token required : Yes

<hr>



<h2>Shipments</h2>

```console

http://localhost:5112/api/shipment/shipments/{employeeId}

```
Method         : Get

Description    : Get shipments details

Parameter      : EmployeeId

Body           : Noun


Response        :

```console

{
    "id": 0,
    "date": "2023-10-17T10:41:05.140Z",
    "status": "string"
  }

```
Token required : Yes

<hr>



```console

http://localhost:5112/api/shipment/shippingdetails/{taskId}

```
Method         : Get

Description    : Get shipping details

Parameter      : EmployeeId

Body           : Noun


Response        :

```console

{
    "orderId": 1,
    "taskId": 1,
    "section": "Section 1",
    "department": "GB500 Line",
    "status": "Delivered"
  }

```
Token required : Yes

<hr>



```console

http://localhost:5112/api/shipment/updatestatus/{Id}/{orderStatus}

```
Method         : Put

Description    : Update order status

Parameter      : Id, status

Body           : Noun


Response        :

```console

{
    true
  }

```
Token required : Yes

<hr>




```console

http://localhost:5231/api/request/requests/{employeeId}

```
Method         : Get

Description    : Get requests list

Parameter      : 1

Body           : Noun


Response        :

```console

{
    "id": 0,
    "date": "2023-10-17T10:57:12.779Z",
    "status": "string",
    "userId": 0
}

```
Token required : Yes

<hr>




```console

http://localhost:5231/api/request/requests/{employeeId}

```
Method         : Get

Description    : Get requests list

Parameter      : 1

Body           : Noun


Response        :

```console

{
    "id": 0,
    "date": "2023-10-17T10:57:12.779Z",
    "status": "string",
    "userId": 0
}

```
Token required : Yes

<hr>
