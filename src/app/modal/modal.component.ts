import { AfterViewInit, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-modal',
  template: `
  <app-confirm *ngIf="input.view == 'delete-settlement'" [input]="input.input"></app-confirm>
  <app-add-settlement *ngIf="input.view == 'add-settlement'" [input]="input.input"></app-add-settlement>
  <div *ngIf="input.view == 'edit-settlement'">Edit!</div>
  `,
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements AfterViewInit {

  constructor(@Inject(MAT_DIALOG_DATA) public input: any) {}

  ngAfterViewInit(): void { }
}
