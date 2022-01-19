<script setup lang="ts">
import { useStore } from "vuex"
import { StateInterface } from "@/store/index";
import { computed, onMounted,ComputedRef,ref} from "vue";
import Mapboxgl from 'mapbox-gl'; //npm i --save-dev @types/mapbox-gl para instalarlo en typescript
 
if(!navigator.geolocation){
    throw new Error('El navegador no soporta la geolocalizacion')
}

Mapboxgl.accessToken = 'pk.eyJ1IjoicnViZW5kZWRpZWdvOTAiLCJhIjoiY2t5anF6M2ltMHYxdDJ2cW9lNHZmc3JteiJ9.-WS08Ja1iIvjKvBNRX_X9w';

const store = useStore<StateInterface>();
const mapElement = ref<HTMLDivElement>();

const initMap = async () =>{

    if(!mapElement.value) return
    if(!userLocation.value)return

    const map = new Mapboxgl.Map({
        container: mapElement.value, // container ID
        style: 'mapbox://styles/mapbox/streets-v11', // style URL
        center: userLocation.value, // starting position [lng, lat]
        zoom: 15 // starting zoom
    });

    const myLocationPopup = new Mapboxgl.Popup()
        .setLngLat(userLocation.value)
        .setText("Posición de Usuario:"+userLocation.value)

    const myLocationMarker = new Mapboxgl.Marker()
        .setLngLat(userLocation.value)
        .setPopup(myLocationPopup)
        .addTo(map)
}

//const isLoading:ComputedRef<boolean> = computed(()=>store.state.places.isLoading)
const userLocation:ComputedRef<[number,number] | undefined> = computed(()=> store.state.places.userLocation)
const isUserLocationReady:ComputedRef<boolean> = computed(()=>store.getters['places/isUserLocationReady'])

onMounted(async()=>{
    if(!store.getters['places/isUserLocationReady']){
        store.dispatch('places/getInitialLocation')
    }

   setTimeout(() => {
      initMap();
    }, 2000);
})


</script>

<template>
    <div v-if="!isUserLocationReady" class="loading-map">
        <h3>Espere por favor</h3>
        <p>Localizando...🌍</p>
    </div>

    <div v-else ref="mapElement" style="height:400px">
    </div>
</template>

<style scoped lang="scss">
.loading-map{
    width:100%;
    height:90%;
}
</style>