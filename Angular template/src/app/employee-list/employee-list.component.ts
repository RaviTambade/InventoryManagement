import { Component, OnInit } from '@angular/core';
import { Employee } from 'app/Employee';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit  {

  employee:Employee[] |undefined;
  constructor(private svc:CustomerService, private router:Router){}
  
  ngOnInit(): void {
    this.svc.getAll().subscribe((response)=>
    {
        this.customers=response;
        console.log(response);
    })
  }

  onSelectCustomer(customer:any){
    if(customer!=undefined)
    this.router.navigate(['Customer/customer',customer.customerId]);
    console.log(customer);
  }

}
