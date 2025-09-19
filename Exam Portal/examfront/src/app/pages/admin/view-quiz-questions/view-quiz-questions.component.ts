import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question } from '../../../services/question';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  standalone: false,
  templateUrl: './view-quiz-questions.component.html',
  styleUrl: './view-quiz-questions.component.css',
})
export class ViewQuizQuestionsComponent implements OnInit {
  qId: any;
  qTitle: any;
  questions: any = null;
  constructor(private _route: ActivatedRoute, private _question: Question) {}

  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qId'];
    this.qTitle = this._route.snapshot.params['title'];
    this._question.getQuestionsOfQuiz(this.qId).subscribe(
      (data) => {
        console.log(data);
        this.questions = data;
      },
      (error) => {
        Swal.fire('Error !!', 'Error adding questions', 'error');
      }
    );
    console.log(this.qId);
    console.log(this.qTitle);
  }
}
