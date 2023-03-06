<template>
    <div class="slide-dots">
        <div :class="(selectedIndex == index - 1) ? 'dot selected' : 'dot'" v-for="index in size" :key="index"></div>
    </div>
</template>
  
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "SlideDots",
    components: {
    },
    props: [
        'size',
        'selectedIndex',
    ],
});
</script>

<style lang="scss" scoped>
.slide-dots {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5em 0;
}

.dot {
    width: 0.5em;
    height: 0.5em;
    border-radius: 50%;
    background: var(--clr-dark-light-2);
    margin: 0 0.3em;
}

.dot.selected {
    background: var(--clr-dark-light);
}
</style>