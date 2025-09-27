import { LocationStrategy } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question } from '../../../services/question';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  standalone: false,
  templateUrl: './start.component.html',
  styleUrl: './start.component.css',
})
export class StartComponent implements OnInit {
  qid: any;
  questions:any;
  constructor(
    private locationSt: LocationStrategy,
    private route: ActivatedRoute,
    private questionService: Question,
    private cdr : ChangeDetectorRef
  
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
        console.log(data);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error in loading questions', 'error');
      }
    );
  }
}
