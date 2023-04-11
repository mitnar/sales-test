import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import type CatalogFiltersType from '../types/CatalogFilters'
import type CatalogItemType from '../types/CatalogItem'
import { filtersStore } from './filters';
import type RootStateType from '../types/RootState'

export const favoriteStore = defineStore("favorite", {
  state: () => ({
      items: [] ,
  } as RootStateType),
  getters: {
    getProducts(state) {
      return state.items
    }
  },
  actions: {
    fetchFavoriteProducts() {
      try {

        const storeFilters = filtersStore();
        const filters : CatalogFiltersType = storeFilters.filters as CatalogFiltersType

        const data = localStorage.getItem('favoriteItems');    
        let productsArray = data !== null ? JSON.parse(data) : [];
        this.items = productsArray;
        
        if(typeof filters.auction === 'boolean') { 
            this.items = this.items.filter(p => p.auction === filters.auction);
        }

        if(filters.search && filters.search.length > 0) { 
          this.items = this.items.filter(p => p.title.indexOf(filters.search as string) > - 1);
        }

    }
        catch (error) {
            alert(error)
            console.log(error)
        }
    },
    setFavoriteProducts(product: CatalogItemType) {        
        const index = this.items.findIndex(p => p.id === product.id);
        
        if(index > -1) {
            this.items.splice(index, 1);
        } else {
            this.items.push(product);
        }

        localStorage.setItem('favoriteItems', JSON.stringify(this.items));
    }
  },
});