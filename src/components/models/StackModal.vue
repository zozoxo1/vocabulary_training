<template>
    <ion-header>
        <ion-toolbar>
            <ion-title>Stack hinzufügen</ion-title>
        </ion-toolbar>
    </ion-header>
    <ion-content>
        <flags :src-first-language="getImgUrl(current_first_language.path)"
            :src-second-language="getImgUrl(current_second_language.path)"
            :name-first-language="current_first_language.language" :name-second-language="current_second_language.language">
        </flags>

        <ion-list>
            <ion-item>
                <ion-select mutliple="false" :selected-text="current_first_language.language"
                    @ionChange="handleFirstLanguageChange($event)" :compareWith="compareWith"
                    :interface-options="customAlertOptionsOne" interface="alert" placeholder="1. Sprache auswählen"
                    ok-text="1. Sprache wählen" cancel-text="Abbrechen">
                    <ion-select-option v-for="language in languages" :key="language.code" :value="language">
                        {{ language.language }}
                    </ion-select-option>
                </ion-select>
            </ion-item>
        </ion-list>

        <ion-list class="list-second">
            <ion-item>
                <ion-select mutliple="false" :selected-text="current_second_language.language"
                    @ionChange="handleSecondLanguageChange($event)" :compareWith="compareWith"
                    :interface-options="customAlertOptionsTwo" interface="alert" placeholder="2. Sprache auswählen"
                    ok-text="2. Sprache wählen" cancel-text="Abbrechen">
                    <ion-select-option v-for="language in languages" :key="language.code" :value="language">
                        <p class="language-text">{{ language.language }}</p>
                    </ion-select-option>
                </ion-select>
            </ion-item>
        </ion-list>

        <ion-button class="btn-continue"
            @click="submit(current_first_language, current_second_language)">Hinzufügen</ion-button>
        <ion-button class="btn-delete" @click="closeModal">Abbrechen</ion-button>
    </ion-content>
</template>
  
<script lang="ts">
import {
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonList,
    IonSelect,
    IonSelectOption,
    modalController
} from "@ionic/vue";
import { defineComponent } from "vue";
import languages from '@/utils/languages.json';
import Flags from "../Flags.vue";
import { alertController } from '@ionic/vue';
import { StackService } from "@/services/Stack.Service";
import { container } from "tsyringe";

type languageObject = {
    code: string;
    language: string;
    path: string;
}

const stackService: StackService = container.resolve(StackService);

export default defineComponent({
    name: "StackModal",
    components: {
        IonContent,
        IonHeader,
        IonTitle,
        IonToolbar,
        IonList,
        IonSelect,
        IonSelectOption,
        Flags
    },
    methods: {
        getImgUrl(path: string): string {
            if (!path) {
                return 'flags/placeholder.svg';
            }

            return path
        },

        compareWith(o1: any, o2: any): boolean {
            return o1 && o2 ? o1.code === o2.code : o1 === o2;
        },

        handleFirstLanguageChange(e: any) {
            if (typeof e.detail.value !== 'undefined') {
                this.current_first_language = e.detail.value as languageObject;
            }
        },

        handleSecondLanguageChange(e: any) {
            if (typeof e.detail.value !== 'undefined') {
                this.current_second_language = e.detail.value as languageObject;
            }
        },

        closeModal(data?: string, role?: string) {
            return modalController.dismiss(data || '', role || '');
        },

        async presentAlert(message: string) {
            const alert = await alertController.create({
                header: 'Hinweis',
                subHeader: 'Fehlerhafte Eingabe',
                message: message,
                buttons: ['OK'],
            });

            await alert.present();
        },

        submit(firstLanguage: languageObject, secondLanguage: languageObject) {
            if (!firstLanguage.code || !secondLanguage.code) {
                this.presentAlert('Bitte wähle 2 Sprachen aus');
                return;
            }

            if (firstLanguage.code === secondLanguage.code) {
                this.presentAlert('Bitte wähle 2 unterschiedliche Sprachen aus');
                return;
            }

            stackService.addStack(firstLanguage.code, secondLanguage.code);

            this.closeModal('', 'reload');
        }
    },
    setup() {

        const customAlertOptionsOne = {
            header: 'Sprache auswählen',
            subHeader: 'Wähle die 1. Sprache aus',
            message: '',
            translucent: true
        };

        const customAlertOptionsTwo = {
            header: 'Sprache auswählen',
            subHeader: 'Wähle die 2. Sprache aus',
            message: '',
            translucent: true
        };


        return {
            customAlertOptionsOne,
            customAlertOptionsTwo
        };
    },

    data() {
        return {
            current_first_language: {} as languageObject,
            current_second_language: {} as languageObject,
            languages: languages.sort((a, b) => a.language.toLowerCase() > b.language.toLowerCase() ? 1 : -1)
        }
    }
});
</script>
<style lang="scss" scoped>
ion-button {
    width: 40%;
    --ripple-color: transparent;
}

.btn-delete {
    --background: none;
    --border: none;
    --box-shadow: none;
    --background-activated: transparent;
    position: absolute;
    left: 50%;
    translate: -50% 0;
    bottom: 2em;
}

.btn-continue {
    --background: green;
    --border: none;
    color: white;
    --box-shadow: none;
    --border-radius: 15px;
    top: 2em;
    position: relative;
}

.btn-continue.ion-activated,
.btn-continue:focus {
    --background-activated: rgb(1, 77, 1);
}

.btn-delete.ion-activated,
.btn-delete:focus {
    color: rgb(138, 62, 62);
}

ion-content,
ion-toolbar {
    --background: var(--color-tab-bar) !important;
    box-sizing: border-box;
    color: var(--color-contrast);
    --color: var(--color-contrast);
}

ion-item,
ion-list {
    width: 14em;
    --background: var(--color-tab-bar) !important;
    box-sizing: border-box;
    color: var(--color-contrast);
    --color: var(--color-contrast);
    margin: 0 auto;
    --padding-start: 0;
    outline: none;
}

ion-content {
    height: 100%;
}

.list-second {
    margin-top: 1.2em;
}
</style>