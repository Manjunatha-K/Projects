import { V } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  standalone: false,
  templateUrl: './view-categories.component.html',
  styleUrl: './view-categories.component.css',
})
export class ViewCategoriesComponent implements OnInit {
  categories :any ={
    cId:"",
    title: "",
    description:"",
  };

  constructor(private _category: CategoryService) {}

  ngOnInit(): void {
    this._category.categories().subscribe(
      (data: any) => {
        this.categories = data;
        console.log(data);
      },
      (error: any) => {
        console.log(error);
        Swal.fire('Error !!', 'error in loading data', 'error');
      }
    );
  }
}
