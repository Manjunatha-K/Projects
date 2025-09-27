import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  standalone: false,
  templateUrl: './instructions.component.html',
  styleUrl: './instructions.component.css',
})
export class InstructionsComponent implements OnInit {
  qid: any;
  quiz: any;
  constructor(
    private _route: ActivatedRoute,
    private quizService: QuizService,
    private cdr: ChangeDetectorRef,
    private _router: Router
  ) {}

  startQuiz() {
    Swal.fire({
      title: 'Do you want to start the quiz ?',
      showCancelButton: true,
      confirmButtonText: 'Start',
      denyButtonText: "Don't Start",
      icon: 'info',
    }).then((result) => {
      if (result.isConfirmed) {
        this._router.navigate(['/start/' + this.qid]);
        //Swal.fire('Saved','','success');
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'error');
      }
    });
  }

  ngOnInit(): void {
    this.qid = this._route.snapshot.params['qId'];
    //console.log(this.qid);
    this.quizService.getQuiz(this.qid).subscribe(
      (data: any) => {
        this.quiz = data;
        this.cdr.detectChanges();
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
