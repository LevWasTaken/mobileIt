<template>
    <ion-header>
        <ion-toolbar>
            <ion-title>
                Welcome !
            </ion-title>
        </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
        <ion-card>
            <ion-card-content>
                Take a picture to start the puzzle
            </ion-card-content>
        </ion-card>
        <ion-fab vertical="bottom" horizontal="center" slot="fixed">
            <ion-fab-button @click="takePhotoProcess">
            <ion-icon :icon="camera"></ion-icon>
            </ion-fab-button>
        </ion-fab>
        <PuzzlePage v-if="photo" :photo="photo" />
    </ion-content>

</template>



<script setup lang="ts">
import { 
    IonHeader, IonToolbar, IonTitle, IonContent, IonFab, 
    IonFabButton, IonCardContent, IonIcon, IonCard 
} from '@ionic/vue';
import { photoHandler } from '@/composables/photoHandler';
import { camera } from 'ionicons/icons';
import PuzzlePage from '@/views/PuzzlePage.vue';
import { ref } from 'vue';

const {takePhoto} = photoHandler();

const photo = ref();

const takePhotoProcess = async () => {
    photo.value = await takePhoto();
    }


</script>