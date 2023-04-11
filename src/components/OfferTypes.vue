<script lang="ts" setup>

import { ref, defineEmits, defineProps } from 'vue';
import type { Ref } from 'vue';
import type OfferType from '../types/OfferType'

const props = defineProps<{
    auction: boolean | null | undefined
}>()

const offerTypes: Ref<Array<OfferType>> = ref([
    {
        title: 'Все типы',
        auction: null,
    },
    {
        title: 'Прямые продажи',
        auction: false,
    },
    {
        title: 'Аукцион',
        auction: true
    }
])

const emit = defineEmits(['filter']);

const filter = (offerType: OfferType) => {
    emit('filter', {auction: offerType.auction});
}

</script>

<template>
    <ul class="offer-types-list">
        <li class="offer-types-list-item" v-for="(offerType, index) in offerTypes" :key="index">
            <a :class="['offer-types-list-link', {'active' : props.auction === offerType.auction}]" 
                @click="filter(offerType)">
                {{ offerType.title }}
            </a>
        </li>
    </ul>
</template>

<style scoped lang="scss">
.offer-types-list {
    list-style: none;
    display: flex;
    margin: 0;
    padding: 12px;
    background: #F4F5F9;
    border: 1px solid #E0E3EE;
    border-radius: 10px;

    &-item {
        margin-right: 12px;
    }

    &-link {
        text-decoration: none;
        color: #969DC3;
        font-size: 15px;

        &:hover {
            color: #000000;
        }

        &.active {
            color: #2D3B87;
        }
    }
}
</style>