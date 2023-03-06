<template>
    <ion-page>
        <ion-header>
            <ion-toolbar class="head">
                <ion-button class="small" @click="exit">
                    <ion-icon :icon="exitOutline"></ion-icon>
                </ion-button>
                <ion-button class="small" :disabled="cardTurned" @click="changeDirection">
                    <ion-icon :icon="swapHorizontalOutline"></ion-icon>
                </ion-button>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <Flags :direction="direction" :src-first-language="`flags/${stack.lang_a}.svg`"
                :src-second-language="`flags/${stack.lang_b}.svg`" :name-first-language="stackLanguages(stack)[0]"
                :name-second-language="stackLanguages(stack)[1]"></Flags>
            <div class="vocabulary_card">
                <img class="language" :src="require(`@/assets/flags/${language}.svg`)">
                <div class="word">
                    <h1>{{ language == stack.lang_a ? currentVocabulary.word :
                        currentVocabulary.translation }}</h1>
                    <p v-if="cardTurned">{{ currentVocabulary.description }}</p>
                    <h1 class="info-dark" v-if="stack.stack_training.length == 0">
                        Drücke Weiter<br>um fortzufahren
                    </h1>
                </div>
            </div>
            <div class="actions">
                <ion-button class="small wrong" v-if="cardTurned && stack.stack_training.length > 0"
                    @click="nextVocabulary(false)">
                    <ion-icon :icon="thumbsDownOutline"></ion-icon>
                </ion-button>
                <ion-button v-if="stack.stack_training.length > 0" class="turnCard" @click="turnCard">
                    <ion-icon :icon="refreshOutline"></ion-icon>
                    Umdrehen
                </ion-button>
                <ion-button class="small right" v-if="cardTurned && stack.stack_training.length > 0"
                    @click="nextVocabulary(true)">
                    <ion-icon :icon="thumbsUpOutline"></ion-icon>
                </ion-button>
                <ion-button @click="resetTraining" v-if="stack.stack_training.length == 0">
                    Weiter
                    <ion-icon :icon="caretForwardOutline"></ion-icon>
                </ion-button>
            </div>
            <div class="progress">
                <div class="progress_title">
                    <p>Noch {{ stack.stack_training.length }} Vokabel{{ stack.stack_training.length == 1 ? '' : 'n' }}</p>
                    <p>({{ (Math.round((progress_length - stack.stack_training.length) / (progress_length) *
                        100) | 0)
                    }}%)</p>
                </div>
                <ion-progress-bar
                    :value="(progress_length - stack.stack_training.length) / (progress_length)"></ion-progress-bar>
            </div>
        </ion-content>
    </ion-page>
</template>
  
<script lang="ts">
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonModal, IonProgressBar, IonSpinner, alertController } from '@ionic/vue';
import { defineComponent, ref } from 'vue';
import { Stack } from '@/utils/Stack';
import { StackService } from '@/services/Stack.Service';
import { container } from 'tsyringe';

import 'swiper/swiper.min.css';
import { caretForwardOutline, exitOutline, refreshOutline, swapHorizontalOutline, thumbsDownOutline, thumbsUpOutline } from 'ionicons/icons';
import Flags from '@/components/Flags.vue';
import { Vocabulary } from '@/utils/Vocabulary';
import languages from '@/utils/languages.json'

const directions = ['left', 'right', ''];

