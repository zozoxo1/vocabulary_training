<template>
    <div class="buttons">
        <ion-button :class="`btn-delete ${deleteButtonText == 'close' ? 'close' : ''}`"
            v-if="showDelete == true || showDelete == undefined" @click="btnDelete">
            <ion-icon :icon="deleteButtonText == 'close' ? exitOutline : trashOutline"></ion-icon>
        </ion-button>
        <ion-button class="btn-continue" @click="$emit('continueEvent')">{{ saveButtonText }}</ion-button>
    </div>
</template>
  
<script lang="ts">
import {
    alertController,
    IonButton
} from "@ionic/vue";
import { exitOutline, trashOutline } from "ionicons/icons";
import { defineComponent } from "vue";

export default defineComponent({
    name: "ButtonRow",
    components: {
        IonButton
    },
    props: [
        'deleteButtonText',
        'saveButtonText',
        'continueEvent',
        'deleteEvent',
        'showDelete'
    ],
    data() {
        return {
            trashOutline,
            exitOutline
        }
    },
    methods: {
        async btnDelete() {
            if (this.deleteButtonText !== 'Löschen') {
                this.$emit('deleteEvent');
                return;
            }

            const alert = await alertController.create({
                header: 'Bist du dir sicher, dass du dieses Element löschen möchtest?',
                buttons: [
                    {
                        text: 'Nein',
                        role: 'cancel',
                    },
                    {
                        text: 'Ja',
                        role: 'confirm',
                    },
                ],
            });

            alert.onDidDismiss().then((data) => {
                if (data.role === 'confirm') {
                    this.$emit('deleteEvent');
                }
            });

            await alert.present();
        },
    }
});
</script>

<style lang="scss" scoped>
.buttons {
    position: absolute;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    width: 100%;
    gap: 0.5em;
    left: 0;
    bottom: 0;
    padding: 1em;
}

.buttons ion-button {
    --ripple-color: transparent;
    --border-radius: 0.5em;
    --padding-start: 1em;
    --padding-end: 1em;
    --padding-top: 0.5em;
    --padding-bottom: 0.5em;
    --border: none;
    --box-shadow: none;
    --color: var(--clr-white);
    height: 2.8em;
    letter-spacing: 0em;
    text-transform: none;
    font-size: 1em;
}

.buttons .btn-delete {
    --background: var(--clr-red);
    --background-activated: var(--clr-red-dark);
    --background-focused: var(--clr-red-dark);
    --background-hover: var(--clr-red-dark);
}

.buttons .btn-delete.close {
    --background: var(--clr-gray);
    --background-activated: var(--clr-gray-dark);
    --background-focused: var(--clr-gray-dark);
    --background-hover: var(--clr-gray-dark);
}

.buttons .btn-continue {
    flex: 1;
    --background: var(--color-btn-primary);
    --background-activated: var(--clr-green-dark);
    --background-focused: var(--clr-green-dark);
    --background-hover: var(--clr-green-dark);
}
</style>