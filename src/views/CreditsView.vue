<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Credits</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="credits">
        <div class="credits-wrapper">
          <h1>Frontend</h1>

          <div class="credits-information frontend">
            <div class="title">
              <h2>Zoe Günther</h2>
              <span>UI / UX</span>
            </div>
            <hr>
            <div class="title">
              <h2>Alexander Widera</h2>
              <span>Data Integration</span>
            </div>
          </div>
        </div>
        <div class="credits-wrapper">
          <h1>Backend</h1>

          <div class="credits-information backend">
            <div class="title">
              <h2>Fabian Waltermann</h2>
              <span>API</span>
            </div>
          </div>
        </div>
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

<style lang="scss" scoped>
ion-content {
  --overflow: hidden;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
}

.credits {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  flex-direction: column;
}

.credits-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80%;
  margin-bottom: 1em;
}

.credits-wrapper h1 {
  font-family: 'Quicksand', sans-serif;
  align-self: flex-start;
  margin-left: .2em;
}

.credits-information {
  width: 100%;
  border-radius: 1em;
  padding-inline: 1em;
  box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.2);
  color: rgb(0, 0, 0);
  margin-bottom: 1em;
}

.frontend {
  background: linear-gradient(140deg, #655DBB 0%, #8E8DBE 100%);
}

.backend {
  background: linear-gradient(140deg, #BFACE2 0%, #655DBB 100%);
}

.credits-information .title {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 1em;
  font-family: 'Quicksand', sans-serif;
  font-size: 1.5rem;
}

.credits-information .title h2 {
  margin-bottom: 0;
}

.credits-information .title span {
  font-size: 1rem;
}

hr {
  border: 0;
  height: 1px;
  background: white;
}
</style>