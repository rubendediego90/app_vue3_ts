<script setup lang="ts">
import BaseButton from '@/components/BaseComponents/BaseButton.vue'
import BaseInput from '@/components/BaseComponents/BaseInput.vue'
import Modal from '@/components/Common/Modal.vue'
import Mapa from '@/components//Mapa/Mapa.vue'
import { ref,Ref } from 'vue';


const texto:Ref<string> = ref('')

const windowSettings = {
    title:'Ejemplo',
    width:400,
    top:150,
    left:150,
    zIndex:0
}

const windowSettings2 = {
    title:'Ejemplo222',
    width:300,
    top:350,
    left:450,
    zIndex:0
}

const modalMapActive:Ref<boolean> = ref(false);
const modalExampleActive:Ref<boolean> = ref(false);

</script>

<template>
<div class="body">
  <BaseButton text="hola"/>
  <BaseInput v-model="texto" :max="10"/>
  <Modal :modalActive="modalMapActive" :windowSettings="windowSettings" @close="modalMapActive = false">
    <div class="modal-content">
      <Mapa/>
    </div>
  </Modal>
  <Modal :modalActive="modalExampleActive" :windowSettings="windowSettings2" @close="modalExampleActive = false">
    <div class="modal-content">
      <h1>This is a Header</h1>
      <p>Parrafo modal</p>
    </div>
  </Modal>
  <button @click="modalMapActive=true">Open Map</button>
  <button @click="modalExampleActive=true">Open ejemplo</button>

</div>
</template>

<style scoped lang="scss">
//$font-stack: times;
//$primary-color: red;

.body {
 // font: 100% $font-stack;
  //color: $primary-color;
  background-color: rgba(83, 209, 121, 0.5);
  height: 100vh;
  display:flex;
  justify-content: center;
  align-items: center;
}

.modal-content{
  display: flex;
  flex-direction: column;
}
</style>
