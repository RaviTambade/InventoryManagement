import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
import { User } from 'src/app/login/login/User';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  user: User = new User(
    1, // id
    '', // aadharId
    '', // firstName
    '', // lastName
    new Date(''), // birthDate
    '', // gender
    '', // email
    '' // contactNumber
  );
  id:number=0;
  isroleSupervisor:boolean=false;
  isroleStoreManager:boolean=false;
  isroleStoreWorker:boolean=false;
  isroleStoreIncharge:boolean=false;
  isLoggedIn:boolean=false;


  constructor(private router: Router, private usrsvc :UserService) { 
   
  }
  ngOnInit():void{
    const uid=localStorage.getItem("userId");
    if(uid!=null){
      this.id= parseInt(uid);
      this.getUser(this.id);
    }
    const role=localStorage.getItem("role");
    if(role){
      this.isLoggedIn=true;
    }
    console.log(role);
    if (role === 'Supervisor') {
      this.isroleSupervisor = true;
    } else if (role === 'Store Manager') {
      this.isroleStoreManager = true;
    } else if (role === 'Store Worker') {
      this.isroleStoreWorker = true;
    } else if (role === 'Store Incharge') {
      this.isroleStoreIncharge = true;
    }    
  }


  // isroleSupervisor(): boolean {
  //   const role = localStorage.getItem("role")
  //   return role == 'Supervisor';
  // }

  // isroleStoreManager(): boolean {
  //   const role = localStorage.getItem("role")
  //   return role == 'Store Manager';
  // }

  // isroleStoreWorker(): boolean {
  //   const role = localStorage.getItem("role")
  //   return role == 'Store Worker';
  // }
  // isroleStoreIncharge(): boolean {
  //    console.log("storeincharge")
  //   const role = localStorage.getItem("role")
  //   return role == 'Store Incharge';
  // }
 

isUser():boolean{
  const userId = localStorage.getItem("userId")
  return userId!=null;
}

loggedOut(){
  localStorage.clear();
  this.router.navigate(['login']);

}

profile(){
 console.log("profile")
}


getUser(userid:number){
  this.usrsvc.getUser(userid).subscribe((res)=>{
    console.log(res);
    this.user=res;
  })
}
}
