import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-quiz',
  standalone: false,
  templateUrl: './add-quiz.component.html',
  styleUrl: './add-quiz.component.css',
})
export class AddQuizComponent implements OnInit {
  categories = [
    {
      cId: 23,
      title: 'programming',
    },
  ];
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
