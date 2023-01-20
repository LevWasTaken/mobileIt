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
    </ion-content>

</template>

<script>
import { defineComponent } from 'vue';
import { 
    IonHeader, IonToolbar, IonTitle, IonContent, IonFab, 
    IonFabButton, IonCardContent, IonIcon, IonCard 
} from '@ionic/vue';
import { photoHandler } from '@/composables/photoHandler';
import { camera } from 'ionicons/icons';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: 'HomePage',
    components: {
        IonHeader, 
        IonToolbar, 
        IonTitle,
        IonContent,
        IonFab, 
        IonFabButton, 
        IonIcon,
        IonCard,
        IonCardContent
    },
    methods: {
        async takePhotoProcess() {
            const photo = await this.takePhoto();
            console.log(photo);
            this.router.push({name: 'PuzzlePage', params: { photo: photo }})
        }
    },
    setup() {
        const {takePhoto} = photoHandler();
        const router = useRouter();
        return { router, takePhoto, camera };
    },
});
</script>

<style>
    ion-title {
        text-align: center;
    }
    ion-fab {
        padding-bottom: 5rem;
    }
    ion-card {
        margin-top: 10rem;
        text-align: center;
    }
</style>