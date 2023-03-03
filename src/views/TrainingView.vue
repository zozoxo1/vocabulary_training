<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Training</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <swiper :slides-per-view="1" :space-between="50">
        <swiper-slide v-for="stack in stacks" :key="stack.id">
          <TrainingSlide v-bind="trainingSlideProps(stack)"></TrainingSlide>
        </swiper-slide>
      </swiper>

      <AddButton></AddButton>
    </ion-content>
  </ion-page>
</template>

<!-- Stammblock: alle vokabeln am anfang -->
<!-- Trainingsstapel: bei jedem trainingsstart werden n vokabeln auf stammblock hier her gepackt -->
<!-- in welche richtung will er trainieren -->
<!-- Erweiterter trainingsstapel: wenn man eine vokabel nicht weiß -->
<!-- geprüft stapel: man hat die vokabel richtig -->

<script lang="ts">
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonModal, IonProgressBar } from '@ionic/vue';
import { ref } from 'vue';
import { Options, Vue } from 'vue-class-component';
import AddButton from '@/components/AddButton.vue';
import ButtonRow from '@/components/ButtonRow.vue';
import Flags from '@/components/Flags.vue';
import VocabularyProgressBar from '@/components/VocabularyProgressBar.vue';
import { Stack } from '@/utils/Stack';
import { StackService } from '@/services/Stack.Service';
import { container } from 'tsyringe';
import TrainingSlide from '@/components/slides/TrainingSlide.vue';
import { Swiper, SwiperSlide } from 'swiper/vue';

import 'swiper/swiper.min.css';

@Options({
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonProgressBar,
    IonModal,
    AddButton,
    ButtonRow,
    Flags,
    VocabularyProgressBar,
    TrainingSlide,
    Swiper,
    SwiperSlide
  },
})

export default class TrainingView extends Vue {

  public stacks: Stack[] = new Array<Stack>();
  private stackService: StackService = container.resolve(StackService);

  public trainingSlideProps(stack: Stack) {
    return {
      srcFirstLanguage: `flags/${stack.languageA}.svg`,
      srcSecondLanguage: `flags/${stack.languageB}.svg`,
      nameFirstLanguage: stack.stackLanguages[0],
      nameSecondLanguage: stack.stackLanguages[1],
      stack: stack
    }
  }

  private async fetchTrainingStacks(): Promise<void> {
    this.stacks = await (await this.stackService.getTrainingStacks()).reverse();
  }

  public async mounted(): Promise<void> {
    await this.fetchTrainingStacks()
  }

}
</script>

<style lang="scss" scoped>
.swiper {
  height: 35em;
  top: 50%;
  translate: 0 -50%;
  text-align: center;
}

.swiper-slide {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>