import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { QuizService } from '../../../services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  standalone: false,
  templateUrl: './view-quizzes.component.html',
  styleUrl: './view-quizzes.component.css',
})
export class ViewQuizzesComponent implements OnInit {
  qId: any;
  constructor(private _quiz: QuizService, private cdr: ChangeDetectorRef) {}
  quizzes: any = [
    // {
    //   qId: 23,
    //   title: 'Basic of Java',
    //   description: 'adsasddasd',
    //   maxMarks: '50',
    //   noOfQuestions: '20',
    //   active: '',
    //   category: {
    //     title: 'programming',
    //   },
    // },
    // {
    //   qId: 24,
    //   title: 'Basic of Python',
    //   description: 'asdasdas',
    //   maxMarks: '50',
    //   noOfQuestions: '20',
    //   active: '',
    //   category: {
    //     title: 'Python Programming',
    //   },
    // },
  ];

  ngOnInit(): void {
    this._quiz.quizzes().subscribe(
      (data: any) => {
        this.quizzes = data;
        console.log(this.quizzes);
        this.cdr.detectChanges();
      },
      (error) => {
        Swal.fire('Error !!', 'Error in Loading Data', 'error');
      }
    );
  }

  deleteQuiz(qId: any) {
    Swal.fire({
      icon: 'info',
      title: 'are you sure ?',
      text: 'Delete',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this._quiz.deleteQuiz(qId).subscribe(
          (data) => {
            this.quizzes = this.quizzes.filter((quiz: any) => quiz.qId != qId);
            Swal.fire('Success !!', 'Quiz Deleted', 'success');
          },
          (error) => {
            Swal.fire('Error', 'Error in Deling Quiz', 'error');
          }
        );
      }
    });
  }
}
