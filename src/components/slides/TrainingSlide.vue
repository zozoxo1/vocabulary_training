<template>
    <div class="vocabulary-stack">
        <Flags :src-first-language="srcFirstLanguage" :src-second-language="srcSecondLanguage"
            :name-first-language="nameFirstLanguage" :name-second-language="nameSecondLanguage">
        </Flags>

        <div class="content">
            <VocabularyProgressBar additionalClasses="" progressTitle="Restliche Vokabeln"
                :progressText="`${stack.stackDefault.length + stack.stackTraining.length} Vokabel${stack.stackDefault.length + stack.stackTraining.length == 1 ? '' : 'n'} (${Math.round(((stack.stackDefault.length + stack.stackTraining.length) / stack.stackSize) * 100)}%)`"
                :progressValue="(stack.stackDefault.length + stack.stackTraining.length) / stack.stackSize">
            </VocabularyProgressBar>

            <VocabularyProgressBar additionalClasses="" progressTitle="Trainingsfortschritt"
                :progressText="`${stack.stackChecked.length} Vokabel${stack.stackChecked.length == 1 ? '' : 'n'} (${Math.round((stack.stackChecked.length / stack.stackSize) * 100)}%)`"
                :progressValue="stack.stackChecked.length / stack.stackSize">
            </VocabularyProgressBar>

            <VocabularyProgressBar additionalClasses="progress_done" progressTitle="Richtig" progressText="Falsch"
                :progressValue="((stack.stackExpanded.length + stack.stackChecked.length) - stack.stackExpanded.length) / (stack.stackExpanded.length + stack.stackChecked.length)">
            </VocabularyProgressBar>

            <ButtonRow :show-delete="(stack.stackChecked.length / stack.stackSize) != 1"
                @deleteEvent="$emit('removeTraining', stack.id)" deleteButtonText="Löschen" @continueEvent="startTraining"
                :saveButtonText="(stack.stackChecked.length / stack.stackSize) == 1 ? 'Training beenden' : 'Fortsetzen'">
            </ButtonRow>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import ButtonRow from "../ButtonRow.vue";
import VocabularyProgressBar from "../VocabularyProgressBar.vue";
import Flags from "../Flags.vue";

export default defineComponent({
    name: "TrainingSlide",
    components: {
        ButtonRow,
        VocabularyProgressBar,
        Flags
    },
    props: [
        'srcFirstLanguage',
        'srcSecondLanguage',
        'nameFirstLanguage',
        'nameSecondLanguage',
        'stack',
        'removeTraining',
    ],
    methods: {
        startTraining() {
            if ((this.stack.stackChecked.length / this.stack.stackSize) == 1) {
                this.$emit('removeTraining', this.stack.id);
                return;
            }

            this.$router.push({ name: 'vocabulary-training', params: { id: this.stack.id } });
        }
    }
});
</script>

<style lang="scss" scoped></style>