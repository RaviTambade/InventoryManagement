## REST API EndPoints
### Employee API
 
  - <b>URL</b> : /api/employees/employees
  - <b>Method</b>: GET
  - <b>Description</b>: Get the Total Employees 
  - <b>Body</b>: Not requried
  - <b>JWTToken Header</b>: Not required
  - <b>Response</b> = 
    ```console
    [
      {
        "userId": 0,
        "department": "string",
        "role": "string",
        "hireDate": "2023-10-17T09:35:03.460Z"
     }
    ]
    ```

  - <b>URL</b> : /api/employees/employee/{id}
  - <b>Method</b>: GET
  - <b>Description</b>: Get the Employee of given Id
  - <b>Body</b>: Not requried
  - <b>JWTToken Header</b>: Not required
  - <b>Response</b> = 
    ```console
    [
      {
        "userId": 3,
        "department": "Store",
        "role": "Store Manager",
        "hireDate": "0001-01-01T00:00:00"
      }
    ]
    ```

  - <b>URL</b> : /api/employees/department/{department}
  - <b>Method</b>: GET
  - <b>Description</b>: Get the Employees of given department
  - <b>Body</b>: Not requried
  - <b>JWTToken Header</b>: Not required
  - <b>Response</b> = 
    ```console
    [
      {
        "userId": 3,
        "department": "Store",
        "role": "Store Manager",
        "hireDate": "0001-01-01T00:00:00"
      }
    ]
    ```


  - <b>URL</b> : /api/employees/roles/{role}
  - <b>Method</b>: GET
  - <b>Description</b>: Get the Employees of given role
  - <b>Body</b>: Not requried
  - <b>JWTToken Header</b>: Not required
  - <b>Response</b> = 
    ```console
    [
      {
        "userId": 0,
        "department": "string",
        "role": "string",
        "hireDate": "2023-10-17T09:46:08.327Z"
      }
    ]
    ```

  - <b>URL</b> : /api/employees/role/{id}
  - <b>Method</b>: GET
  - <b>Description</b>: Get the Employee role of given Id
  - <b>Body</b>: Not requried
  - <b>JWTToken Header</b>: Not required
  - <b>Response</b> = 
    ```console
    [
      {  
        "role": "Store Manager", 
      }
    ]
    ```

  - <b>URL</b> : /api/employees/employees/{id}
  - <b>Method</b>: DELETE
  - <b>Description</b>: Delete Employee of given id
  - <b>Body</b>: Not requried
  - <b>JWTToken Header</b>: Not required
  - <b>Response</b> = 
    ```console
    [
      true/false
    ]
    ``` 

  - <b>URL</b> : /api/employees/departments
  - <b>Method</b>: GET
  - <b>Description</b>: Get All Departments
  - <b>Body</b>: Not requried
  - <b>JWTToken Header</b>: Not required
  - <b>Response</b> = 
    ```console
    [
      "HR",
      "Store",
      "GB500 Line",
      "GB400 Line",
      "GB540 Line",
      "worker",
      "Engine Line",
      "Chassis Assembly",
      "Interior Assembly",
      "Production"
    ]
    ``` 

  - <b>URL</b> : /api/employees/roles
  - <b>Method</b>: GET
  - <b>Description</b>: Get All roles
  - <b>Body</b>: Not requried
  - <b>JWTToken Header</b>: Not required
  - <b>Response</b> = 
    ```console
    [
      "Store Incharge",
      "Store Manager",
      "Supervisor",
      "Store Worker",
      "Supervisor Incharge",
      "Store Incharge",
      "Store Manager",
      "Supervisor",
      "Store Worker",
      "Supervisor Incharge"
    ]
    ```

    
  - <b>URL</b> : /api/employees/employee
  - <b>Method</b>: POST
  - <b>Description</b>: Add new employee in list
  - <b>Body</b>: Not requried
  - <b>JWTToken Header</b>: Not required
  - <b>Response</b> = 
    ```console
    [
      true/false
    ]
    ``` 

  - <b>URL</b> : /api/employees/employee
  - <b>Method</b>: PUT
  - <b>Description</b>: Update Existing Employee
  - <b>Body</b>: Not requried
  - <b>JWTToken Header</b>: Not required
  - <b>Response</b> = 
    ```console
    [
      true/false
    ]
    ``` 

 <h4>Initial Requests </h4>
 <hr>

 
 ```console
http://localhost:5262/api/InitialRequest/items/{empid}

```

Description    : Tray of given employee Id

Body           : None

Response        :

```console

{
    "id": 0,
    "requestId": 0,
    "name": "string",
    "category": "string",
    "imageUrl": "string",
    "quantity": 0,
    "employeeId": 0
  }
```
Token required : No

<hr>

<hr>

 
 ```console

http://localhost:5262/api/InitialRequest/item

```

Description    : update tray

Type     : Put
 

 
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

true
```
Token required : No

<hr>
<hr>

 
 ```console

http://localhost:5262/api/InitialRequest/item/{id}

```

Description    : Delete Items in tray of given id

Type     : Delete

Body           : None
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
Token required : No

<hr>

<hr>

 
 ```console

http://localhost:5262/api/InitialRequest/items/{empid}

```

Description    : delete tray of given employeeId

Type     : Delete

Body           : None

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

true
```
Token required : No

<hr>

<hr>

 
 ```console

http://localhost:5262/api/InitialRequest/item
```

Description    : Add new material in Tray

Type     : Post

Body           : None
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

true
```
Token required : No

<hr>

<hr>

 
 ```console

http://localhost:5262/api/InitialRequest/ChangeStatus

```

Description    : update status in material requests

Type     : Put

Body           : None
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

true
```
Token required : No
<hr>

 
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
