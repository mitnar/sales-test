<script lang="ts" setup>
import OfferTypes from './OfferTypes.vue';
import { defineEmits, onMounted } from 'vue'
import Search from './Search.vue';
import { filtersStore } from '../stores/filters';

const emit = defineEmits(['filter'])
const store = filtersStore();

</script>

<template>
    <header class="catalog-header">
        <OfferTypes :auction="store.filters.auction"
                    @filter="filter => emit('filter', filter)" 
                    class="offer-types"/>   
        <Search :search="store.filters.search"
                @filter="filter => emit('filter', filter)"/>    
    </header>
</template>

<style scoped>
.catalog-header {
    display: flex;
    justify-content: space-between;
}

@media(max-width: 576px) {
    .catalog-header {
        display: block;
    }

    .offer-types {
        margin-bottom: 20px;
    }
}
</style>

