import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
import { connect } from 'rxjs';
import { CategoryService } from '../../../services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  standalone: false,
  templateUrl: './update-quiz.component.html',
  styleUrl: './update-quiz.component.css',
})
export class UpdateQuizComponent implements OnInit {
  categories: any;
  constructor(
    private route: ActivatedRoute,
    private _service: QuizService,
    private _cat: CategoryService
  ) {}
  qId = 0;
  quiz: any;

  ngOnInit(): void {
    this.qId = this.route.snapshot.params['qId'];
    //alert(this.qId);
    this._service.getQuiz(this.qId).subscribe(
      (data) => {
        this.quiz = data;
        console.log(this.quiz);
      },
      (error) => {
        console.log(error);
      }
    );

    this._cat.categories().subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //update form submit

  public updateQuiz() {
    this._service.updateQuiz(this.quiz).subscribe(
      (data) => {
        Swal.fire('Success !!', 'Quiz Updated', 'success');
      },
      (error) => {
        Swal.fire('Error !!', 'Error in updating Quiz', 'error');
      }
    );
  }
}
