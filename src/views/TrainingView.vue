<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Training</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <swiper @slideChange="onSlideChange" :slides-per-view="1" :space-between="50">
        <swiper-slide v-for="stack in stacks" :key="stack.id">
          <TrainingSlide v-bind="trainingSlideProps(stack)" @removeTraining="removeTraining"></TrainingSlide>
        </swiper-slide>
      </swiper>

      <h1 class="no-training center" v-if="stacks.length == 0 && !dataLoading">Kein Training vorhanden</h1>
      <ion-spinner class="center" v-if="dataLoading"></ion-spinner>

      <slide-dots :size="stacks.length" :selectedIndex="swipeIndex"></slide-dots>
    </ion-content>
  </ion-page>
</template>

<!-- Stammblock: alle vokabeln am anfang -->
<!-- Trainingsstapel: bei jedem trainingsstart werden n vokabeln auf stammblock hier her gepackt -->
<!-- in welche richtung will er trainieren -->
<!-- Erweiterter trainingsstapel: wenn man eine vokabel nicht weiß -->
<!-- geprüft stapel: man hat die vokabel richtig -->

<script lang="ts">
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonModal, IonProgressBar, IonSpinner } from '@ionic/vue';
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
import SlideDots from '@/components/SlideDots.vue';

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
    SwiperSlide,
    IonSpinner,
    SlideDots
  },
})

export default class TrainingView extends Vue {

  public stacks: Stack[] = new Array<Stack>();
  private stackService: StackService = container.resolve(StackService);
  public dataLoading: boolean = true;
  public swipeIndex = 0;

  public async removeTraining(stack_id: string): Promise<void> {
    await this.stackService.resetTraining(stack_id);
    await this.fetchTrainingStacks();
  }

  public onSlideChange(swiper: any) {
    this.swipeIndex = swiper.realIndex;
  }

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
    this.dataLoading = true;
    this.stacks = await (await this.stackService.getTrainingStacks()).reverse();
    this.dataLoading = false;
  }

  public async mounted(): Promise<void> {
    await this.fetchTrainingStacks()
  }

  async beforeUpdate(): Promise<void> {
    await this.fetchTrainingStacks()
  }

}
</script>

<style lang="scss" scoped>
.center {
  position: absolute;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
}

.no-training {
  color: var(--color-grey-1)
}

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