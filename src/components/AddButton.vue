<template>
    <ion-button class="btn-add">
        <ion-icon :icon="addCircle"></ion-icon>
    </ion-button>
</template>
  
<script lang="ts">
import {
    IonButton
} from "@ionic/vue";
import { addCircle } from 'ionicons/icons';
import { defineComponent } from "vue";

export default defineComponent({
    name: "AddButton",
    components: {
        IonButton
    },

    data() {
        return {
            addCircle
        }
    }
});
</script>

<style lang="scss" scoped>
.btn-add {
    font-size: 2.5em;
    height: 50px;
    width: 50px;
    color: var(--color-btn-primary);
    position: absolute;
    bottom: 0em;
    right: 0.3em;
    z-index: 10;
    --background: none;
    --padding-start: 0;
    --padding-end: 0;
    --background-activated: none;
    --background-hover: none;
    --box-shadow: none;
    --ripple-color: transparent;
}

.btn-add.ion-activated,
.btn-add:focus {
    color: var(--color-btn-focus);
}
</style>