import { Component } from '@angular/core';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent {

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
}
