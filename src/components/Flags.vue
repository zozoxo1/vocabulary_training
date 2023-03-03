<template>
    <div class="flags">
        <div>
            <img class="flag" :src="require(`@/assets/${srcFirstLanguage}`)">
            <p>{{ nameFirstLanguage }}</p>
        </div>
        <div>
            <p>&hArr;</p>
        </div>
        <div>
            <img class="flag" :src="require(`@/assets/${srcSecondLanguage}`)">
            <p>{{ nameSecondLanguage }}</p>
        </div>
    </div>
</template>
  
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "Flags",
    props: ['srcFirstLanguage', 'srcSecondLanguage', 'nameFirstLanguage', 'nameSecondLanguage']
});
</script>

<style lang="scss" scoped>
.flags {
    display: flex;
    height: 10em;
    justify-content: space-evenly;
    align-items: center;
}

.flags div:nth-child(1),
.flags div:nth-child(3) {
    width: 40%;
}

.flags div:nth-child(1) p,
.flags div:nth-child(3) p {
    padding-inline: 0.3em;
    box-sizing: border-box;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 1rem;
}

.flags div:nth-child(2) {
    width: 20%;
    font-size: 2.5rem;
    margin-top: -0.55em;
    color: var(--color-contrast);
}

.flags .flag {
    height: 55px;
}

.flags span+p {
    margin-top: 2em;
}
</style>