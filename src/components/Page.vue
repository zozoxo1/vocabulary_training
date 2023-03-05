<template>
    <ion-page>
        <ion-tabs>
            <ion-router-outlet></ion-router-outlet>
            <ion-tab-bar bottom>
                <ion-tab-button tab="training" href="/training">
                    <ion-icon :icon="podium" />
                    <ion-label>Training</ion-label>
                </ion-tab-button>

                <ion-tab-button tab="vocabulary" href="/vocabulary">
                    <ion-icon :icon="albums" />
                    <ion-label>Vokabeln</ion-label>
                </ion-tab-button>

                <ion-tab-button tab="credits" href="/credits">
                    <ion-icon :icon="informationCircle" />
                    <ion-label>Credits</ion-label>
                </ion-tab-button>
            </ion-tab-bar>
        </ion-tabs>
    </ion-page>
</template>
  
<script lang="ts">
import { IonPage, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonLabel, IonIcon } from '@ionic/vue';

import { playCircle, radio, library, search, albums, podium, informationCircle } from 'ionicons/icons';

export default {
    components: { IonPage, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonLabel, IonIcon },
    data() {
        return {
            playCircle,
            radio,
            library,
            search,
            albums,
            podium,
            informationCircle
        };
    },
};
</script>
  
<style lang="scss">
ion-tab-bar {
    --border: none;
    border-radius: 1em;
    margin: 1em 0.3em;
    height: 6em;
    background: var(--clr-dark);
}

ion-tab-button {
    --padding-top: 1em;
    --padding-bottom: 1em;
    --ripple-color: transparent;
    box-sizing: border-box;
    background: none;
    color: var(--color-contrast);
    position: relative;
}

ion-label {
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 1px;
}

ion-tab-button[aria-selected='true']::after {
    content: '';
    width: 50%;
    height: 6px;
    border-radius: 0.5em 0.5em 0 0;
    background: var(--color-primary);
    position: absolute;
    bottom: 0;
    left: 50%;
    translate: -50% 0;
}

ion-header,
ion-toolbar {
    height: 6em;
    display: flex;
}

.header-md::after {
    background-image: none;
}

ion-title {
    font-size: 2rem;
    text-align: left;
    padding: 0;
    padding-left: 1em;
}
</style>