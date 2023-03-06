<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Credits</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="example-content">
        <h1>Frontend:</h1>
        <p>UI / UX: Zoe Günther (30161313)</p>
        <p>Data integration: Alexander Widera (30163164)</p>
        <h1>Backend:</h1>
        <p>API: Fabian Waltermann (30168226)</p>
      </div>
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
  flex-direction: column;
}
</style>