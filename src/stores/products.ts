import { defineStore } from 'pinia'
import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'
import type CatalogFiltersType from '../types/CatalogFilters'
import type CatalogItemType from '../types/CatalogItem'
import { filtersStore } from './filters';
import type RootStateType from '../types/RootState'

export const productsStore = defineStore("products", {
  state: () => ({
      items: []
  } as RootStateType),
  getters: {
    getProducts(state) {
      return state.items
    }
  },
  actions: {
    async fetchProducts() {
      try {
          const storeFilters = filtersStore();
          const filters : CatalogFiltersType = storeFilters.filters

          const data = await axios.get('products.json', { filters } as AxiosRequestConfig)
          this.items = data.data;
          
          // фильтрация должна происходить на бекенде
          // но поскольку бекенда нету, делаем ее на фронтенде
          if(filters.auction) { 
            this.items = this.items.filter(p => p.auction === filters.auction);
          }

          if(filters.search && filters.search.length > 0) { 
            this.items = this.items.filter(p => p.title.indexOf(filters.search as string) > -1);
          }
        }
        catch (error) {
          alert(error)
          console.log(error)
      }
    }
  },
});
