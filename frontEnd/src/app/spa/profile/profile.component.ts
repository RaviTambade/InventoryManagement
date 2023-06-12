import { Component } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  employee: any | undefined;
  id :number=5;
  constructor(private svc: AppService) { }
  
  ngOnInit(): void {
    this.svc.getById(this.id).subscribe((response) => {
    console.log(response);
    this.employee=response
})

}
}
