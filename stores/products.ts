import { defineStore } from 'pinia';
import { type Product } from '@/types';

export const useProductStore = defineStore('products', {
  state: () => ({
    products: [] as Product[],
    loading: false,
    error: null as string | null,
    
    nameFilter: '',
    categoryFilter: [] as string[],
    startDate: null as string | null,
    endDate: null as string | null
  }),
  
  getters: {
    filteredProducts: (state) => {
      return state.products.filter(product => {
        const nameMatch = state.nameFilter 
          ? product.name.toLowerCase().includes(state.nameFilter.toLowerCase())
          : true;
        
        const categoryMatch = state.categoryFilter.length > 0 
          ? state.categoryFilter.includes(product.category)
          : true;
        
        let dateMatch = true;
        if (state.startDate || state.endDate) {
          const productDate = new Date(product.date_created);
          
          if (state.startDate) {
            const startDate = new Date(state.startDate);
            if (productDate < startDate) {
              dateMatch = false;
            }
          }
          
          if (state.endDate) {
            const endDate = new Date(state.endDate);
            if (productDate > endDate) {
              dateMatch = false;
            }
          }
        }
        
        return nameMatch && categoryMatch && dateMatch;
      });
    },
    
    categories: (state) => {
      const categoriesSet = new Set<string>();
      state.products.forEach(product => categoriesSet.add(product.category));
      return Array.from(categoriesSet);
    }
  },
  
  actions: {
    async fetchProducts() {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await fetch('/data/products.json');
        if (!response.ok) {
          throw new Error('Ошибка при загрузке продуктов');
        }
        
        this.products = await response.json() as Product[];
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Неизвестная ошибка';
        console.error('Error fetching products:', error);
      } finally {
        this.loading = false;
      }
    },
    
    setNameFilter(name: string) {
      this.nameFilter = name;
    },
    
    setCategoryFilter(categories: string[]) {
      this.categoryFilter = categories;
    },
    
    setDateRange(startDate: string | null, endDate: string | null) {
      this.startDate = startDate;
      this.endDate = endDate;
    },
    
    clearFilters() {
      this.nameFilter = '';
      this.categoryFilter = [];
      this.startDate = null;
      this.endDate = null;
    }
  }
}); 