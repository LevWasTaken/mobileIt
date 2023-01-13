<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>Prenez une photo</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-buttons>
        <ion-button color="primary" expand="block" fill="outline" shape="round" size="large" @click="takePicture()">
          <ion-icon slot="start" name="camera"></ion-icon>
          Prenez une photo
        </ion-button>

      </ion-buttons>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";

const takePicture = () => {
  console.log("takePicture");
};
</script>
