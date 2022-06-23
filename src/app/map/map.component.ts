import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  maps: any[] = ['1','1','1','1','1'];

  constructor() { }

  ngOnInit(): void {
  }

}
