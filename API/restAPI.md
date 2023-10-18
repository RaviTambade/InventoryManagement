## REST API EndPoints
### Employee API

 
  - <b>URL</b> : /api/employees/employees
  - <b>URL</b> : /api/employees/
  - 
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
  - <b>URL</b> : /api/employees/{id}
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
  - <b>URL</b> : /api/employees/departments/{deptid}
  -  - /api/employees/departments/{name}
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
  -  /api/employees/roles/{roleid}
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


      [
      {
         roleid:23,
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
  - <b>Description</b>: Update Existing Employee in list
  - <b>Body</b>: Not requried
  - <b>JWTToken Header</b>: Not required
  - <b>Response</b> = 
    ```console
    [
      true/false
    ]
    ``` 


 ### InitialRequests API

  - <b>URL</b> : /api/InitialRequest/items/{empid}
  - <b>Method</b>: GET
  - <b>Description</b>: Get Tray of given employee Id
  - <b>Body</b>: Not requried
  - <b>JWTToken Header</b>: Not required
  - <b>Response</b> = 
    ```console
    [
     {
      "id": 0,
      "requestId": 0,
      "name": "string",
      "category": "string",
      "imageUrl": "string",
      "quantity": 0,
      "employeeId": 0
      }
    ]
    ``` 
 
  - <b>URL</b> : /api/InitialRequest/item/{id}
  - <b>Method</b>: DELETE
  - <b>Description</b>: Remove Item in tray of given Id
  - <b>Body</b>: Not requried
  - <b>JWTToken Header</b>: Not required
  - <b>Response</b> = 
    ```console
    [
     true/false
    ]
    ``` 

  - <b>URL</b> : /api/InitialRequest/items/{empid} 
  - <b>Method</b>: DELETE
  - <b>Description</b>:delete tray of given employeeId
  - <b>Body</b>: Not requried
  - <b>JWTToken Header</b>: Not required
  - <b>Response</b> = 
    ```console
    [
     true/false
    ]
    ``` 

  - <b>URL</b> : /api/InitialRequest/ChangeStatus
  - <b>Method</b>: PUT
  - <b>Description</b>: Update status of given Id
  - <b>Body</b>: Not requried
  - <b>JWTToken Header</b>: Not required
  - <b>Response</b> = 
    ```console
    [
     true/false
    ]
    ``` 

   - <b>URL</b> : /api/InitialRequest/item
  - <b>Method</b>: POST
  - <b>Description</b>: Add new Items in Tray
  - <b>Body</b>: Not requried
  - <b>JWTToken Header</b>: Not required
  - <b>Response</b> = 
    ```console
    [
     true/false
    ]
    ``` 
 

 



### Warehouse API

  - <b>URL</b> : /api/warehouse
  - <b>Method</b>: GET
  - <b>Description</b>: Get all section from the warehouse
  - <b>Body</b>: Not requried
  - <b>JWTToken Header</b>: Required
  - <b>Response</b> = 
    ```console
    [
      {
    "id": 0,
    "employeeId": 0,
    "section": "string",
    "materialType": "string",
    "imageUrl": "string"
     }

    ]
    ```

  - <b>URL</b> : /api/warehouse
  - <b>Method</b>: Post
  - <b>Description</b>: Insert new section in warehouse.
  - <b>Body</b>: 
   ```console
   {
      "id": 0,
      "employeeId": 0,
      "section": "string",
      "materialType": "string",
      "imageUrl": "string"
    }
   ```
  - <b>JWTToken Header</b>: Required
  - <b>Response</b> = 
   ```console
   {
      true/false
    }
   ```
 
  - <b>URL</b> : /api/warehouse
  - <b>Method</b>: Put
  - <b>Description</b>: update warehouse staff
  - <b>Body</b>: 
 ```console
{
  "id": 0,
  "employeeId": 0
}
```
  - <b>JWTToken Header</b>: Required
  - <b>Response</b> = 
   ```console
   {
      true/false
    }
   ```


  - <b>URL</b> : /api/warehouse
  - <b>Method</b>: Delete
  - <b>Description</b>: remove section from the warehouse
  - <b>Body</b>: Not requried
  - <b>JWTToken Header</b>: Required
  - <b>Response</b> = 
   ```console
   {
      true/false
    }
   ```


### Shipments API


  - <b>URL</b> : /api/shipments/{employeeId}
  - <b>Method</b>: Get
  - <b>Description</b>: get shipment list of shipper
  - <b>Body</b>: Not requried
  - <b>JWTToken Header</b>: Required
  - <b>Response</b> = 
```console
  {
    "id": 0,
    "date": "2023-10-17T10:41:05.140Z",
    "status": "string"
  }
 ```



  - <b>URL</b> : /api/shipments/taskdetails/{taskId}
  - <b>Method</b>: Get
  - <b>Description</b>: get task details of given task id
  - <b>Body</b>: Not requried
  - <b>JWTToken Header</b>: Required
  - <b>Response</b> = 
```console
  {
    "orderId": 1,
    "taskId": 1,
    "section": "Section 1",
    "department": "GB500 Line",
    "status": "Delivered"
  }
```


  - <b>URL</b> : /api/shipments/updatestatus/{id}/{taskStatus}
  - <b>Method</b>: Put
  - <b>Description</b>: get task status to picked/delivered
  - <b>Body</b>: Not requried
  - <b>JWTToken Header</b>: Required
  - <b>Response</b> = 
```console
  {
    True/false
  }
```




### Request API

  - <b>URL</b> : /api/request/{employeeId}
  - <b>Method</b>: Get
  - <b>Description</b>: Get requests list of supervisor
  - <b>Body</b>: Not requried
  - <b>JWTToken Header</b>: Required
  - <b>Response</b> = 
```console
  {
    "id": 0,
    "date": "2023-10-17T10:57:12.779Z",
    "status": "string",
    "userId": 0
  }

```
