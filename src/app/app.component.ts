import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { MetamaskService } from 'src/app/services/metamask.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'DTToken'

  constructor(
    public router: Router
  ) { }

  ngOnInit() { }

}
