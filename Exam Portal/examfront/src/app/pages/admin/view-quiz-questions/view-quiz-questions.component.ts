import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question } from '../../../services/question';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  constructor(
    private _route: ActivatedRoute,
    private _question: Question,
    private cdr: ChangeDetectorRef,
    private _snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qId'];
    this.qTitle = this._route.snapshot.params['title'];
    this._question.getQuestionsOfQuiz(this.qId).subscribe(
      (data) => {
        console.log(data);
        this.questions = data;
        this.cdr.detectChanges();
      },
      (error) => {
        Swal.fire('Error !!', 'Error adding questions', 'error');
      }
    );
    console.log(this.qId);
    console.log(this.qTitle);
  }

  deleteQuestion(questionId: any) {
    Swal.fire({
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      title: 'Are you sure, you want to delete this question ?',
    }).then((result) => {
      if (result.isConfirmed) {
        this._question.deleteQuestion(questionId).subscribe((data) => {
          this._snack.open('Question deleted successfully','',{
            duration:3000,
          });
          this.questions = this.questions.filter((q:any)=>q.quesId !=this.qId)
        },(error)=>{
          this._snack.open('Error in deleting question','',{
            duration:3000,
          });
          console.log(error);
        }
      );
      }
    });
  }
}
