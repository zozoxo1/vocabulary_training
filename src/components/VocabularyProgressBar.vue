<template>
    <div class="bar">
        <div class="progress_title">
            <p>{{ progressTitle }}</p>
            <p>{{ progressText }}</p>
        </div>
        <ion-progress-bar :class="additionalClasses" :value="progressValue"></ion-progress-bar>
    </div>
</template>
  
<script lang="ts">
import { defineComponent } from "vue";
import { IonProgressBar } from "@ionic/vue";

export default defineComponent({
    name: "AddButton",
    components: {
        IonProgressBar
    },
    props: ['progressTitle', 'progressText', 'progressValue', 'additionalClasses']
});
</script>

<style lang="scss" scoped>
.bar {
    margin-bottom: 0.8em;
}

.progress_done {
    --progress-background: green;
    --background: rgba(255, 0, 0, 0.5);
}

.progress_title {
    display: flex;
    justify-content: space-between;
    margin-inline: 1em;
}

.progress_title+ion-progress-bar {
    width: 90%;
    margin-inline: auto;
}
</style>