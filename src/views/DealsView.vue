<script lang="ts" setup>
import { setMapStoreSuffix } from 'pinia';
import { onMounted, computed } from 'vue';
import Catalog from '../components/Catalog.vue';
import CatalogHeader from '../components/CatalogHeader.vue'
import { dealsStore } from "../stores/deals"
import { filtersStore } from '../stores/filters'
import type CatalogFiltersType from '../types/CatalogFilters'

const storeDeals = dealsStore()
const storeFilters = filtersStore()

const deals = computed(() => {
  return storeDeals.items
});

const filterDeals = (filter: CatalogFiltersType) => {
    storeFilters.saveFilters(filter);
    storeDeals.fetchDeals();
}

onMounted(() => {
    storeDeals.fetchDeals();
});

</script>

<template> 
    <h1 class="visually-hidden">Страница сделок.</h1>
    <section class="catalog-products">
        <CatalogHeader class="catalog-header"
                       @filter="filterDeals"/>
        <Catalog :items="deals"/>
    </section>
</template>

<style scoped>
.catalog-header {
    margin-bottom: 44px;
}
</style>