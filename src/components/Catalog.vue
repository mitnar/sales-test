<script lang="ts" setup>
import { setMapStoreSuffix } from 'pinia';
import CatalogItem from './CatalogItem.vue';
import type CatalogItemType from '../types/CatalogItem';

defineProps<{
  items: Array<CatalogItemType>  
}>()

</script>

<template>
    <ul class="product-list">
        <CatalogItem v-for="(item, index) in items"
                    :item="item"
                    :key="index"/>
    </ul>
</template>

<style scoped>
.product-list {
    list-style: none;
    margin: 0;
    padding: 0;
}

</style>