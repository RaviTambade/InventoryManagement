import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-radio-search',
  templateUrl: './radio-search.component.html',
  styleUrls: ['./radio-search.component.css']
})
export class RadioSearchComponent {

  form = new FormGroup({
    gender: new FormControl('', Validators.required)
  });
   

  submit(){
    console.log(this.form.value);
  }
}
