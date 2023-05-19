import { Component, Input, OnInit } from '@angular/core';
import { MaterialService } from '../material.service';
import { Material } from '../Material';

@Component({
  selector: 'app-search-material',
  templateUrl: './search-material.component.html',
  styleUrls: ['./search-material.component.scss']
})
export class SearchMaterialComponent implements OnInit {

  @Input() materialId: number | undefined;
  material: Material | undefined;

  constructor(private svc: MaterialService ) { }
  
  ngOnInit(): void {
    if (this.materialId != undefined) {
      this.svc.getById(this.materialId).subscribe((response) => {
        console.log(response);
      })
    }
  }

  getMaterialById(id: any) {
    this.svc.getById(id).subscribe((response) => {
      this.material = response;
      console.log(this.material);
    })
  }
}
