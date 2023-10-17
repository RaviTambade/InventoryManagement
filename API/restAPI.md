
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

 