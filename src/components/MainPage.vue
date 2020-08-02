<template>
  <div class="wrapper">
    <SearchWidget
      :list="characters.results"
      v-on:search="showResults($event)"
    />
    <div v-if="characters.info">
      <div class="characters">
        <div
          class="character-card"
          :key="character.id"
          @click="$modal.show(character)"
          v-for="character in characters.results"
        >
          <img
            class="character-card-img"
            :src="character.image"
          />
          <div class="character-card-description">
            <div>Name: {{ character.name }}</div>
            <div>Species: {{ character.species }}</div>
            <div>Gender: {{ character.gender }}</div>
            <div>Origin: {{ character.origin.name }}</div>
            <div class="character-card-status">
              Status: {{ character.status }}
              <Skull v-if="character.status == 'Dead'" />
              <Sun v-if="character.status == 'Alive'" />
            </div>
          </div>
        </div>
      </div>
      <div class="character-buttons">
        <div
          @click="goToPrev"
          :class="[characters.info.prev ? 'character-page-active' : 'character-page-grey']"
        >Previous Page</div>
        <div
          @click="goToNext"
          :class="[characters.info.next ? 'character-page-active' : 'character-page-grey']"
        >Next Page</div>
      </div>
    </div>
    <div v-else>Loading</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import SearchWidget from '@/components/SearchWidget.vue';
import Skull from '@/assets/Skull.vue';
import Sun from '@/assets/Sun.vue';
import { Characters } from "@/global"

@Component({ components: { SearchWidget, Skull, Sun } })
export default class MainPage extends Vue {
  private characters = {} as Characters 

  async getCharacters() {
    try {
      const response = await fetch('https://rickandmortyapi.com/api/character/');
      this.characters = await response.json();
    } catch {
      alert('Что-то пошло не так')
    }
  }

  showResults(characters = {} as Characters) {
    this.characters = characters;
  }

  async goToNext() {
    try {
      // @ts-ignore
      const response = await fetch(this.characters.info.next);
      this.characters = await response.json();
    } catch {
      alert('Что-то пошло не так')
    }
  }

  async goToPrev() {
    try {
      // @ts-ignore
      const response = await fetch(this.characters.info.prev);
      this.characters = await response.json();
    } catch {
      alert('Что-то пошло не так')
    }
  }

  mounted() {
    this.getCharacters();
  }
}
</script>

<style scoped>
.wrapper {
  padding: 50px;
}
.characters {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.character-card {
  width: 48%;
  color: #eaeaea;
  margin: 20px 0;
  cursor: pointer;
  display: flex;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  background-color: #ed6a5a;
}
.character-card-img {
  width: 40%;
}
.character-card-description {
  padding: 10px;
}
.character-card-status {
  display: flex;
  align-items: center;
}
.character-buttons {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.character-page-active {
  cursor: pointer;
  padding: 10px;
  background-color: #5ca4a9;
}
.character-page-grey {
  padding: 10px;
  background-color: #e6ebe0;
}
</style>
