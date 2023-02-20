<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Vokabel Stapel</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-slides>
        <ion-slide>
          <div class="vocabulary-stack">Test</div>
        </ion-slide>
        <ion-slide>
          <div class="vocabulary-stack">Test2</div>
        </ion-slide>
        <ion-slide>
          <div class="vocabulary-stack">Test3</div>
        </ion-slide>
      </ion-slides>
      <ion-button><ion-icon :icon="addCircle"></ion-icon></ion-button>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage } from '@ionic/vue';
import { defineComponent, ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { addCircle } from 'ionicons/icons';

export default {
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage },
  data() {
    return {
      addCircle
    };
  },
};
</script>

<style lang="scss">
.vocabulary-stack {
  background: var(--color-orange);
  height: 90%;
  width: 90%;
  border-radius: 2em;
}

ion-button {
  font-size: 2.5em;
  height: 50px;
  width: 50px;
  color: var(--color-primary);
  position: absolute;
  bottom: 0.5em;
  right: 0.5em;
  z-index: 10;
  --background: none;
  --padding-start: 0;
  --padding-end: 0;
  --background-activated: none;
  --background-hover: none;
  --box-shadow: none;
  --ripple-color: transparent;
}

.ion-activated,
ion-button:focus {
  color: var(--color-success);
}

ion-slides {
  text-align: center;
  height: 30em;
  top: 50%;
  translate: 0 -50%;
}

ion-slide {
  height: 100% !important;
}
</style>