export default defineComponent({
    name: "VocabularyTrainingView",
    components: {
        IonHeader,
        IonToolbar,
        IonContent,
        IonPage,
        Flags
    },
    methods: {
        turnCard() {
            this.cardTurned = !this.cardTurned;
            this.language = this.language == this.stack.lang_a ? this.stack.lang_b : this.stack.lang_a;
        },
        changeDirection() {
            this.direction = directions[(directions.indexOf(this.direction) + 1) % directions.length];
            this.setLanguage();
        },
        exit() {
            this.$router.push('/training');
        },
        fetchData() {
            const id = this.$route.params.id?.toString();
            if (id == undefined)
                return;

            this.stackService.getStack(id).then((stack) => {
                this.stack = stack;
            });
        },
        stackLanguages(stack: any) {
            let l1 = stack.lang_a
            let l2 = stack.lang_b

            languages.find((language) => {
                if (language.code === stack.lang_a) {
                    l1 = language.language
                }

                if (language.code === stack.lang_b) {
                    l2 = language.language
                }
            })

            return [l1, l2]
        },
        setLanguage() {
            if (this.direction == 'left') {
                this.language = this.stack.lang_b;
            } else if (this.direction == 'right') {
                this.language = this.stack.lang_a;
            } else {
                this.language = Math.floor(Math.random() * 2) == 0 ? this.stack.lang_a : this.stack.lang_b;
            }
        },

        async nextVocabulary(vocabularyCorrect: boolean) {
            // hier api request mit richtig oder falsch mit current vocabulary
            if (vocabularyCorrect)
                await this.stackService.successCardAnswer(this.stack._id, this.currentVocabulary.id);
            else
                await this.stackService.failedCardAnswer(this.stack._id, this.currentVocabulary.id);

            this.stack.stack_training.shift();
            // this.progress_length = this.stack.stackTraining.length;
            this.cardTurned = false;
            this.setLanguage();

            if (this.stack.stack_training.length > 0) {
                this.currentVocabulary = this.stack.stack_training[0];
            } else {
                this.$router.push('/training');
            }
        },

        async resetTraining() {
            const alert = await alertController.create({
                header: 'Anzahl an Vokabeln zum trainieren',
                buttons: [
                    {
                        text: 'Abbrechen',
                        role: 'cancel'
                    },
                    {
                        text: 'Training starten',
                        role: 'start'
                    }],
                inputs: [
                    {
                        type: 'number',
                        placeholder: 'Anzahl Vokabeln',
                        min: 1,
                        max: 100,
                    },
                ],
            });

            alert.onDidDismiss().then(async (data) => {
                if (data.data.values[0] == undefined || data.data.values[0] == '') return;
                if (data.role == 'cancel') return;

                if (data.role == 'start') {
                    await this.stackService.startTraining(this.stack._id, Number.parseInt(data.data.values[0]));

                    this.reset();
                }
            });

            await alert.present();
        },

        async reset() {
            await this.fetchData();
            setTimeout(() => {
                this.progress_length = this.stack.stack_training.length;
                this.setLanguage();

                if (this.stack.stack_training.length > 0) {
                    this.currentVocabulary = this.stack.stack_training[0];
                } else {
                    this.currentVocabulary = new Vocabulary('', '', '') as Vocabulary;
                }
            }, 100)
        }
    },
    data() {
        const stackService = container.resolve(StackService);
        let progress_length = 0;

        return {
            exitOutline,
            swapHorizontalOutline,
            refreshOutline,
            caretForwardOutline,
            direction: 'right',
            stackService,
            stack: new Stack('placeholder', 'placeholder', [], [], [], []) as Stack,
            progress_length,
            thumbsDownOutline,
            thumbsUpOutline,
            cardTurned: false,
            language: 'placeholder',
            currentVocabulary: new Vocabulary('', '', '') as Vocabulary
        }
    },
    mounted() {
        this.fetchData();
    },

    beforeUpdate() {
        this.reset();
    },
})
</script>
  
<style lang="scss" scoped>
.info-dark {
    color: var(--color-contrast-2);
}

.progress {
    position: absolute;
    bottom: 2.5em;
    width: 100%;
}

.progress_title {
    display: flex;
    justify-content: space-between;
    margin-inline: 1.5em;
}

.progress_title+ion-progress-bar {
    width: 90%;
    margin-inline: auto;
}

.turnCard>ion-icon {
    margin-right: 0.5em;
}

.vocabulary_card {
    width: 90%;
    height: 20em;
    background-color: var(--color-tab-bar-2);
    margin: 1em auto;
    border-radius: 1em;
    text-align: left;
    position: relative;
}

.vocabulary_card .word {
    position: absolute;
    top: 42%;
    left: 50%;
    translate: -50% -50%;
    width: 100%;
    padding-inline: 1em;
    box-sizing: border-box;
    text-align: center;
    height: 80%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    overflow-y: auto;
}

.vocabulary_card .word h1 {
    font-size: 2em;
    margin: 0;
    padding: 0;
    word-break: break-all;
}

.vocabulary_card .word p {
    position: absolute;
    bottom: 0;
    word-break: break-all;
}

.vocabulary_card .language {
    width: 50px;
    height: 50px;
    margin: 0.5em 0 1em 1em;
}

ion-content,
ion-toolbar {
    --background: var(--clr-dark) !important;
    box-sizing: border-box;
    color: var(--color-contrast);
    --color: var(--color-contrast);
}

.head {
    text-align: left;
}

.head ion-button:first-child {
    margin-left: 1em;
}

.actions ion-button:nth-child(2) {
    margin-inline: 2em;
}

ion-button {
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

ion-button.small.wrong {
    --background: var(--clr-red);
    --background-activated: var(--clr-red-dark);
    --background-focused: var(--clr-red-dark);
    --background-hover: var(--clr-red-dark);
}

ion-button.small.right {
    --background: var(--clr-green);
    --background-activated: var(--clr-green-dark);
    --background-focused: var(--clr-green-dark);
    --background-hover: var(--clr-green-dark);
}
</style>