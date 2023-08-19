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
    return role == 'StoreManager';
  }

  isroleStoreWorker(): boolean {
    const role = localStorage.getItem("role")
    return role == 'StoreWorker';
  }

  openUserProfile() {
    this.router.navigate(['userinfo']);
}

isUser():boolean{
  const userId = localStorage.getItem("userId")
  if (userId != null) {
    return true;
  }
  return false;
}

isLoggedIn():boolean{
  const jwt =localStorage.getItem("jwt")
  if (jwt != null) {
    return false;
  }
  return true;
}
loggedOut(){
  this.router.navigate(['userlogout']);
}
}
