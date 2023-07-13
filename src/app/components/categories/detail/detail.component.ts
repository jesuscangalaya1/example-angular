import {Component, Inject, OnInit} from '@angular/core';
import {Producto} from "../../../models/producto";
import {ActivatedRoute, Router} from "@angular/router";
import {PruebaCategoryService} from "../../../services/prueba-category.service";
import {CategoryDTO} from "../../../models/category-dto";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  category: CategoryDTO ;

  constructor(private service: PruebaCategoryService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.category = data.category;
  }

  ngOnInit() {
    const id = this.data.id;
    this.service.getCategoryById(id).subscribe(
      data => {
        console.log(data);
        this.category = data;
      },
      err => {
        console.log(err);
        this.volver();
      }
    );
  }


  volver(): void {
    this.router.navigate(['/list']);
  }
}
