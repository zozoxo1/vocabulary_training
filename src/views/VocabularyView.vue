<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Vokabel Stacks</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <swiper @slideChange="onSlideChange" :slides-per-view="1" :space-between="50">
        <swiper-slide v-for="stack in stacks" :key="stack._id">
          <VocabularySlide v-bind="vocabularySlideProps(stack)" @startTraining="startTraining"
            @stopTraining="stopTraining" @deleteStackFunction="deleteStackFunction(stack._id)"
            @openVocabularyListFunction="openVocabularyListModal">
          </VocabularySlide>
        </swiper-slide>
      </swiper>

      <h1 class="no-stack center" v-if="stacks.length == 0 && !dataLoading">Kein Stack vorhanden</h1>
      <ion-spinner class="center" v-if="dataLoading"></ion-spinner>

      <AddButton @click="openStackAddModal"></AddButton>

      <slide-dots :size="stacks.length" :selectedIndex="swipeIndex"></slide-dots>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">

import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonModal,
  modalController, IonSpinner, alertController
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
import SlideDots from '@/components/SlideDots.vue';

import 'swiper/swiper.min.css';
import languages from '@/utils/languages.json'

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
    SwiperSlide,
    IonSpinner,
    SlideDots
  },
})

export default class VocabularyView extends Vue {

  public stacks: Stack[] = new Array<Stack>();
  private stackService: StackService = container.resolve(StackService);
  public dataLoading: boolean = true;
  public swipeIndex = 0;

  public getStackSize(stack: Stack) {
    return stack.stack_checked.length + stack.stack_default.length + stack.stack_expanded.length + stack.stack_training.length;
  }

  public vocabularySlideProps(stack: Stack) {
    return {
      vocabularies: this.getStackSize(stack),
      srcFirstLanguage: `flags/${stack.lang_a}.svg`,
      srcSecondLanguage: `flags/${stack.lang_b}.svg`,
      nameFirstLanguage: this.stackLanguages(stack)[0],
      nameSecondLanguage: this.stackLanguages(stack)[1],
      stack: stack,
      update: this.fetchStacks
    }
  }

  public stackLanguages(stack: Stack) {
    let l1 = stack.lang_a
    let l2 = stack.lang_b

    languages.find((language) => {
      if (language.code === stack.lang_a) {
        l1 = language.language
      }

      if (language.code === stack.lang_b) {
        l2 = language.language
      }
    })

    return [l1, l2]
  }

  private async fetchStacks(): Promise<void> {
    this.dataLoading = true;
    this.stacks = await (await this.stackService.getStacks()).reverse();
    this.dataLoading = false;
  }

  public onSlideChange(swiper: any) {
    this.swipeIndex = swiper.realIndex;
  }

  public async mounted(): Promise<void> {
    await this.fetchStacks()
  }

  async beforeUpdate(): Promise<void> {
    await this.fetchStacks()
  }

  public async stopTraining(stack_id: string): Promise<void> {
    const alert = await alertController.create({
      header: 'Willst du das Training wirklich löschen?',
      buttons: [
        {
          text: 'Nein',
          role: 'cancel',
        },
        {
          text: 'Ja',
          role: 'confirm'
        },
      ],
    });

    alert.onDidDismiss().then(async (data) => {
      if (data.role == 'cancel') return;

      if (data.role == 'confirm') {
        await this.stackService.resetTraining(stack_id);
        await this.fetchStacks();
      }
    });

    await alert.present();
  }

  public async startTraining(stack_id: string): Promise<void> {
    const alert = await alertController.create({
      header: 'Anzahl an Vokabeln zum trainieren',
      buttons: [
        {
          text: 'Abbrechen',
          role: 'cancel'
        },
        {
          text: 'Training starten',
          role: 'start'
        }],
      inputs: [
        {
          type: 'number',
          placeholder: 'Anzahl Vokabeln',
          min: 1,
          max: 100,
        },
      ],
    });

    alert.onDidDismiss().then(async (data) => {
      if (data.data.values[0] == undefined || data.data.values[0] == '') return;
      if (data.role == 'cancel') return;

      if (data.role == 'start') {
        await this.stackService.startTraining(stack_id, Number.parseInt(data.data.values[0]));
        this.$router.push(`/training`);
      }
    });

    await alert.present();
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

  public async openVocabularyListModal(srcFirstLanguage: string, srcSecondLanguage: string, nameFirstLanguage: string, nameSecondLanguage: string, stack: Stack, update: any): Promise<void> {
    const modal = await modalController.create({
      component: VocabularyListModal,
      componentProps: {
        srcFirstLanguage,
        srcSecondLanguage,
        nameFirstLanguage,
        nameSecondLanguage,
        stack,
        update
      }
    });

    modal.onDidDismiss().then(() => {
      this.fetchStacks();
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
.center {
  position: absolute;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
}

.no-stack {
  color: var(--color-grey-1)
}

ion-header {
  background-image: none;
}


ion-progress-bar {
  width: 90%;
  margin-inline: auto;
}

.swiper {
  height: 28em;
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