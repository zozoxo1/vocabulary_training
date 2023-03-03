<template>
    <div class="vocabulary-stack">
        <Flags :src-first-language="srcFirstLanguage" :src-second-language="srcSecondLanguage"
            :name-first-language="nameFirstLanguage" :name-second-language="nameSecondLanguage">
        </Flags>

        <div class="content">
            <p>{{ vocabularies }} Vokabel{{ vocabularies == 1 ? '' : 'n' }} im Stack</p>

            <ButtonRow
                @continueEvent="$emit('openVocabularyListFunction', srcFirstLanguage, srcSecondLanguage, nameFirstLanguage, nameSecondLanguage, stack)"
                @deleteEvent="$emit('deleteStackFunction')" deleteButtonText="Löschen" saveButtonText="Hinzufügen">
            </ButtonRow>
        </div>
    </div>
</template>
  
<script lang="ts">
import { defineComponent } from "vue";
import ButtonRow from '@/components/ButtonRow.vue';
import Flags from '@/components/Flags.vue';

export default defineComponent({
    name: "VocabularySlide",
    components: {
        ButtonRow,
        Flags
    },
    props: [
        'vocabularies',
        'srcFirstLanguage',
        'srcSecondLanguage',
        'nameFirstLanguage',
        'nameSecondLanguage',
        'openVocabularyListFunction',
        'deleteStackFunction',
        'stack'
    ],
});
</script>

<style lang="scss" scoped>
.vocabulary-stack {
    background: var(--color-tab-bar);
    height: 90%;
    width: 90%;
    border-radius: 2em;
    color: var(--color-contrast);
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
}
</style>