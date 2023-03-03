<template>
    <ion-header>
        <ion-toolbar>
            <ion-title>Vokabel Liste</ion-title>
        </ion-toolbar>
    </ion-header>
    <ion-content>
        <flags :srcFirstLanguage="srcFirstLanguage" :srcSecondLanguage="srcSecondLanguage"
            :nameFirstLanguage="nameFirstLanguage" :nameSecondLanguage="nameSecondLanguage"></flags>
        <vocabulary-list :stack="stack"></vocabulary-list>
        <button-row @deleteEvent="closeModal" @continueEvent="presentAlert" deleteButtonText="Schließen"
            saveButtonText="Hinzufügen"></button-row>
    </ion-content>
</template>
  
<script lang="ts">
import {
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    modalController
} from "@ionic/vue";
import { defineComponent } from "vue";
import { alertController } from "@ionic/vue";
import Flags from "../Flags.vue";
import { Vocabulary } from "@/utils/Vocabulary";
import VocabularyList from "../VocabularyList/VocabularyList.vue";
import ButtonRow from "../ButtonRow.vue";
import { StackService } from "@/services/Stack.Service";
import { container } from "tsyringe";

export default defineComponent({
    name: "VocabularyListModal",
    components: {
        IonContent,
        IonHeader,
        IonTitle,
        IonToolbar,
        Flags,
        VocabularyList,
        ButtonRow
    },
    props: [
        'srcFirstLanguage',
        'srcSecondLanguage',
        'nameFirstLanguage',
        'nameSecondLanguage',
        'stack'
    ],
    methods: {
        closeModal(data?: string, role?: string) {
            modalController.dismiss(data || '', role || '');
        },
    },
    setup(props) {
        const stackService: StackService = container.resolve(StackService);

        const presentAlert = async () => {
            const alert = await alertController.create({
                header: 'Vokabel einfügen',
                buttons: ['Abbrechen', 'Einfügen'],
                inputs: [
                    {
                        type: 'textarea',
                        placeholder: props.nameFirstLanguage,
                        attributes: {
                            minlength: 1,
                            maxlength: 100,
                        },
                    },
                    {
                        type: 'textarea',
                        placeholder: props.nameSecondLanguage,
                        attributes: {
                            minlength: 1,
                            maxlength: 100,
                        },
                    },
                    {
                        type: 'textarea',
                        placeholder: 'Beschreibung',
                        attributes: {
                            minlength: 1,
                            maxlength: 100,
                        },
                    },
                ],
            });

            alert.onDidDismiss().then((data) => {
                if (data.role === 'cancel') {
                    return;
                }

                const firstLanguage = data.data.values[0];
                const secondLanguage = data.data.values[1];
                const description = data.data.values[2];

                const vocabulary = new Vocabulary(0, firstLanguage, secondLanguage, description);

                stackService.addVocabulary(vocabulary, props.stack.id);
            });

            await alert.present();
        };

        return {
            presentAlert
        }
    }
});
</script>
<style lang="scss" scoped>
ion-content,
ion-toolbar {
    --background: var(--color-tab-bar) !important;
    box-sizing: border-box;
    color: var(--color-contrast);
    --color: var(--color-contrast);
}

ion-content {
    height: 100%;
}


.buttons {
    padding-inline: 1em;
    box-sizing: border-box;
    width: 100% !important;
}
</style>