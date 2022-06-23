import { Component, Input, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { RandomService } from 'src/services/random.service';

@Component({
  selector: 'app-add-settlement',
  template: `
    <p>Add Settlement</p>
    <form [formGroup]="addSettlementForm">
      <mat-form-field>
        <mat-label>Name</mat-label>
        <input matInput formControlName="Name">
        <mat-icon class="random-icon" (click)="fillWithRandomName()">casino</mat-icon>
      </mat-form-field>
      <mat-form-field>
        <mat-label>Description</mat-label>
        <textarea matInput formControlName="Description">
        </textarea>
      </mat-form-field>
    </form>
    <div>
      <button (click)="close()">Submit</button>
    </div>
  `,
  styleUrls: ['./add-settlement.component.scss']
})
export class AddSettlementComponent implements AfterViewInit {

  @Input() input: any;

  addSettlementForm!: FormGroup;

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<any>, public randomService: RandomService) { 
    this.addSettlementForm = this.fb.group({
      'Name': ['', [
        Validators.required,
        Validators.minLength(4),
      ]],
      'Description': ['',  [
        Validators.required,
        Validators.minLength(4),
      ]],
    });
  }

  ngAfterViewInit(): void {
    console.log(this.input)
  }

  close() {
    if (this.addSettlementForm.valid) {
      this.dialogRef.close(this.addSettlementForm.value)
    }
  }

  fillWithRandomName() {
    this.randomService.getRandomWord().subscribe((res:any)=>{
      this.addSettlementForm.setValue({Name: res, Description: ''},);
    })
  }

}
