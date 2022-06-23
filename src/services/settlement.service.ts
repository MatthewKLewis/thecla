import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

export interface MapRenderBounds {
  north: number,
  south: number,
  east: number,
  west: number,
  resolution: number,
  regionID: number,
}

export interface Settlement {
  name: string,
  regionID: number,
  description: string,
  x: number,
  y: number,
  
  displayAtResolution?: number,
  userID?: number
}

@Injectable({
  providedIn: 'root'
})
export class SettlementService {

  mapRenderBounds: MapRenderBounds = {
    north: 0,
    south: 0,
    east: 0,
    west: 0,
    resolution: 0,
    regionID: 0,
  }

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

  addSettlement(settlement: Settlement) {
    this.http.post('http://localhost:8080/api/settlements/add', settlement).subscribe((res:any)=>{
      this.getSettlementsToRender();
    });
  }

  getAllSettlements() {
    this.http.post('http://localhost:8080/api/settlements/all', this.page).subscribe((res:any)=>{
      this.page.length = res.output.length;
      this.settlement$.next(res.recordset)
    });
  }

  getSettlementsToRender() {
    return this.http.post('http://localhost:8080/api/settlements/renderable', this.mapRenderBounds).subscribe((res:any)=>{
      this.renderableSettlements$.next(res.recordset)
    });
  }

}
