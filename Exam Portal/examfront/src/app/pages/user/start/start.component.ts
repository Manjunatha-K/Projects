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
  isSubmit = false;
  timer: any;

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
        this.timer = 2 * 60 * this.questions.length; // 2 minutes per question
        this.questions.forEach((q: any) => {
          q['givenAnswer'] = '';
        });
        console.log(data);
        this.startTimer();
        this.cdr.detectChanges();
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error in loading questions', 'error');
      }
    );
  }

  submitQuiz() {
    Swal.fire({
      title: 'Do you want to submit the quiz ?',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      denyButtonText: "Don't Save",
      icon: 'info',
    }).then((e) => {
      if (e.isConfirmed) {
        this.evalQuiz();
      }
    });
  }

  startTimer() {
    let t = window.setInterval(() => {
      if (this.timer <= 0) {
        this.evalQuiz();
        clearInterval(t);
      } else {
        this.timer--;
        this.cdr.detectChanges();
      }
    }, 1000);
  }

  getFormattedTime() {
    let mm = Math.floor(this.timer / 60);
    let ss = this.timer - mm * 60;
    return `${mm} min : ${ss} sec`;
    this.cdr.detectChanges();
  }

  evalQuiz(){
    this.isSubmit = true;
        //calculation
        this.questions.forEach((q: any) => {
          if (q.givenAnswer == q.answer) {
            this.correctAnswers++;
            let marksSingle =
              this.questions[0].quiz.maxMarks / this.questions.length;
            this.marksGot += marksSingle;
          }
          if (q.givenAnswer.trim() != '') {
            this.attempted++;
          }
          console.log(this.attempted);
        });
        this.cdr.detectChanges();
  }
}
