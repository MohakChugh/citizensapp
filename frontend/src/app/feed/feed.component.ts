import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from '../../../node_modules/axios';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  res: any;
  fullname = 'Mohak Chugh';
  posts = [];

  constructor(private router: Router) {
    this.fetchProblems();
  }

  private fetchProblems() {
    axios.get('https://citizensapp-backend.herokuapp.com/getProblem')
      .then(response => {
        this.res = response;
        this.posts = this.res.data.response.problems;
        this.posts = this.posts.reverse();
      });
  }

  ngOnInit(): void {
    setInterval(() => {
      this.fetchProblems();
    }, 1000);
  }

  upvoteProblem(problemId) {
    axios.post('https://citizensapp-backend.herokuapp.com/upvoteProblem', { problemid: problemId })
      .then(response => {
        this.res = response;
        this.fetchProblems();
      })
      .catch(error => {
        alert(error);
      });
  }

  downvoteProblem(problemID) {
    axios.post('https://citizensapp-backend.herokuapp.com/downvoteProblem', { problemid: problemID })
      .then(response => {
        this.res = response;
        this.fetchProblems();
      })
      .catch(error => console.log(error));
  }

}
