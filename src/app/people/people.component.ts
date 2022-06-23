import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {

  json: any = {
    numberObject: {values: [0,0,0,0,], moreValues: [[0,0],0,0,1,2,3]},
    colorObject: {mainColor: 'green'},
    carObject: {car: 'honda', steering: 'wheel', rusty: true},
    
  }

  constructor() { }

  ngOnInit(): void { }

}
