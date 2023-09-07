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

  isLoggedIn:boolean=false;


  constructor(private router: Router, private usrsvc :UserService) { 
   
  }
  ngOnInit():void{
    const uid=localStorage.getItem("userId");
    if(uid!=null){
      this.id= parseInt(uid);
      this.getUser(this.id);
      this.isLoggedIn=true;

    }
    const role=localStorage.getItem("role");
    if(role){
      this.isLoggedIn=true;
    }
    console.log(role);
    // if (role === 'Supervisor') {
    //   this.isroleSupervisor = true;
    // } else if (role === 'Store Manager') {
    //   this.isroleStoreManager = true;
    // } else if (role === 'Store Worker') {
    //   this.isroleStoreWorker = true;
    // } else if (role === 'Store Incharge') {
    //   this.isroleStoreIncharge = true;
    // }    
  }

  isroleSupervisor(): boolean {
    const role = localStorage.getItem("role")
    return role == 'Supervisor';
  }
  isroleStoreIncharge(): boolean {
    const role = localStorage.getItem("role")
    return role == 'Store Incharge';
  }
  isroleStoreManager(): boolean {
    const role = localStorage.getItem("role")
    return role == 'Store Manager';
  }

  isroleStoreWorker(): boolean {
    const role = localStorage.getItem("role")
    return role == 'Store Worker';
  }

 
isUser():boolean{
  const userId = localStorage.getItem("userId")
  return userId!=null;
}

loggedOut(){
  localStorage.clear();
  this.isLoggedIn=false;
  this.router.navigate(['login']);

}

profile(){
 console.log("profile")
}


getUser(userid:number){
  this.usrsvc.getUser(userid).subscribe((res)=>{
    console.log(res);
    console.log(res);
    this.user=res;
  })
}
}
