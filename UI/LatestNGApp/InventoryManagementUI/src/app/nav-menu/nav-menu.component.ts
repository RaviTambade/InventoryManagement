import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../Services/user.service';
import { AuthenticationService } from '../Services/authentication.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  isExpanded = false;
  name: string | undefined
  role:string='';
  constructor(private router: Router, private userService: UserService,private authService:AuthenticationService) { }
  ngOnInit(): void {
 
  }

  isRole(): boolean {
    const theRole=localStorage.getItem("role");
    if(theRole){
      this.role=theRole;
      return true
    }
    return false
  }
  isName(): boolean {
    const theName=localStorage.getItem("name");
    if(theName){
      this.name=theName;
      return true
    }
    return false
  }
  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
  isLoggedIn(): boolean {
    let jwt = localStorage.getItem("JWT")
    return jwt != null;
  }



  logOut() {
    localStorage.clear();
    this.router.navigate(['login']);
  }
  onHome(){
    const role=localStorage.getItem("role");
    switch (role) {  
      case "Store Incharge":  
        this.router.navigate(["storeincharge/dashboard"])
        break;
      case "Store Manager":
        this.router.navigate(["storemanager/dashboard"])
        break;
      case "Supervisor":
        this.router.navigate(["supervisor/dashboard"])
        break;
        case "Supervisor Incharge":
        this.router.navigate(["supervisorincharge/dashboard"])
        break;
      case "Store Worker":
        this.router.navigate(["storeworker/dashboard"])
        break;
    }
  }

}
