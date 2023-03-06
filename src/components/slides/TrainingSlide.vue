<template>
    <div class="vocabulary-stack">
        <Flags :src-first-language="srcFirstLanguage" :src-second-language="srcSecondLanguage"
            :name-first-language="nameFirstLanguage" :name-second-language="nameSecondLanguage">
        </Flags>

        <div class="content">
            <VocabularyProgressBar additionalClasses="" progressTitle="Restliche Vokabeln"
                :progressText="`${stack.stack_default.length + stack.stack_training.length} Vokabel${stack.stack_default.length + stack.stack_training.length == 1 ? '' : 'n'} (${Math.round(((stack.stack_default.length + stack.stack_training.length) / getStackSize(stack)) * 100)}%)`"
                :progressValue="(stack.stack_default.length + stack.stack_training.length) / getStackSize(stack)">
            </VocabularyProgressBar>

            <VocabularyProgressBar additionalClasses="" progressTitle="Trainingsfortschritt"
                :progressText="`${stack.stack_checked.length} Vokabel${stack.stack_checked.length == 1 ? '' : 'n'} (${Math.round((stack.stack_checked.length / getStackSize(stack)) * 100)}%)`"
                :progressValue="stack.stack_checked.length / getStackSize(stack)">
            </VocabularyProgressBar>

            <VocabularyProgressBar additionalClasses="progress_done" progressTitle="Richtig" progressText="Falsch"
                :progressValue="((stack.stack_expanded.length + stack.stack_checked.length) - stack.stack_expanded.length) / (stack.stack_expanded.length + stack.stack_checked.length)">
            </VocabularyProgressBar>

            <ButtonRow :show-delete="(stack.stack_checked.length / getStackSize(stack)) != 1"
                @deleteEvent="$emit('removeTraining', stack._id)" deleteButtonText="Löschen" @continueEvent="startTraining"
                :saveButtonText="(stack.stack_checked.length / getStackSize(stack)) == 1 ? 'Training beenden' : 'Fortsetzen'">
            </ButtonRow>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import ButtonRow from "../ButtonRow.vue";
import VocabularyProgressBar from "../VocabularyProgressBar.vue";
import Flags from "../Flags.vue";
import { Stack } from "@/utils/Stack";

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
            if ((this.stack.stack_checked.length / this.getStackSize(this.stack)) == 1) {
                this.$emit('removeTraining', this.stack._id);
                return;
            }

            this.$router.push({ name: 'vocabulary-training', params: { id: this.stack._id } });
        },
        getStackSize(stack: Stack) {
            return stack.stack_checked.length + stack.stack_default.length + stack.stack_expanded.length + stack.stack_training.length;
        }
    }
});
</script>

<style lang="scss" scoped></style>