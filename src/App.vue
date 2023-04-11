<script setup lang="ts">
import { RouterLink, RouterView} from 'vue-router'
import { onMounted } from 'vue'
import AppHeader from './components/AppHeader.vue'
import {filtersStore} from './stores/filters'
import { favoriteStore } from './stores/favorite';

const storeFilters = filtersStore();
const storeFavorite = favoriteStore();

onMounted(() => {
  storeFilters.getFiltersFromLocalStorage();
  storeFavorite.fetchFavoriteProducts();
}) 

</script>

<template>
  <header class="header">
    <AppHeader/>
  </header>
  <main class="main">
    <RouterView />
  </main>
</template>

<style scoped>
.header {
  margin-bottom: 81px;
}

.main {
  margin-bottom: 40px;
}
</style>
