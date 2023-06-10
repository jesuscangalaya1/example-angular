import {Component, OnInit} from '@angular/core';
import {Producto} from "../../../models/producto";
import {ActivatedRoute, Router} from "@angular/router";
import {PruebaCategoryService} from "../../../services/prueba-category.service";
import {CategoryDTO} from "../../../models/category-dto";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  category: CategoryDTO = { name: '' };

  constructor(private service: PruebaCategoryService,
              private activatedRoute: ActivatedRoute,
              private router: Router
  ) {
  }

  ngOnInit() {
/*    const id = this.activatedRoute.snapshot.params['id'];
    this.service.getCategoryById(id).subscribe(
      data => {
        console.log(data);
        this.category = data;
        console.log(this.category);
      },
      err => {
        console.log(err);
        this.volver();
      }
    );*/
    const id = this.activatedRoute.snapshot.params['id'];
    this.service.getCategoryById(id).subscribe(
      data => {
        console.log(data);
        this.category.name = data.name;
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
