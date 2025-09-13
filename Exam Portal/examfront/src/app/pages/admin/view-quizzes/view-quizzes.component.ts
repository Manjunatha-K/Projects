import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../../services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  standalone: false,
  templateUrl: './view-quizzes.component.html',
  styleUrl: './view-quizzes.component.css',
})
export class ViewQuizzesComponent implements OnInit {
  constructor(private _quiz : QuizService) {}
  quizzes:any = [
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
this._quiz.quizzes().subscribe((data:any)=>{
this.quizzes = data;
console.log(this.quizzes);
},
(error)=>{
Swal.fire("Error !!","Error in Loading Data",'error');
}
)
  }
}
