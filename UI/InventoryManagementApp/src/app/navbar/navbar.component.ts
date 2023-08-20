import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private router: Router) { }

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
  console.log(role)
  if (role != null) {
    return true;
  }
  return false;
}
loggedOut(){
  this.router.navigate(['userlogout']);
}
}
