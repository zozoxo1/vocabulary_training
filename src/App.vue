<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';

import { defineComponent } from 'vue';

import Page from './components/Page.vue';

export default defineComponent({
  name: 'App',
  components: { IonApp, IonRouterOutlet },
});
</script>


<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@500&display=swap');

:root {
  --font: 'Open Sans', sans-serif;
  --color-primary: rgb(72, 188, 23);
  --color-primary-selected: rgb(0, 69, 126);
  --color-contrast: white;
  --color-1: #d02092;
  --color-2: #2abc27;
  --color-orange: rgb(196, 116, 11);
  --color-success: #14a512;
  --color-tab-bar: rgba(8, 8, 8, 0.9);
}

#app {
  font-family: var(--font);
  text-align: center;
  color: #448cd3;
}
</style>