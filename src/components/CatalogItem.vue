<script lang="ts" setup>
import { getInnerRange, isTemplateNode } from '@vue/compiler-core';
import { computed, onMounted, ref } from 'vue';
import type CatalogItemType from '../types/CatalogItem';
import { favoriteStore } from "../stores/favorite";
import { dealsStore } from "../stores/deals";
import FavoriteIcon from './icons/IconFavorite.vue';

const props = defineProps<{
  item: CatalogItemType
}>()

const storeFavorite = favoriteStore();
const storeDeals = dealsStore();

const offerType = computed(() => props.item.auction ? 'Аукцион' : 'Прмяые продажи')

const inFavorite = computed(() => {
    return storeFavorite.items.find(p => p.id === props.item.id) !== undefined
})

const isPaid = computed(() => {
    return storeDeals.items.find(p => p.id === props.item.id && p.paid === true) !== undefined
});

const favoriteBtnAction = () => {
    storeFavorite.setFavoriteProducts(props.item);
} 

const addToDeals = () => {
    storeDeals.setDeals(props.item);
}

const setPaid = () => {
    storeDeals.setPaid(props.item.id);
}

</script>

<template>
    <li class="product-card">
        <div class="product-card-main">
            <div class="product-card-main-image">
              <img class="product-card-image"
                    :src="item.imageLink"
                    alt="Пиломатериалы брус доска"
                    width="256"
                    height="256"
                >
            </div>
            <div class="product-card-main-info">
              <p class="product-offer-type">{{ offerType }}</p>  
              <h2 class="product-card-title">{{ item.title }}</h2>
              <div class="product-card-address">
                Санкт-Петербург, Красное село
              </div>
              <div class="product-card-seller-wrapper">
                <span class="product-card-seller">Продавец </span>
                <span class="product-card-seeller-title">{{ item.seller }}</span>
              </div>
              <div class="product-card-type-wrapper">
                <div class="product-card-type">Вид товара</div>
                <div class="product-card-type-title">{{ item.type }}</div>
              </div>
              <p class="product-card-description">
                {{ item.description }}
              </p>   
            </div> 
          </div>
          <div class="product-card-price">
            <div class="product-card-total-price">33000 ₽</div>
            <div class="product-card-quantity-wrapper"> 
              <span class="product-card-quantity">Количество</span>
              <span>3 шт.</span>
            </div> 
            <div class="product-card-single-price-wrapper"> 
              <span class="product-card-single-price">Стоимость за штуку</span>
              <span>11000 ₽</span>
            </div> 
            <div class="product-card-actions">
              <button type="button"
                      :class="['product-card-btn pay', {'paid': isPaid}] "
                      @click="setPaid"
                      v-if="$route.name === 'deals'">
                      <template v-if="isPaid">Оплачено</template>
                      <template v-else>Оплатить</template>
              </button>  
              <button type="button" 
                      class="product-card-btn add-to-deals"
                      @click="addToDeals"
                      v-else>
                Добавить в сделки 
              </button>
              <button type="button" 
                      :class="['product-card-btn add-to-favourite', {'favourite': inFavorite}]"
                      @click="favoriteBtnAction">
                <span class="visually-hidden">Добавить в избранное</span>
                <FavoriteIcon class="add-to-favorite-icon"/>
              </button>
            </div>
          </div>
    </li>
</template>

<style scoped>

.product-card {
    border: 1px solid #E0E3EE;
    border-radius: 20px;
    display: grid;
    grid-template-columns: 852px 1fr;
    max-width: 1166px;
}

.product-card:not(:last-child) {
    margin-bottom: 40px;
}

.product-card-main {
    display: flex;
    padding: 20px;
}

.product-card-main-image {
    margin-right: 20px;
    margin-bottom: 12px;
}

.product-card-image {
    border-radius: 20px;
}

.product-offer-type {
    color: #969DC3;
    margin: 0 0 15.5px 0;
    padding: 0;
}

.product-card-title {
    height: 38px;
    margin: 0;
    padding: 0;
    margin-bottom: 12px;
    font-weight: 500;
    font-size: 15px;
    line-height: 125%;
    color: #2D3B87;
}

.product-card-address {
    background: #F4F5F9;
    border-radius: 5px;
    padding: 5px 8px 5px 10.5px;
    box-sizing: border-box;
    width: max-content;
    margin-bottom: 12px;
    color: #616CA5;
    display: flex;
    justify-content: center;
}

.product-card-address::before {
    content: '';
    width: 15px;
    height: 15px;
    background: url('../assets/images/geo.svg') no-repeat center;
    display: inline-block;
    margin-right: 4px;
}

.product-card-seller-wrapper {
    margin-bottom: 12px;
}

.product-card-seller {
    color: #969DC3;
}

.product-card-seller-title {
    color: #2D3B87;
}

.product-card-type-wrapper {
    background: #F4F5F9;
    border-radius: 10px;
    width: max-content;
    box-sizing: border-box;
    padding: 8px;
    margin-bottom: 12px;
}

.product-card-type {
    margin-bottom: 6px;
    color: #969DC3;
}

.product-card-type-title {
    color: #616CA5;
}

.product-card-description {
    margin: 0;
    padding: 0;
    line-height: 150%;
    color: #2D3B87;
}

.product-card-price {
    border: 1px solid #E0E3EE;
    border-radius: 20px;
    padding: 20px;
    display: flex;
    flex-direction: column;
}

.product-card-total-price {
    margin-bottom: 13.5px;
    font-size: 20px;
    font-weight: 500;
    color: #2D3B87;
}

.product-card-quantity-wrapper, .product-card-single-price-wrapper {
    display: flex;
    justify-content: space-between;
}

.product-card-quantity-wrapper {
    margin-bottom: 11px;
}

.product-card-quantity, .product-card-single-price {
    color: #969DC3;
}

.product-card-actions {
    margin-top: auto;
    display: flex;
    justify-content: space-between;
}

.product-card-btn {
    height: 50px;
    background-color: #F4F5F9;
    border-radius: 10px;
    outline: none;
    border: none;
    font-weight: 500;
    font-size: 15px;
}

 .product-card-btn:hover {
    opacity: 80%;
}

.product-card-btn:active {
    opacity: 50%;
}

.product-card-btn:focus {
    outline: solid 2px #ADD8E6;
}

.product-card-btn.add-to-deals, .product-card-btn.pay {
    width: 212px;
}

.product-card-btn.add-to-favourite {
    width: 50px;
}

.product-card-btn.favourite {
    background-color: #2D3B87;
    width: 50px;
}

.product-card-btn.favourite .add-to-favorite-icon {
    fill: #E5E5E5;
}

.product-card-btn.pay {
    background: #69C57F;
    color: #FFFFFF;
}

.product-card-btn.paid {
    background: #FFFFFF;
    border: 1px solid #E0E3EE;
    color: #969DC3;
}

@media(max-width: 1200px) {
    .product-card {
        grid-template-columns: 1fr;
    }

    .product-card-actions {
        margin-top: 40px;
    }
}

@media(max-width: 576px) { 
    .product-card-main {
        display: block;
        text-align: center;
    }

    .product-card-main-image {
        margin-right: 0;
    }

    .product-card-type-wrapper {
        width: 100%;
    }

    .product-card-address {
        width: 100%;
    }
}

</style>