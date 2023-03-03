<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Vokabel Stacks</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <swiper :slides-per-view="1" :space-between="50">
        <swiper-slide v-for="stack in stacks" :key="stack.id">
          <VocabularySlide v-bind="vocabularySlideProps(stack)" @deleteStackFunction="deleteStackFunction(stack.id)"
            @openVocabularyListFunction="openVocabularyListModal">
          </VocabularySlide>
        </swiper-slide>
      </swiper>

      <AddButton @click="openStackAddModal"></AddButton>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">

import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonModal,
  modalController
} from '@ionic/vue';
import { Options, Vue } from 'vue-class-component';

import StackModal from "@/components/models/StackModal.vue";
import VocabularyListModal from '@/components/models/VocabularyListModal.vue';
import AddButton from '@/components/AddButton.vue';
import ButtonRow from '@/components/ButtonRow.vue';
import Flags from '@/components/Flags.vue';
import VocabularySlide from '@/components/slides/VocabularySlide.vue';
import { Stack } from '@/utils/Stack';
import { StackService } from '@/services/Stack.Service';
import { container } from 'tsyringe';
import { Swiper, SwiperSlide } from 'swiper/vue';

import 'swiper/swiper.min.css';

@Options({
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonModal,
    AddButton,
    ButtonRow,
    Flags,
    VocabularySlide,
    Swiper,
    SwiperSlide
  },
})

export default class VocabularyView extends Vue {

  public stacks: Stack[] = new Array<Stack>();
  private stackService: StackService = container.resolve(StackService);

  public vocabularySlideProps(stack: Stack) {
    return {
      vocabularies: stack.stackSize,
      srcFirstLanguage: `flags/${stack.languageA}.svg`,
      srcSecondLanguage: `flags/${stack.languageB}.svg`,
      nameFirstLanguage: stack.stackLanguages[0],
      nameSecondLanguage: stack.stackLanguages[1],
      stack: stack
    }
  }

  private async fetchStacks(): Promise<void> {
    this.stacks = await (await this.stackService.getStacks()).reverse();
  }

  public async mounted(): Promise<void> {
    await this.fetchStacks()
  }

  public async openStackAddModal(): Promise<void> {
    const modal = await modalController.create({
      component: StackModal,
    });

    modal.onDidDismiss().then(() => {
      this.fetchStacks();
    });

    modal.present();
  }

  public async openVocabularyListModal(srcFirstLanguage: string, srcSecondLanguage: string, nameFirstLanguage: string, nameSecondLanguage: string, stack: string): Promise<void> {
    const modal = await modalController.create({
      component: VocabularyListModal,
      componentProps: {
        srcFirstLanguage,
        srcSecondLanguage,
        nameFirstLanguage,
        nameSecondLanguage,
        stack
      }
    });

    modal.present();
  }

  public async deleteStackFunction(stack_id: string): Promise<void> {
    await this.stackService.deleteStack(stack_id);
    await this.fetchStacks();
  }

}
</script>

<style lang="scss" scoped>
ion-header {
  background-image: none;
}


ion-progress-bar {
  width: 90%;
  margin-inline: auto;
}

.swiper {
  height: 25em;
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