import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'about',
  templateUrl: 'about.component.html',
  styleUrls: ['about.scss']
})
export class AboutComponent implements OnInit {
  constructor() { }

  ngOnInit()
  {
    console.log("test");
  }
}
