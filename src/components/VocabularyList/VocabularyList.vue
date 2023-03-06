<template>
    <ion-list>
        <ion-item-sliding v-for="vocabulary in vocabularies" :key="vocabulary.id">
            <ion-item-options side="end">
                <ion-item-option color="danger" @click="deleteVocabulary(vocabulary)">
                    <ion-icon :icon="trash"></ion-icon>
                    Löschen
                </ion-item-option>
            </ion-item-options>
            <ion-item>
                <div>
                    <p>{{ stackLanguages(stack)[0] }}</p>
                    <h4>{{ vocabulary.word }}</h4>
                    <p>{{ stackLanguages(stack)[1] }}</p>
                    <h4>{{ vocabulary.translation }}</h4>
                    <p>Beschreibung</p>
                    <h4>{{ vocabulary.description }}</h4>
                </div>
            </ion-item>
        </ion-item-sliding>

        <h1 class="no-vocabularies center" v-if="vocabularies.length == 0">Keine Vokabeln vorhanden</h1>
    </ion-list>
</template>
  
<script lang="ts">
import { defineComponent } from "vue";
import { IonItem, IonList, IonItemSliding } from '@ionic/vue';
import { Vocabulary } from "@/utils/Vocabulary";
import { trash } from 'ionicons/icons';
import { StackService } from "@/services/Stack.Service";
import { container } from "tsyringe";
import { Stack } from "@/utils/Stack";
import languages from '@/utils/languages.json'

const stackService: StackService = container.resolve(StackService);

export default defineComponent({
    name: "VocabularyList",
    components: {
        IonItem,
        IonList,
        IonItemSliding
    },
    props: [
        'stack',
        'update'
    ],
    methods: {
        async fetchData() {
            const fetchedStack = await stackService.getStack(this.stack._id);
            this.vocabularies.splice(0, this.vocabularies.length)
            this.vocabularies.push(...fetchedStack.stack_default.concat(fetchedStack.stack_training, fetchedStack.stack_expanded, fetchedStack.stack_checked))
        },
        async deleteVocabulary(vocabulary: Vocabulary) {
            await stackService.removeVocabulary(vocabulary, this.stack._id)
            this.vocabularies.splice(this.vocabularies.indexOf(vocabulary), 1)
        },
        stackLanguages(stack: Stack) {
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
        }
    },
    watch: {
        async update() {
            // only god knows why this is working ~ Zoe Günther 2023
            await setTimeout(async () => {
                await this.fetchData();
            }, 100)
        }
    },

    data() {
        return {
            trash,
            vocabularies: [] as Vocabulary[]
        }
    },

    async mounted() {
        await this.fetchData();
    }
});
</script>

<style lang="scss" scoped>
.center {
    top: 50%;
    left: 50%;
    translate: -50% -50%;
    position: absolute;
}

.no-vocabularies {
    color: var(--color-contrast-2)
}

ion-item {
    --background: var(--color-tab-bar-3) !important;
    box-sizing: border-box;
    color: var(--color-contrast);
    --color: var(--color-contrast);
    --padding-start: 0;
    display: flex;
    flex-direction: column;
}

ion-list {
    height: 50%;
    overflow-y: auto;
    background: var(--color-tab-bar-2) !important;
}

ion-item div {
    height: auto;
    padding-inline: 2em;
    box-sizing: border-box;
}

ion-item p {
    margin-bottom: 0;
    color: var(--color-3);
}

ion-item p:first-child {
    margin-top: 1.2em;
}

ion-item h4 {
    margin-top: 0;
    margin-bottom: 1.2em;
}
</style>