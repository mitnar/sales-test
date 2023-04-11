<script lang="ts" setup>
import { setMapStoreSuffix } from 'pinia';
import { onMounted, computed } from 'vue';
import Catalog from '../components/Catalog.vue';
import { productsStore } from "../stores/products";
import CatalogHeader from '../components/CatalogHeader.vue'
import type CatalogFiltersType from '../types/CatalogFilters';
import { filtersStore } from '../stores/filters';

const storeProducts = productsStore();
const storeFilters = filtersStore();

const products = computed(() => {
  return storeProducts.items
});

onMounted(() => {
  storeProducts.fetchProducts();
});

const filterProducts = (filter: CatalogFiltersType) => {
    storeFilters.saveFilters(filter);
    storeProducts.fetchProducts();
}

</script>

<template> 
    <section class="catalog-products">
        <CatalogHeader class="catalog-header"
                       @filter="filterProducts"/>
        <Catalog :items="products"/>
    </section>
</template>

<style scoped>
.catalog-header {
    margin-bottom: 44px;
}
</style>