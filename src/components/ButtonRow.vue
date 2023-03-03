<template>
    <div class="buttons">
        <ion-button class="btn-delete" @click="$emit('deleteEvent')">{{ deleteButtonText }}</ion-button>
        <ion-button class="btn-continue" @click="$emit('continueEvent')">{{ saveButtonText }}</ion-button>
    </div>
</template>
  
<script lang="ts">
import {
    IonButton
} from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
    name: "ButtonRow",
    components: {
        IonButton
    },
    props: ['deleteButtonText', 'saveButtonText', 'continueEvent', 'deleteEvent']
});
</script>

<style lang="scss" scoped>
.buttons {
    bottom: 2em;
    position: absolute;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    width: 90%;
    gap: 1em;
}

.buttons ion-button {
    width: 40%;
    --ripple-color: transparent;
}

.buttons .btn-delete {
    --background: none;
    --border: none;
    --box-shadow: none;
    --background-activated: transparent;
}

.buttons .btn-continue {
    --background: var(--color-btn-primary);
    --border: none;
    color: white;
    --box-shadow: none;
    --border-radius: 15px;
}

.buttons .btn-continue.ion-activated,
.buttons .btn-continue:focus {
    --background-activated: var(--color-btn-focus);
}

.buttons .btn-delete.ion-activated,
.buttons .btn-delete:focus {
    color: var(--color-btn-delete-focus);
}
</style>