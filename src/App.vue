<template>
  <div class="app">
    <MainPage />
    <app-modal />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MainPage from './components/MainPage.vue';
import Modal from '@/plugins/modal';

Vue.use(Modal);
@Component({
  components: {
    MainPage
  }
})
export default class App extends Vue {}
</script>

<style>
.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
body {
  margin: 0;
  background-color: #F4F1BB;
}
</style>
