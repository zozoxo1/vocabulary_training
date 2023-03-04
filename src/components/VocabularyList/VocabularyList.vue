<template>
    <ion-list>
        <ion-item-sliding v-for="vocabulary in vocabularies" :key="vocabulary.getId">
            <ion-item-options side="end">
                <ion-item-option expandable color="danger" @click="() => { }">
                    <ion-icon :icon="trash"></ion-icon>
                    Löschen
                </ion-item-option>
            </ion-item-options>
            <ion-item>
                <div>
                    <p>{{ stack.stackLanguages[0] }}</p>
                    <h4>{{ vocabulary.getWord }}</h4>
                    <p>{{ stack.stackLanguages[1] }}</p>
                    <h4>{{ vocabulary.getTranslation }}</h4>
                    <p>Beschreibung</p>
                    <h4>{{ vocabulary.getDescription }}</h4>
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
            await stackService.getStack(this.stack.id).then((data) => {
                this.vocabularies.splice(0, this.vocabularies.length)
                this.vocabularies.push(...data.stackDefault.concat(data.stackTraining, data.stackExpanded, data.stackChecked))
            });
        }
    },
    watch: {
        async update() {
            // only god knows why this is working ~ Zoe Günther 2023
            await setTimeout(() => {
                this.fetchData();
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