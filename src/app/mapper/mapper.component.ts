import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mapper',
  templateUrl: './mapper.component.html',
  styleUrls: ['./mapper.component.css']
})
export class MapperComponent implements OnInit {

  public static endPointURL="http://localhost:5000";

  constructor() { }

  ngOnInit() {
  }

}
