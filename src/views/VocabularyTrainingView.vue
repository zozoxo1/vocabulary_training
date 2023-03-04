<template>
    <ion-page>
        <ion-header>
            <ion-toolbar class="head">
                <ion-button @click="exit">
                    <ion-icon :icon="exitOutline"></ion-icon>
                </ion-button>
                <ion-button @click="changeDirection">
                    <ion-icon :icon="swapHorizontalOutline"></ion-icon>
                </ion-button>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <Flags :direction="direction" :src-first-language="`flags/${stack.languageA}.svg`"
                :src-second-language="`flags/${stack.languageB}.svg`" :name-first-language="stack.stackLanguages[0]"
                :name-second-language="stack.stackLanguages[1]"></Flags>
            <div class="vocabulary_card">
                <img class="language" :src="require(`@/assets/flags/${getLanguage()}.svg`)">
                <h1 class="word">Donaudampfschifffahrtselektrizitätenhauptbetriebswerkbauunterbeamtengesellschaft</h1>
            </div>
            <ion-button class="turnCard">
                <ion-icon :icon="refreshOutline"></ion-icon>
                Umdrehen
            </ion-button>

            <div class="progress">
                <div class="progress_title">
                    <p>Noch {{ stack.stackTraining.length }} Vokabel{{ stack.stackTraining.length == 1 ? '' : 'n' }}</p>
                    <p>({{ Math.round(((progress_length / stack.stackTraining.length) - stack.stackTraining.length) * 100)
                    }}%)</p>
                </div>
                <ion-progress-bar
                    :value="(progress_length / stack.stackTraining.length) - stack.stackTraining.length"></ion-progress-bar>
            </div>
        </ion-content>
    </ion-page>
</template>
  
<script lang="ts">
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonModal, IonProgressBar, IonSpinner } from '@ionic/vue';
import { defineComponent, ref } from 'vue';
import { Options, Vue } from 'vue-class-component';
import AddButton from '@/components/AddButton.vue';
import ButtonRow from '@/components/ButtonRow.vue';
import VocabularyProgressBar from '@/components/VocabularyProgressBar.vue';
import { Stack } from '@/utils/Stack';
import { StackService } from '@/services/Stack.Service';
import { container } from 'tsyringe';
import TrainingSlide from '@/components/slides/TrainingSlide.vue';
import { Swiper, SwiperSlide } from 'swiper/vue';

import 'swiper/swiper.min.css';
import { exitOutline, refreshOutline, swapHorizontalOutline } from 'ionicons/icons';
import Flags from '@/components/Flags.vue';

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
        changeDirection() {
            this.direction = directions[(directions.indexOf(this.direction) + 1) % directions.length];
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
        getLanguage() {
            if (this.direction == 'left')
                return this.stack.languageB;
            else if (this.direction == 'right')
                return this.stack.languageA;
            else
                return Math.floor(Math.random() * 2) == 0 ? this.stack.languageA : this.stack.languageB;
        }
    },
    data() {
        const stackService = container.resolve(StackService);
        let progress_length = 0;

        return {
            exitOutline,
            swapHorizontalOutline,
            refreshOutline,
            direction: 'right',
            stackService,
            stack: new Stack("0", 'placeholder', 'placeholder', [], [], [], []) as Stack,
            progress_length,
        }
    },
    mounted() {
        this.fetchData();
    },

    beforeUpdate() {
        this.fetchData();
        this.progress_length = this.stack.stackTraining.length;
    },
})
</script>
  
<style lang="scss" scoped>
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
    word-break: break-all;
    width: 100%;
    padding-inline: 1em;
    box-sizing: border-box;
}

.vocabulary_card .language {
    width: 50px;
    height: 50px;
    margin: 0.5em 0 1em 1em;
}

ion-content,
ion-toolbar {
    --background: var(--color-tab-bar) !important;
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
</style>