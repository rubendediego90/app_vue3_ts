import { createStore } from 'vuex';

//import exampleModule from './module-template';
import placesModule from './places/index';
import { PlacesState } from './places/state';

import mapModule from './map/index';
import { MapState } from './map/state';

export interface StateInterface {
  places: PlacesState,
  map: MapState
}

export default createStore<StateInterface>({
  modules: {
    places: placesModule,
    map:mapModule
  }
})
