import { AfterViewInit, Component, ViewChild } from '@angular/core';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import { defaults } from 'ol/interaction';
import { Map as OlMap } from 'ol/';
import { MousePosition } from 'ol/control';
import { defaults as defaultControls } from 'ol/control';
import { Zoomify } from 'ol/source';
import { createStringXY } from 'ol/coordinate';
import { MapRenderBounds, SettlementService } from 'src/services/settlement.service';
import VectorLayer from 'ol/layer/Vector';
import { MapStyleService } from 'src/services/map-style.service';
import VectorSource from 'ol/source/Vector';

const imgWidth = 8000;
const imgHeight = 8000;
const FRAME_BUFFER = 20;

@Component({
  selector: 'app-map-canvas',
  templateUrl: './map-canvas.component.html',
  styleUrls: ['./map-canvas.component.scss']
})
export class MapCanvasComponent implements AfterViewInit {

  @ViewChild('map') mapElement!: any;
  map!: OlMap
  tileLayer!: TileLayer<Zoomify>;
  featureLayer: any;
  isLoading: boolean = true;
  mapRenderBounds!: MapRenderBounds;

  constructor(public settlementService: SettlementService, public mapStyleService: MapStyleService) { }

  ngAfterViewInit(): void {
    this.drawMap();
    this.settlementService.renderableSettlements$.subscribe((settlements: any) => {
      this.redrawFeatures(settlements)
    })
  }

  drawMap() {
    this.isLoading = true;
    const tileSource = new Zoomify({
      url: `../../../assets/map/map/`,
      size: [imgWidth, imgHeight],
    });
    const tileGrid = tileSource.getTileGrid();
    var extent = tileGrid ? tileGrid.getExtent() : undefined;

    this.tileLayer = new TileLayer({ source: tileSource });
    this.featureLayer = new VectorLayer({});

    this.map = new OlMap({
      layers: [this.tileLayer, this.featureLayer],
      target: 'map',
      view: new View({
        extent: extent,
        constrainOnlyCenter: true,
      }),
      interactions: defaults({ doubleClickZoom: false }),
      controls: defaultControls().extend([new MousePosition({ coordinateFormat: createStringXY(1) })]),
    });
    this.map.getView().fit(extent || [0, 0]);

    // CLICK
    this.map.on('click', (event: any) => {
      var feature = this.map.forEachFeatureAtPixel(event.pixel, (feature: any) => {
        return feature;
      });
      if (feature) {
        console.log(feature);
      }
    });

    this.map.on('dblclick', (event: any) => {
      console.log("add settlement here?")
    });

    // MOVE
    this.map.on('moveend', (event: any) => {
      var frameCenter = event.map.values_.view.targetCenter_; //frame center in map pixels
      var rez = event.map.values_.view.targetResolution_; //ratio of map pixels to browser pixels
      var frameWidth = event.target.viewport_.clientWidth; //width of the frame in browser pixels
      var frameHeight = event.target.viewport_.clientHeight; //height of the frame in browser pixels
      var visibleFrame = [frameWidth * rez, frameHeight * rez] //frame X,Y dimensions in map pixels
      var fC: MapRenderBounds = { north: 0, south: 0, east: 0, west: 0, resolution: rez } //NW, NE, SE, SW
      fC.north = frameCenter[1] + (visibleFrame[1] / 2) - FRAME_BUFFER;
      fC.south = frameCenter[1] - (visibleFrame[1] / 2) + FRAME_BUFFER;
      fC.east = frameCenter[0] + (visibleFrame[0] / 2) - FRAME_BUFFER;
      fC.west = frameCenter[0] - (visibleFrame[0] / 2) + FRAME_BUFFER;
      this.mapRenderBounds = fC;
      this.settlementService.getSettlementsToRender(this.mapRenderBounds);
    });

    // DRAG
    this.map.on('pointerdrag', () => { });

    this.isLoading = false;
  }

  redrawFeatures(settlements: any[]) {
    var feats: any[] = []
    settlements.forEach((settlement: any)=>{
      feats.push(this.mapStyleService.createIconFeature(settlement));
    })
    this.featureLayer.setSource(new VectorSource({features: feats}))
  }

}
