import { LocationStrategy } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question } from '../../../services/question';
import Swal from 'sweetalert2';
import { concat } from 'rxjs';

@Component({
  selector: 'app-start',
  standalone: false,
  templateUrl: './start.component.html',
  styleUrl: './start.component.css',
})
export class StartComponent implements OnInit {
  qid: any;
  questions: any;

  marksGot: any = 0;
  correctAnswers = 0;
  attempted = 0;

  constructor(
    private locationSt: LocationStrategy,
    private route: ActivatedRoute,
    private questionService: Question,
    private cdr: ChangeDetectorRef
  ) {}

  preventBackButton() {
    history.pushState(null, '', location.href);
    this.locationSt.onPopState(() => {
      history.pushState(null, '', location.href);
    });
  }

  ngOnInit(): void {
    this.preventBackButton();
    this.qid = this.route.snapshot.params['qId'];
    console.log(this.qid);
    this.loadQuestions();
    this.cdr.detectChanges();
  }

  loadQuestions() {
    this.questionService.getQuestionsOfQuizForTest(this.qid).subscribe(
      (data) => {
        this.questions = data;
        this.cdr.detectChanges();
        this.questions.forEach((q: any) => {
          q['givenAnswer'] = '';
        });
        console.log(data);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error in loading questions', 'error');
      }
    );
  }

  submitQuiz(){
    Swal.fire({
      title: 'Do you want to submit the quiz ?',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      denyButtonText: "Don't Save",
      icon: 'info',
    }).then((e)=>{
      if(e.isConfirmed){
        //calculation
      this.questions.forEach((q:any)=>{
        if(q.givenAnswer == q.answer){
          this.correctAnswers++;
        let marksSingle =   this.questions[0].quiz.maxMarks/this.questions.length;
        this.marksGot+=marksSingle;
        }
        console.log("CORRECT ANSWERS :"+this.correctAnswers);
         console.log("MARKS GOT :"+this.marksGot);
      })
      }
    })
  }
}
