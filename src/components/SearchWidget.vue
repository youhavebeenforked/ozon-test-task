<template>
  <div class="search">
    <form @submit="onSubmit">
      <input
        class="search-input"
        @input="debounced"
        v-model="search"
      />
    </form>
    <ul
      :style="cssHeight"
      :class="[expanded ? 'search-results' : 'search-results-hidden']"
    >
      <li
        class="search-element"
        :key="key"
        @click="$modal.show(result)"
        v-for="(result, key) in slicedResults"
      >{{ result.name }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { debounce } from '@/helpers';
import { Character, Characters } from "@/global"

@Component
export default class SearchWidget extends Vue {
  private search: string = '';
  private autocomplete = [] as Array<Character>;
  private characters = {} as Characters;
  private expanded: boolean = false;

  debounced = debounce(this.onChange, 500);

  async onChange() {
    try {
      const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${this.search}`);
      const results = await response.json();
      this.characters = results;
      this.autocomplete = results.results;
    } catch {
      this.autocomplete = [];
    }

    if (!this.search || !this.autocomplete) {
      this.autocomplete = [];
      this.expanded = false;
    } else {
      this.expanded = true;
    }
  }

  onSubmit(e: MouseEvent) {
    e.preventDefault();
    this.$emit('search', this.characters);
  }

  get slicedResults() {
    if (this.autocomplete) {
      return this.autocomplete.slice(0, 5);
    }
  }

  get cssHeight() {
    if (this.slicedResults) {
      return 'height: ' + 34 * this.slicedResults.length + 'px';
    } 
  }
}
</script>

<style scoped>
.search {
  width: 35%;
}
.search-input {
  width: 100%;
  height: 30px;
  outline: none;
}
.search-element {
  color: #eaeaea;
  cursor: pointer;
  margin: 5px 0px;
  padding: 3px 5px;
  border-radius: 2px;
  background-color: #5ca4a9;
}
.search-results {
  width: 100%;
  margin: 0px;
  padding: 0px;
  opacity: 1;
  overflow: hidden;
  transition: 0.2s ease-in;
  list-style-type: none;
}
.search-results-hidden {
  height: 34px;
  overflow: hidden;
  transition: 0.2s ease-in;
}
</style>
