import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuizService } from '../../../services/quiz.service';

@Component({
  selector: 'app-add-quiz',
  standalone: false,
  templateUrl: './add-quiz.component.html',
  styleUrl: './add-quiz.component.css',
})
export class AddQuizComponent implements OnInit {
  categories: any = [];

  quizData = {
    title: '',
    description: '',
    maxMarks: '',
    noOfQuestions: '',
    active: true,
    category: {
      cId: '',
    },
  };

  constructor(
    private _cat: CategoryService,
    private _snack: MatSnackBar,
    private _quizService: QuizService
  ) {}

  ngOnInit(): void {
    this._cat.categories().subscribe(
      (data: any) => {
        this.categories = data;
        console.log(data);
      },
      (error) => {
        Swal.fire('Error !!', 'Error in loading data.', 'error');
      }
    );
  }

  addQuiz() {
    console.log(this.quizData);
    if (this.quizData.title.trim() == '' || this.quizData.title == null) {
      this._snack.open('Title Required !!', '', {
        duration: 300,
      });
      return;
    }

    //call server
    this._quizService.addQuiz(this.quizData).subscribe(
      (data: any) => {
        Swal.fire("Success !!",
          "Data has been added.",'success'
        );
      },
      (error) => {
        Swal.fire("Error !!","Error while adding Quiz",'error');
      }
    );
  }
}
