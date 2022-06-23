import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';


const CANVAS_PIXEL_WIDTH = 400;
const CANVAS_PIXEL_HEIGHT = 400;
const TILE_PIXEL_WIDTH = 10;
const TILE_PIXEL_HEIGHT = 10;

@Component({
  selector: 'app-caves',
  templateUrl: './caves.component.html',
  styleUrls: ['./caves.component.scss']
})
export class CavesComponent implements AfterViewInit {

  @ViewChild('canvas') canvas: any
  ctx!: CanvasRenderingContext2D

  constructor() { }

  ngAfterViewInit(): void {
    this.canvas.nativeElement.width = 400;
    this.canvas.nativeElement.height = 400;
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.drawNoise()
  }

  drawNoise() {
    this.ctx.fillStyle = 'black';
    for (let i = 0; i < (CANVAS_PIXEL_WIDTH / TILE_PIXEL_WIDTH); i++) {
      for (let j = 0; j < (CANVAS_PIXEL_HEIGHT / TILE_PIXEL_HEIGHT); j++) {
        if (Math.random() > 0.5) {
          this.ctx?.fillRect(i * TILE_PIXEL_WIDTH, j * TILE_PIXEL_HEIGHT, TILE_PIXEL_WIDTH, TILE_PIXEL_HEIGHT)
        }
      }
    }
  }

}
