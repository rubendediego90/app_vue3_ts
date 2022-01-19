import { GetterTree } from 'vuex';
import state, { PlacesState } from './state';
import { StateInterface } from '../index';


const getters: GetterTree<PlacesState, StateInterface> = {
    isUserLocationReady( state ) {
        return !!state.userLocation;//con una ! de undefined es true, con !! hasta que no este cargado no será true
    }
}

export default getters;