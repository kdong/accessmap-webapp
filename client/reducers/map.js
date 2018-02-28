import { combineReducers } from 'redux';

import {
  MAP_CLICK,
  CLEAR_SELECTED_FEATURES,
  MAP_CONTEXT_CLICK,
  CANCEL_CONTEXT,
  SET_ORIGIN,
  SET_DESTINATION,
  SET_ORIGIN_DESTINATION,
} from 'actions';

import { defaultMap } from './defaults';

const handleSelectedFeature = (state = defaultMap.selectedFeature, action) => {
  switch (action.type) {
    case MAP_CLICK: {
      const feature = action.payload[0];
      switch (feature && feature.layer['source-layer']) {
        case 'sidewalks':
          return {
            layer: 'sidewalk',
            layerName: 'Sidewalk',
            properties: {
              incline: {
                name: 'Incline',
                value: `${(Math.abs(feature.properties.incline) / 10).toFixed(1)} %`,
              },
            },
          };
        case 'crossings':
          return {
            layer: 'crossing',
            layerName: 'Street Crossing',
            properties: {
              curbramps: {
                name: 'Curb Ramps',
                value: feature.properties.curbramps ? 'Yes' : 'No',
              },
              marked: {
                name: 'Marked Crossing',
                value: feature.properties.marked ? 'Yes' : 'No',
              },
            },
          };
        default:
          return null;
      }
    }
    case CLEAR_SELECTED_FEATURES: {
      return null;
    }
    default:
      return state;
  }
};

const handleMapContextClick = (state = defaultMap.contextClick, action) => {
  switch (action.type) {
    case MAP_CONTEXT_CLICK:
      return {
        lng: action.payload.lng,
        lat: action.payload.lat,
      };
    case CANCEL_CONTEXT:
    case SET_ORIGIN:
    case SET_DESTINATION:
    case SET_ORIGIN_DESTINATION:
      return null;
    default:
      return state;
  }
};

export default combineReducers({
  selectedFeature: handleSelectedFeature,
  contextClick: handleMapContextClick,
});
