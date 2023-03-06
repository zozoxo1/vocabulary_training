<template>
    <div class="vocabulary-stack">
        <Flags :src-first-language="srcFirstLanguage" :src-second-language="srcSecondLanguage"
            :name-first-language="nameFirstLanguage" :name-second-language="nameSecondLanguage">
        </Flags>

        <div class="content">
            <div class="actions">
                <p>Vokabel{{ vocabularies == 1 ? '' : 'n' }} im Stack: <b>{{ vocabularies }}</b></p>
                <div>
                    <ion-button :disabled="trainingBegan(stack) || getStackSize(stack) == 0" class="start-training"
                        @click="$emit('startTraining', stack._id)">
                        <ion-icon :icon="playCircleOutline"></ion-icon>
                    </ion-button>
                    <ion-button @click="$emit('stopTraining', stack._id)" :disabled="!trainingBegan(stack)"
                        class="stop-training">
                        <ion-icon :icon="closeCircleOutline"></ion-icon>
                    </ion-button>
                </div>
            </div>

            <ButtonRow
                @continueEvent="$emit('openVocabularyListFunction', srcFirstLanguage, srcSecondLanguage, nameFirstLanguage, nameSecondLanguage, stack, update)"
                @deleteEvent="$emit('deleteStackFunction')" deleteButtonText="Löschen" saveButtonText="Bearbeiten">
            </ButtonRow>
        </div>
    </div>
</template>
  
<script lang="ts">
import { defineComponent } from "vue";
import ButtonRow from '@/components/ButtonRow.vue';
import Flags from '@/components/Flags.vue';
import { closeCircleOutline, playCircleOutline } from "ionicons/icons";
import { Stack } from "@/utils/Stack";

export default defineComponent({
    name: "VocabularySlide",
    components: {
        ButtonRow,
        Flags,
    },
    methods: {
        getStackSize(stack: Stack) {
            return stack.stack_checked.length + stack.stack_default.length + stack.stack_expanded.length + stack.stack_training.length;
        },
        trainingBegan(stack: Stack) {
            return stack.stack_default.length < this.getStackSize(stack)
        }
    },
    props: [
        'vocabularies',
        'srcFirstLanguage',
        'srcSecondLanguage',
        'nameFirstLanguage',
        'nameSecondLanguage',
        'openVocabularyListFunction',
        'deleteStackFunction',
        'stack',
        'update',
        'startTraining',
        'stopTraining'
    ],
    data() {
        return {
            playCircleOutline,
            closeCircleOutline
        }
    }
});
</script>

<style lang="scss" scoped>
.actions {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-inline: 1em;
}

.actions>div ion-button {
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
</style>