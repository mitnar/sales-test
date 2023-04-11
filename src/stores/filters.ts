import { defineStore } from 'pinia'
import type CatalogFiltersType from '../types/CatalogFilters'

export type FiltersStoreType = {
    filters: CatalogFiltersType
}

export const filtersStore = defineStore("procucts", {
  state: () => ({
      filters: {},
  } as FiltersStoreType),
  getters: {
    getFilters(state) {
      return state.filters
    }
  },
  actions: {
    getFiltersFromLocalStorage() {
        let filters = localStorage.getItem('filters');
        this.filters = filters ? JSON.parse(filters) : {
          auction: null,
          search: ''
        }
    },

    saveFilters(filters: CatalogFiltersType) {
        this.filters = {
            ...this.filters,
            ...filters
        }

        localStorage.setItem('filters', JSON.stringify(this.filters));
    }
  },
});
