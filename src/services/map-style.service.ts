import { Injectable } from '@angular/core';
import Icon from 'ol/style/Icon';
import Feature from 'ol/Feature';
import Fill from 'ol/style/Fill';
import Point from 'ol/geom/Point';
import Style from 'ol/style/Style';
import { Text } from 'ol/style';
import Stroke from 'ol/style/Stroke';
import IconAnchorUnits from 'ol/style/IconAnchorUnits';
import { Settlement } from './settlement.service';

@Injectable({
  providedIn: 'root',
})
export class MapStyleService {

  constructor() { }

  createIconFeature(feature: Settlement) {
    var tempFeature = new Feature({
      geometry: new Point([
        feature.X,
        feature.Y,
      ]),
    });
    tempFeature.setStyle(new Style({
      text: new Text({ text: feature.Name }),
      image: new Icon({
        anchor: [0.5, 0.5],
        anchorXUnits: IconAnchorUnits.FRACTION,
        anchorYUnits: IconAnchorUnits.FRACTION,
        src: '../assets/icons/whiteDot.png',
        color: '#fff'
      }),
    }));
    return tempFeature;
  }
}