<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Credits</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="example-content">Hier stehen credits</div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage } from '@ionic/vue';

export default {
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage },
};
</script>

<style scoped>
.example-content {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>