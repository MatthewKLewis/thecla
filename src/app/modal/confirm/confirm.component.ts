import { AfterViewInit, Component,  Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm',
  template: `
    <div class="wrapper">
      <button (click)="close(true)">Confirm</button>
      <button (click)="close(false)">Close</button>
    </div>
  `,
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements AfterViewInit {

  @Input() public input: any

  constructor(public dialogRef: MatDialogRef<any>) { }

  ngAfterViewInit(): void {
    //console.log(this.input);
  }

  close(confirmed: boolean) {
    this.dialogRef.close(confirmed);
  }

}
