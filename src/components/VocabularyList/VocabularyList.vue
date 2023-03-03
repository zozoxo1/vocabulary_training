<template>
    <ion-list>
        <ion-item v-for="vocabulary in vocabularies" :key="vocabulary.getId">
            <div>
                <p>{{ stack.stackLanguages[0] }}</p>
                <h4>{{ vocabulary.getWord }}</h4>
                <p>{{ stack.stackLanguages[1] }}</p>
                <h4>{{ vocabulary.getTranslation }}</h4>
                <p>Beschreibung</p>
                <h4>{{ vocabulary.getDescription }}</h4>
            </div>
        </ion-item>
    </ion-list>
</template>
  
<script lang="ts">
import { defineComponent } from "vue";
import { IonItem, IonList } from '@ionic/vue';
import { Vocabulary } from "@/utils/Vocabulary";

let vocabularies: Vocabulary[] = new Array<Vocabulary>();

export default defineComponent({
    name: "VocabularyList",
    components: {
        IonItem,
        IonList
    },
    props: [
        'stack'
    ],

    setup(props) {
        props.stack.stackDefault.forEach((item: Vocabulary) => {
            vocabularies.push(item);
        });

        props.stack.stackTraining.forEach((item: Vocabulary) => {
            vocabularies.push(item);
        });

        props.stack.stackExpanded.forEach((item: Vocabulary) => {
            vocabularies.push(item);
        });

        props.stack.stackChecked.forEach((item: Vocabulary) => {
            vocabularies.push(item);
        });

        return {
            vocabularies
        }
    }
});
</script>

<style lang="scss" scoped>
ion-item {
    --background: var(--color-tab-bar-2) !important;
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