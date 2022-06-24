import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-json-modeler',
  template: `
    <div class="wrapper" [style]="'margin-left: ' + level * 10  +'px '">
      <div *ngIf="getType(input) == 'array'" style="border: 1px solid purple">
        {{level}}: <span style="font-weight: bold;">{{key}}</span> <span *ngIf="key">:</span> Array
        <app-json-modeler *ngFor="let el of input" [input]="el" [level]="level+1"></app-json-modeler>
      </div>
      <div *ngIf="getType(input) == 'object'" style="border: 1px solid red">
        {{level}}: <span style="font-weight: bold;">{{key}}</span>
        <app-json-modeler *ngFor="let el of input | keyvalue" [key]="el.key" [input]="el.value" [level]="level+1"></app-json-modeler>
      </div>
      <!--END -->
      <div *ngIf="getType(input) == 'string'" style="border: 1px solid blue; width: 20em">
        {{level}}: <span style="font-weight: bold;">{{key}}</span> <span *ngIf="key">:</span> {{input}} (string)
      </div>
      <div *ngIf="getType(input) == 'number'" style="border: 1px solid green; width: 20em">
        {{level}}: <span style="font-weight: bold;">{{key}}</span> <span *ngIf="key">:</span> {{input}} (number)
      </div>
      <div *ngIf="getType(input) == 'boolean'" style="border: 1px solid pink; width: 20em">
        {{level}}: <span style="font-weight: bold;">{{key}}</span> <span *ngIf="key">:</span> {{input}} (boolean)
      </div>
      <!--BREAK?-->
      <div *ngIf="getType(input) == 'other'" style="border: 1px solid red">
        {{level}}: <span style="font-weight: bold;">{{key}}</span>
        <app-json-modeler *ngFor="let el of input | keyvalue" [key]="el.key" [input]="el.value" [level]="level+1"></app-json-modeler>
      </div>
    </div>
  `,
  styleUrls: ['./json-modeler.component.scss']
})
export class JsonModelerComponent implements OnInit {
  @Input() input: any;
  @Input() level!: number;
  @Input() key!: any;

  constructor() { }

  ngOnInit(): void { }
  
  getType(p: any) {
    if (Array.isArray(p)) return 'array';
    else if (typeof p == 'string') return 'string';
    else if (p != null && typeof p == 'object') return 'object';
    else if (typeof p == 'number') return 'number';
    else if (typeof p == 'boolean') return 'boolean';
    else return 'other';
  }

}
