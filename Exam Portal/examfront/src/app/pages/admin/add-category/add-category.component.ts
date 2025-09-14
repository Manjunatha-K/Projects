import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../../services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  standalone: false,
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css',
})
export class AddCategoryComponent implements OnInit {
  category = {
    title: '',
    description: '',
  };

  constructor(
    private _category: CategoryService,
    private _snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  formSubmit() {
    if (this.category.title.trim() == '' || this.category.title == null) {
      this._snack.open('Title Required !!', '', {
        duration: 3000,
      });
      return;
    }
    //all done
    this._category.addCategory(this.category).subscribe(
      (data) => {
        this.category.title = '';
        this.category.description = '';
        Swal.fire('Success !!', 'Category Added Successfully', 'success');
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Please fill the required Details', 'error');
      }
    );
  }
}
