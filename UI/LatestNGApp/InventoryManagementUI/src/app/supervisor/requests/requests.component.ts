import { Component } from '@angular/core';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent {
  selectedRequestId: number | null = null;

  onRequestSelected(requestId: number) {
    this.selectedRequestId = requestId;
    console.log(this.selectedRequestId)
  }
}
