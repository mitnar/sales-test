import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import type CatalogFiltersType from '../types/CatalogFilters'
import type CatalogItemType from '../types/CatalogItem'
import { filtersStore } from './filters'
import type RootStateType from '../types/RootState';

export const dealsStore = defineStore("deals", {
  state: () => ({
      items: [],
  } as RootStateType),
  getters: {
    getDeals(state) {
      return state.items
    }
  },
  actions: {
    fetchDeals() {
      try {
        const storeFilters = filtersStore();
        const filters : CatalogFiltersType = storeFilters.filters as CatalogFiltersType

        const data = localStorage.getItem('deals');    
        let deals = data !== null ? JSON.parse(data) : [];
        this.items = deals;
        
        if(filters.auction !== null && filters.auction !== undefined) { 
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
    setDeals(product: CatalogItemType) {        
       this.items.push(product);
       this.items[this.items.length - 1].id = this.items.length; // задаем идентификатор сделки
       localStorage.setItem('deals', JSON.stringify(this.items));
    },
    setPaid(id: number) {
        let deal = this.items.find(i => i.id === id);

        if(deal?.paid === true) {
            return;
        }
        
        deal!.paid = true;
        localStorage.setItem('deals', JSON.stringify(this.items));
    }
  },
});