import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

export interface MapRenderBounds {
  north: number,
  south: number,
  east: number,
  west: number,
  resolution: number,
}

export interface Settlement {
  ID: number,
  Name: string,
  RegionID: number,
  UserID: number,
  Description: string,
  X: number,
  Y: number,
}

@Injectable({
  providedIn: 'root'
})
export class SettlementService {

  page: any = {
    "searchTerm": '',
    "pageIndex": 0,
    "pageSize": 10,
    "length": 0,
    "sortColumn": 1,
    "isDescending": false
  };

  settlement$: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  renderableSettlements$: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  constructor(private http: HttpClient) { }

  addSettlement(settlement: any) {
    this.http.post('http://localhost:8080/api/settlements/add', settlement).subscribe((res:any)=>{
      this.getAllSettlements();
    });
  }

  getAllSettlements() {
    this.http.post('http://localhost:8080/api/settlements/all', this.page).subscribe((res:any)=>{
      this.page.length = res.output.length;
      this.settlement$.next(res.recordset)
    });
  }

  getSettlementsToRender(bounds: MapRenderBounds) {
    return this.http.post('http://localhost:8080/api/settlements/renderable', bounds).subscribe((res:any)=>{
      this.renderableSettlements$.next(res.recordset)
    });
  }

}
