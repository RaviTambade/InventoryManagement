import { Component } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent {
  showPopup: boolean = false;
  inputValue: string = '';

  openPopup() {
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
  }

  onPopupOk() {
    console.log('User input:', this.inputValue);
    // Do something with the user input (e.g., save to a variable, trigger an action, etc.).
    this.closePopup();
  }

  onPopupCancel() {
    this.closePopup();
  }
}
