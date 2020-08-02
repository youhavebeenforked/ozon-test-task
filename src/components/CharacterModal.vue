<template>
  <transition
    v-if="visible"
    name="modal-fade"
  >
    <div class="modal-backdrop">
      <div class="modal">
        <div
          v-if="character.episode.name || character.location.name"
          class="modal-body"
        >
          <img :src="character.image" />
          <div>
            <div>Name: {{ character.name }}</div>
            <div>Species: {{ character.species }}</div>
            <div>Gender: {{ character.gender }}</div>
            <div>Origin: {{ character.origin.name }}</div>
            <div>First episode: {{ `${character.episode.episode} (${character.episode.name})` }}</div>
            <div>Status: {{ character.status }}</div>
            <div>Location name: {{ character.location.name }}</div>
            <div>Location dimension: {{ character.location.dimension }}</div>
            <div>Location type: {{ character.location.type }}</div>
          </div>
        </div>

        <div
          class="modal-loading"
          v-else
        >Loading</div>

        <footer class="modal-footer">
          <button
            type="button"
            class="btn btn-green"
            @click="hide"
            aria-label="Close modal"
          >Close</button>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Modal from '@/plugins/modal';
import { Character } from '@/global';

@Component
export default class CharacterModal extends Vue {
  private character = {} as Character;
  private visible: boolean = false;
  hide() {
    this.visible = false;
  }
  show() {
    this.visible = true;
  }

  async getExtraInfo() {
    const storedCharacterName = localStorage.getItem(this.character.name);
    if (storedCharacterName) {
      const extraInfo = JSON.parse(storedCharacterName);
      this.character.episode = extraInfo.episode;
      this.character.location = extraInfo.location;
    } else {
      try {
        // @ts-ignore
        const [episode, location] = await Promise.allSettled([
          fetch(this.character.episode[0]),
          fetch(this.character.location.url)
        ]);
        // @ts-ignore
        this.character.episode = await episode.value.json();
        // @ts-ignore
        this.character.location = await location.value.json();
        const extraInfo = {
          episode: this.character.episode,
          location: this.character.location
        };
        localStorage.setItem(this.character.name, JSON.stringify(extraInfo));
      } catch (error) {
        console.log(error);
      }
    }
  }

  beforeMount() {
    Modal.EventBus.$on('show', params => {
      this.character = params;
      this.show();
      this.getExtraInfo();
    });
  }
}
</script>

<style scoped>
.btn {
  padding: 8px 16px;
  border-radius: 3px;
  font-size: 14px;
  cursor: pointer;
}

.modal-loading {
  margin: 10px;
  text-align: center;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  display: flex;
  flex-direction: column;
  max-width: 320px;
}

.modal-header,
.modal-footer {
  padding: 15px;
  display: flex;
}

.modal-header {
  border-bottom: 1px solid #eeeeee;
  color: #9bc1bc;
  justify-content: space-between;
}

.modal-footer {
  border-top: 1px solid #eeeeee;
  justify-content: flex-end;
}

.modal-body {
  position: relative;
  padding: 20px 10px;
}

.btn-close {
  border: none;
  font-size: 20px;
  padding: 20px;
  cursor: pointer;
  font-weight: bold;
  color: #9bc1bc;
  background: transparent;
}

.btn {
  color: white;
  background: #4aae9b;
  border: 1px solid #4aae9b;
  border-radius: 2px;
}

.modal-fade-enter,
.modal-fade-leave-active {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}
</style>
