## REST API EndPoints
### Employee API
  - <b>URL</b> : /api/employees/employees
  - <b>URL</b> : /api/employees 
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
 
  - <b>Method</b>: GET
  - <b>Description</b>: Get list of  employees of a department
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
  -  <b>URL</b> :/api/employees/roles/{role}
  - <b>Method</b>: GET
  - <b>Description</b>: Get list of Employees of given role
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
  - <b>URL</b> : /api/roles/employees/{empid}
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
  - <b>URL</b> : /api/employees/{id}
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
  - <b>URL</b> : /api/departments/
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
  - <b>URL</b> : /api/roles/inventory
  - <b>Method</b>: GET
  - <b>Description</b>: Get All roles of inventory management
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
  - <b>URL</b> : /api/employees
  - <b>Method</b>: POST
  - <b>Description</b>: Add new employee in list
  - <b>Body</b>:
      {
        "userId": 0,
        "department": "string",
        "role": "string",
        "hireDate": "2023-10-17T09:46:08.327Z"
      }
  - <b>JWTToken Header</b>: Not required
  - <b>Response</b> = 
    ```console
    [
     
    ]
    ``` 

  - <b>URL</b> : /api/employees/employee
  - <b>URL</b> : /api/employees
  - <b>Method</b>: PUT
  - <b>Description</b>: Update Existing Employee in list
  - <b>Body</b>:
      {
        "userId": 0,
        "department": "string",
        "role": "string",
        "hireDate": "2023-10-17T09:46:08.327Z"
      }
  - <b>JWTToken Header</b>: Not required
  - <b>Response</b> = 
    ```console
    [
      true/false
    ]
    ``` 


 ### InitialRequests API

  - <b>URL</b>: /api/InitialRequest/items/{empid}
  - <b>URL</b>: /api/tray/employees/{empid}
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
  - <b>URL</b> : /api/tray/items/{id}
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
  - <b>URL</b> : /api/tray/employees/{empid} 
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
  - <b>URL</b> : /api/tray/{trayid}/Status/{status}
  - <b>Method</b>: PUT
  - <b>Description</b>: Update status of given Id
  - <b>Body</b>: 
    {
      "id":0,
      "statusId":0
    }
  - <b>JWTToken Header</b>: Not required
  - <b>Response</b> = 
    ```console
    [
     true/false
    ]
    ``` 

   - <b>URL</b> : /api/InitialRequest/item
   - <b>URL</b> : /api/tray/items
  - <b>Method</b>: POST
  - <b>Description</b>: Add new Items in Tray
  - <b>Body</b>: 
    {
      "initialRequestId":0,
      "materialId":0,
      "quantity":0
    }
  - <b>JWTToken Header</b>: Not required
  - <b>Response</b> = 
    ```console
    [
     true/false
    ]
    ``` 
 



















 




### Warehouse API

  - <b>URL</b> : /api/warehouses/warehouse
  - <b>URL</b> : /api/warehouse/sections
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

  - <b>URL</b> : /api/warehouse/warehouses
  - <b>URL</b> : /api/warehouse/section
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

  - <b>URL</b> : /api/warehouse/warehouses
  - <b>URL</b> : /api/warehouse/staff
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


  - <b>URL</b> : /api/warehouse/warehouses
  - <b>URL</b> : /api/warehouse/section
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


  - <b>URL</b> : /api/shipments/shipments/{employeeId}
  - <b>URL</b> : /api/shipments/employees/{employeeId}
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
  - /api/shipments/tasks/{taskId}
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
  - /api/shipments/tasks/{id}/status/{taskStatus}
  - <b>Method</b>: Put
  - <b>Description</b>: update task status to picked/delivered
  - <b>Body</b>: Not requried
  - <b>JWTToken Header</b>: Required
  - <b>Response</b> = 
```console
  {
    True/false
  }
```

### Production API
 - <b>URL</b> : /api/production/productionstaffs
  - <b>Method</b>: GET
  - <b>Description</b>: get all productionstaff
  - <b>Body</b>: Not requried
  - <b>JWTToken Header</b>: Required
  - <b>Response</b> = 
```console
  {
    "id":0,
    "department":"string",
    "firstSupervisor":0,
    "secondSupervisor":0
  }
```


### Material API

  - <b>URL</b> : api/Materials/materials/{materialId}
  - <b>Method</b>: Put
  - <b>Description</b>: get material details of given Id
  - <b>Body</b>: Not requried
  - <b>JWTToken Header</b>: Required
  - <b>Response</b> = 
```console
  [
      {
        "id": 3,
        "name": "Bush Bearing",
        "type": "Bearings",
        "quantity": 4496,
        "unitPrice": 15,
        "imageUrl": "/assets/img/Bearing.jpeg"
      }
  ]
```

 - <b>URL</b> : /api/materials/categories
  - <b>Method</b>: GET
  - <b>Description</b>: get all productionstaff
  - <b>Body</b>: Not requried
  - <b>JWTToken Header</b>: Required
  - <b>Response</b> = 
```console
  {
    "id":0,
    "department":"string",
    "firstSupervisor":0,
    "secondSupervisor":0
  }
```




### Request API

  - <b>URL</b> : /api/request/requests/{employeeId}
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


  - <b>URL</b> : /api/request/request/requestdetails/{requestId}
  - <b>URL</b> : /api/request/requestdetails/{requestId}
  - <b>Method</b>: Get
  - <b>Description</b>: get request details
  - <b>Body</b>: Not requried
  - <b>JWTToken Header</b>: Required
  - <b>Response</b> = 
 ```console
  [
  {
    "id": 55,
    "date": "2022-12-02T14:20:10",
    "status": "Delivered",
    "name": "2nd Gear of ratio 3.6",
    "category": "1st Gear",
    "quantity": 75,
    "shipperId": 35
  }
]
  
 ```

  - <b>URL</b> : /api/request/delete/request/{requestId}
  - <b>URL</b> : /api/request/{requestId}
  - <b>Method</b>: Delete
  - <b>Description</b>: delete request
  - <b>Body</b>: Not requried
  - <b>JWTToken Header</b>: Required
  - <b>Response</b> = 
```console
  [
  True
]
  
 ```

  - <b>URL</b> : /api/request/item/{Id}
  - <b>URL</b> : /api/request/item{itemId}
  - <b>Method</b>: Delete
  - <b>Description</b>: delete items 
  - <b>Body</b>: Not requried
  - <b>JWTToken Header</b>: Required
  - <b>Response</b> = 
```console
  [
  True
]
  
```    

  - <b>URL</b> : /api/request/yearlyrequests/{Id}/{year}
  - <b>URL</b> : /api/request/yearlyrequestreport/{Id}/{year}
  - <b>Method</b>: Get
  - <b>Description</b>: Get Yearly requests 
  - <b>Body</b>: Not requried
  - <b>JWTToken Header</b>: Required
  - <b>Response</b> = 
```console
[
  {
    "period": "January",
    "requests": 18
  },
  {
    "period": "February",
    "requests": 31
  },
  {
    "period": "March",
    "requests": 30
  },
  {
    "period": "April",
    "requests": 18
  },
  {
    "period": "May",
    "requests": 23
  }
]
  
```    
    

