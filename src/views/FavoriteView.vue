<script lang="ts" setup>
import { setMapStoreSuffix } from 'pinia';
import { onMounted, computed } from 'vue';
import Catalog from '../components/Catalog.vue';
import CatalogHeader from '../components/CatalogHeader.vue'
import { favoriteStore } from "../stores/favorite";
import type CatalogFiltersType from '../types/CatalogFilters'
import { filtersStore } from '../stores/filters'

const storeFavorite = favoriteStore()
const storeFilters = filtersStore()

const favoriteProducts = computed(() => {
  return storeFavorite.items
});

const filterFavoriteProducts = (filter: CatalogFiltersType) => {
    storeFilters.saveFilters(filter);
    storeFavorite.fetchFavoriteProducts();
}

onMounted(() => {
    storeFavorite.fetchFavoriteProducts();
});

</script>

<template> 
    <section class="catalog-products">
        <CatalogHeader class="catalog-header"
                       @filter="filterFavoriteProducts"/>
        <Catalog :items="favoriteProducts"/>
    </section>
</template>

<style scoped>
.catalog-header {
    margin-bottom: 44px;
}
</style>