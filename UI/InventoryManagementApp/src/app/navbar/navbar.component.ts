import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../login/login/User';
import { UserService } from '../Services/user.service';

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

  constructor(private router: Router, private usrsvc :UserService) { 
    

  }
  ngOnInit():void{
    const uid=localStorage.getItem("userId");
    if(uid!=null){
      this.id= parseInt(uid);
      this.getUser(this.id);
    }
  }

  isroleSupervisor(): boolean {
    const role = localStorage.getItem("role")
    return role == 'Supervisor';
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
  if (userId != null) {
    return true;

  }
  return false;
}

isLoggedIn():boolean{
  let role =localStorage.getItem("role")
  if (role != null) {
    return true;
  }
  return false;
// you can reolace it with
  //return role != null;

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
