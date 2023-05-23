import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/search-material', title: 'Search Material',  icon:'', class: '' },
    { path: '/login', title: 'login',  icon:'', class: '' },
    { path: '/register', title: 'register',  icon:'', class: '' },
    { path: '/employee-list', title: 'employee list',  icon:'', class: '' },
    { path: '/employee-details', title: 'employee details',  icon:'', class: '' },
    { path: '/material-list', title: 'Matetrial list',  icon:'', class: '' },
    { path: '/material-update-form', title: 'Update Material',  icon:'', class: '' },
    { path: '/order', title: 'Order',  icon:'', class: '' },
    { path: '/orders-history', title: 'Orders History',  icon:'', class: '' },

    // { path: '/typography', title: 'Typography',  icon:'library_books', class: '' },
    // { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
    // { path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
    // { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
    // { path: '/user-profile', title: 'User Profile',  icon:'person', class: '' },

];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
