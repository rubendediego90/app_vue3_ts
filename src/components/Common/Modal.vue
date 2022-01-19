<script setup lang="ts">
import { defineProps,PropType,defineEmits,ref,Ref } from 'vue';
import {WindowSettings} from './WindowSettings'

const props= defineProps({
  modalActive: {
    type: Boolean as PropType<boolean>,
    required:true
  },
  windowSettings:{
      type: Object as PropType<WindowSettings>,
      required:true
  }

})

const emit = defineEmits(['close'])

let isMouseDown = false
let diffX=0,
diffY=0

const zIndex:Ref<number>=ref(props.windowSettings.zIndex)

const positionTop:Ref<number>=ref(props.windowSettings.top)
const positionLeft:Ref<number>=ref(props.windowSettings.left)


const close = ()=>{
    emit('close')
}

const handleMouseDown = (event:MouseEvent) =>{
    isMouseDown=true
    zIndex.value ++
    diffX = event.clientX - positionLeft.value
    diffY = event.clientY - positionTop.value
}

const handleMouseUp = () =>{
    isMouseDown=false
    zIndex.value --
}

const onMouseMove = (event:MouseEvent)=>{
    if(!isMouseDown) return
    positionLeft.value = event.clientX - diffX
    positionTop.value = event.clientY - diffY
}

document.addEventListener('mousemove',onMouseMove)
</script>

<template>
    <transition name="modal-animation">
        <div class="window-modal">
            <div v-show="modalActive" class="modal"  
            :style="{
                top:positionTop+'px',
                left:positionLeft+'px',
                width:props.windowSettings.width+'px',
                zIndex:zIndex
            }">
                <div class="modal-window-header" @mousedown="handleMouseDown" @mouseup="handleMouseUp">
                    <div class="window-title">{{props.windowSettings.title}}</div>
                    <div class="window-buttons-group">
                        <i class="window-buttons" @click="close">_</i>
                        <i class="window-buttons" @click="close">x</i>
                    </div>
                </div>
                <slot/>
            </div>
        </div>
    </transition>
</template>

<style scoped lang="scss" >

.window-modal{
    .modal{
        position:absolute;
        background-color:white;
        border-radius: 12px ;
        border:solid 2px grey;
        box-shadow: 4px -3px 0px 0px grey;

        .modal-window-header{
            border-bottom: 2px solid grey;
            display: flex;
            justify-content: space-between;
            gap: 100px;
            .window-title{
                margin-left:10px;
            }
            .window-buttons-group{
                margin-right:10px;
                font-weight: bold;
                width:30px;
                display: flex;
                justify-content: space-between;
                .window-buttons{
                    user-select: none;
                    cursor: pointer;
                }
            }
            &:hover {
                cursor: grab;
            }
            &:active{
                cursor:grabbing;
            }
        }
    }
}

</style>