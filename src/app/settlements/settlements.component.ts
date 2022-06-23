import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { SettlementService } from 'src/services/settlement.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-settlements',
  templateUrl: './settlements.component.html',
  styleUrls: ['./settlements.component.scss']
})
export class SettlementsComponent implements OnInit {

  displayedColumns: string[] = ['ID', 'Name', 'Description']
  pageEvent!: PageEvent;
  dataSource!: DataSource<any>;

  constructor(public settlementService: SettlementService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.settlementService.getAllSettlements();
    this.settlementService.settlement$.subscribe((data: any) => {
      this.dataSource = data;
    })
  }

  //copy-able to any component that wants to open a dialog
  openDialog(viewString: string, input: any, callBack: Function) {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: { view: viewString, input: input },
      height: '60%',
      width: '60%',
    });
    dialogRef.afterClosed().subscribe((result: any) => { callBack(result) });
  }

  addSettlement() {
    this.openDialog('add-settlement', {}, (res:any)=>{
      res ? this.settlementService.addSettlement(res) : null
    })
  }
  
  editSettlement(row: any) {
    console.log(row);
    this.openDialog('edit-settlement', {}, (res:any)=>{
      console.log(res);
    })
  }
  
  deleteSettlement() {
    this.openDialog('delete-settlement', {}, (res:any)=>{
      //console.log(res);
    })
  }

  changePagination(e: any) {
    this.settlementService.page = e;
    this.settlementService.getAllSettlements();
  }

  refresh() {
    this.settlementService.getAllSettlements();
  }

  searchFilter(e: any) {
    if(e.key == 'Enter') {
      this.settlementService.page.searchTerm = e.originalTarget.value;
      this.settlementService.getAllSettlements();
    }
  }

}
