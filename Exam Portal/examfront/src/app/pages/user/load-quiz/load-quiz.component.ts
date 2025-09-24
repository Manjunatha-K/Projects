import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';

@Component({
  selector: 'app-load-quiz',
  standalone: false,
  templateUrl: './load-quiz.component.html',
  styleUrl: './load-quiz.component.css',
})
export class LoadQuizComponent implements OnInit {
  catId: any;
  quizzes: any;
  constructor(
    private _route: ActivatedRoute,
    private quizService: QuizService
  ) {}

  ngOnInit(): void {
    this.catId = this._route.snapshot.params['catId'];
    console.log(this.catId);
    if (this.catId == 0) {
      console.log('Load all quizzes');
      this.quizService.quizzes().subscribe(
        (data: any) => {
          this.quizzes = data;
          console.log(this.quizzes);
        },
        (error) => {
          console.log(error);
          alert('error in loading all quizzes');
        }
      );
    } else {
      console.log('Load specific quizzes');
    }
  }
}
