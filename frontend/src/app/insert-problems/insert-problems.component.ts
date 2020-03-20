import { Component, OnInit } from '@angular/core';
import axios from '../../../node_modules/axios';

@Component({
  selector: 'app-insert-problems',
  templateUrl: './insert-problems.component.html',
  styleUrls: ['./insert-problems.component.css']
})
export class InsertProblemsComponent implements OnInit {

  areaid: number;
  Department: string;
  Description: string;
  title: string;
  res: any;
  constructor() { }

  ngOnInit(): void {
  }

  uploadProblem() {
    axios.post('https://citizensapp-backend.herokuapp.com/insertProblem', {
      areaid: this.areaid,
      department: this.Department,
      description: this.Description,
      title: this.title,
      userid: 1
    })
      .then(response => {
        this.res = response;
        alert('Problem Inserted');
        console.log(this.res);
      })
      .catch(error => console.log(error));
  }

}
