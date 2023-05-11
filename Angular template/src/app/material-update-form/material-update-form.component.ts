import { Component, Input, OnInit } from '@angular/core';
import { Material } from 'app/Material';
import { MaterialService } from 'app/material.service';

@Component({
  selector: 'app-material-update-form',
  templateUrl: './material-update-form.component.html',
  styleUrls: ['./material-update-form.component.scss']
})
export class MaterialUpdateFormComponent implements OnInit {

  @Input() materialId: number | undefined;
  material: Material | undefined;
  q
  status: boolean | undefined;
  constructor(private svc: MaterialService ) { }
  
  ngOnInit(): void {
    if (this.materialId != undefined) {
      this.svc.getById(this.materialId).subscribe((response) => {
        console.log(response);
      })
    }
  }

    getValue(qunatity: number) {
    this.svc.getById(qunatity).subscribe((response) => {
      this.material = response;
      console.log(this.material);
    })
  }

}
