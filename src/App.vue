<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';

import { defineComponent } from 'vue';
import "reflect-metadata"

export default defineComponent({
  name: 'App',
  components: { IonApp, IonRouterOutlet },
});
</script>


<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@500&display=swap');

:root {
  --font: 'Open Sans', sans-serif;
  --color-btn-primary: green;
  --color-btn-focus: rgb(1, 77, 1);
  --color-btn-delete-focus: red;

  --color-primary: rgb(72, 188, 23);
  --color-primary-selected: rgb(0, 69, 126);
  --color-grey: rgb(44, 44, 44);
  --color-grey-1: rgba(44, 44, 44, .6);
  --color-contrast: white;
  --color-contrast-2: rgb(134, 134, 134);
  --color-1: #d02092;
  --color-2: #2abc27;
  --color-3: #a1a1a1;
  --color-orange: rgb(196, 116, 11);
  --color-orange-1: rgba(196, 116, 11, .7);
  --color-success: #14a512;
  --color-tab-bar-2: rgba(13, 13, 13, 0.9);
  --color-tab-bar-3: rgb(16, 16, 16);

  --clr-toolbar: black;
  --clr-dark: rgb(32, 32, 32);
  --clr-red: red;
  --clr-red-dark: rgb(126, 0, 0);
  --clr-green: green;
  --clr-green-dark: rgb(4, 68, 12);
  --clr-white: white;
}

ion-toolbar>ion-title {
  font-weight: bold;
  color: var(--clr-toolbar);
}

ion-toolbar:last-of-type {
  --border-width: 0 0 0px !important;
}

#app {
  font-family: var(--font) !important;
  text-align: center;
  color: #448cd3;
}

.vocabulary-stack {
  background: var(--clr-dark);
  height: 90%;
  width: 90%;
  border-radius: 1em;
  color: var(--color-contrast);
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  position: relative;
}
</style>