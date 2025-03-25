<template>
  <div class="product-table-container">
    <div v-if="loading" class="loading">
      Загрузка...
    </div>
    
    <div v-else-if="error" class="error">
      {{ error }}
    </div>
    
    <div v-else>
      <div class="filters">
        <h3>Фильтры</h3>
        
        <div class="filter-group">
          <label for="name-filter">Название продукта:</label>
          <input 
            id="name-filter" 
            class="filter-input"
            v-model="nameFilter" 
            placeholder="Например, мокко"
            @input="handleNameFilterChange"
          />
        </div>
        
        <div class="filter-group">
          <label>Категория:</label>
          <div class="category-checkboxes">
            <div v-for="category in categories" :key="category" class="category-item">
              <input 
                type="checkbox" 
                :id="category" 
                :value="category" 
                class="filter-checkbox"
                v-model="selectedCategories"
                @change="handleCategoryChange"
              />
              <label :for="category" class="custom-checkbox"></label>
              <span>{{ category }}</span>
            </div>
          </div>
        </div>
        
        <div class="filter-group date-filter">
          <label>Дата создания:</label>
          <div class="date-inputs">
            <div>
              <label for="start-date">От:</label>
              <input 
                id="start-date" 
                type="date" 
                v-model="startDateFilter"
                @input="handleDateFilterChange"
              />
            </div>
            
            <div>
              <label for="end-date">До:</label>
              <input 
                id="end-date" 
                type="date" 
                v-model="endDateFilter"
                @input="handleDateFilterChange"
              />
            </div>
          </div>
        </div>
        
        <button class="clear-filters" @click="clearFilters">Сбросить фильтры</button>
      </div>
      
      <div class="table-wrapper">
        <table class="products-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Название</th>
              <th>Категория</th>
              <th>Цена</th>
              <th>Описание</th>
              <th>Статус</th>
              <th>Дата создания</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in filteredProducts" :key="product.id">
              <td>{{ product.id }}</td>
              <td>{{ product.name }}</td>
              <td>{{ product.category }}</td>
              <td>{{ product.price }} ₽</td>
              <td>{{ product.description }}</td>
              <td>{{ product.status }}</td>
              <td>{{ formatDate(product.date_created) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useProductStore } from '@/stores/products';

const productStore = useProductStore();
const loading = computed(() => productStore.loading);
const error = computed(() => productStore.error);
const filteredProducts = computed(() => productStore.filteredProducts);
const categories = computed(() => productStore.categories);

const nameFilter = ref('');
const selectedCategories = ref<string[]>([]);
const startDateFilter = ref('');
const endDateFilter = ref('');

onMounted(async () => {
  await productStore.fetchProducts();
});

const handleNameFilterChange = () => {
  productStore.setNameFilter(nameFilter.value);
};

const handleCategoryChange = () => {
  productStore.setCategoryFilter(selectedCategories.value);
};

const handleDateFilterChange = () => {
  productStore.setDateRange(
    startDateFilter.value || null,
    endDateFilter.value || null
  );
};

const clearFilters = () => {
  nameFilter.value = '';
  selectedCategories.value = [];
  startDateFilter.value = '';
  endDateFilter.value = '';
  productStore.clearFilters();
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};
</script>

<style lang="scss" scoped>
.product-table-container {
  margin: 0 auto;
  max-width: 100%;
  padding: 20px;
  background-color: #f8f3ff;
}

.loading, .error {
  text-align: center;
  padding: 20px;
  font-size: 18px;
}

.error {
  color: #e74c3c;
  font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.filters {
  background-color: #ffe6dc;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  h3 {
    margin-top: 0;
    margin-bottom: 15px;
    color: #52405a;
    font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
}

.filter-group {
  margin-bottom: 15px;
  
  label {
    display: block;
    margin-bottom: 5px;
    font-weight: 600;
    color: #52405a;
    font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
  
  input[type="text"] {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
}

.filter-input {
    min-width: 500px;
    border-radius: 15px;
    border: none;
    padding: 10px;
}

.filter-checkbox {
    display: none;
}

.custom-checkbox {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 10px;
    border: 1px solid #52405a;
    margin-right: 10px;
}

.filter-checkbox:checked + .custom-checkbox {
  background-color: #52405a; 
}

.filter-checkbox:checked + .custom-checkbox::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 10px; 
  height: 10px; 
  background-color: white; 
  border-radius: 50%; 
  transform: translate(-50%, -50%); 
}

.category-checkboxes {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  
  .category-item {
    display: flex;
    align-items: center;
    
    label {
      margin: 5px;
      font-weight: normal;
    }
  }
}

.date-filter {
  .date-inputs {
    display: flex;
    gap: 15px;
    
    > div {
      
      label {
        width: 30px;
      }
      
      input {
        width: 200px;
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 15px;
      }
    }
  }
}

.clear-filters {
  background-color: #f8f3ff;
  border: none;
  border-radius: 15px;
  padding: 10px 15px;
  cursor: pointer;
  margin-top: 10px;
  font-weight: 600;
  color: #52405a;
  font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  
  &:hover {
    background-color: #ebe5f9;
  }
}

.table-wrapper {
  overflow-x: auto;
}

.products-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  
  th, td {
    border: 1px solid #ddd;
    padding: 12px;
    text-align: left;
  }
  
  th {
    background-color: #f8f3ff;
    color: #52405a;
    font-weight: 600;
  }
  
  tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  
  tr:hover {
    background-color: #f5f0ff;
  }
}
</style> 