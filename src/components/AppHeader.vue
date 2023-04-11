<script lang="ts" setup>
import { ref } from 'vue';
import type { Ref } from 'vue';
import { RouterLink } from 'vue-router'

interface Link{
  routeName: string,
  text: string,
  class: string
}

  const links: Ref<Array<Link>> = ref([
    { routeName: 'favorite', text: 'Избранное', class: 'favourite'},
    { routeName: 'stock', text: 'Склад', class: 'stock'},
    { routeName: 'deals', text: 'Сделки', class: 'deals'},
  ])

</script>

<template>
    <div class="header">
      <h1 class="visually-hidden">Главная страница сайта продаж.</h1>
      <div class="banner"></div>
      <nav class="main-navigation">
        <ul class="main-navigation-list">
          <li class="main-navigation-list-item" 
            v-for="(link, index) in links" :key="index">
            <RouterLink :to="{name: link.routeName}" 
              :class="[link.class, 'main-navigation-link']">
              {{ link.text }}
            </RouterLink>
          </li>
        </ul>
      </nav>
    </div>
  </template>

<style scoped>
.banner {
    height: 40px;
    background: #E0E3EE;
    border-radius: 0px 0px 10px 10px;
    margin-bottom: 20px;
}

.main-navigation-list {
    list-style: none;
    display: flex;
    margin: 0;
    padding: 0;
    justify-content: flex-end;
    flex-wrap: wrap;
}

.main-navigation-list-item {
    width: 86px;
}

.main-navigation-link {
    text-decoration: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    width: 100%;
    padding: 7px 0;
    box-sizing: border-box;
    font-weight: 500;
    color: #2D3B87;
}

.main-navigation-link.router-link-active {
    background: #F4F5F9;
    border-radius: 10px;  
}

.main-navigation-link::before {
    content: '';
    display: block;
    width: 20px;
    height: 20px;
    background-position: center;
    background-repeat: no-repeat;
    margin-bottom: 7px;
}

.main-navigation-link.favourite::before {
    background-image: url('../assets/images/favourite.svg');
}

.main-navigation-link.stock::before {
    background-image: url('../assets/images/stock.svg');
}

.main-navigation-link.deals::before {
    background-image: url('../assets/images/bag.svg');
}

.main-navigation-link:hover {
  background: #F4F5F9;
  border-radius: 10px;  
  opacity: 70%;
  font-weight: bold;
}

.main-navigation-link:focus {
  background: #F4F5F9;
  border-radius: 10px;  
  opacity: 70%;
  font-weight: bold;
}

@media(max-width: 576px) {
  .main-navigation-list {
    justify-content: center;
  }
}

</style>