<template>
    <ion-header>
        <ion-toolbar>
            <ion-title>Vokabel Liste</ion-title>
        </ion-toolbar>
    </ion-header>
    <ion-content>
        <flags :srcFirstLanguage="srcFirstLanguage" :srcSecondLanguage="srcSecondLanguage"
            :nameFirstLanguage="nameFirstLanguage" :nameSecondLanguage="nameSecondLanguage"></flags>
        <vocabulary-list ref="vocabList" :stack="stack" :update="updateList"></vocabulary-list>
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
import { defineComponent, ref } from "vue";
import { alertController } from "@ionic/vue";
import Flags from "../Flags.vue";
import { Vocabulary } from "@/utils/Vocabulary";
import VocabularyList from "../VocabularyList/VocabularyList.vue";
import ButtonRow from "../ButtonRow.vue";
import { StackService } from "@/services/Stack.Service";
import { container } from "tsyringe";

const stackService: StackService = container.resolve(StackService);

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
        'stack',
        'update'
    ],
    methods: {
        closeModal(data?: string, role?: string) {
            modalController.dismiss(data || '', role || '');
        },

        async presentAlert() {
            const alert = await alertController.create({
                header: 'Vokabel einfügen',
                buttons: [
                    {
                        text: 'Abbrechen',
                        role: 'cancel'
                    },
                    {
                        text: 'Einfügen',
                        role: 'success'
                    }],
                inputs: [
                    {
                        type: 'textarea',
                        placeholder: this.nameFirstLanguage,
                        attributes: {
                            minlength: 1,
                            maxlength: 100,
                        },
                    },
                    {
                        type: 'textarea',
                        placeholder: this.nameSecondLanguage,
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

                if (firstLanguage === '' || secondLanguage === '' || description === '') {
                    return;
                }

                const vocabulary = new Vocabulary(0, firstLanguage, secondLanguage, description);

                stackService.addVocabulary(vocabulary, this.stack.id);
                this.updateList++;
            });

            return await alert.present();
        }
    },
    data() {
        return {
            updateList: 1
        }
    }
});
</script>
<style lang="scss" scoped>
ion-content,
ion-toolbar {
    --background: var(--clr-dark) !important;
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