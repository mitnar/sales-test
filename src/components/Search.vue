<script lang="ts" setup>
import { ref, defineEmits, defineProps } from 'vue';
import type { Ref } from 'vue'

const props = defineProps<{
    search: string | undefined
}>()

const emit = defineEmits(['filter'])

const searchValue = ref(props.search);
const timeout : Ref<number | undefined> = ref(undefined);

const search = () => {
    clearTimeout(timeout.value);

    timeout.value = setTimeout(() => {
        emit('filter', { search: searchValue.value })
    }, 300)
}

</script>

<template>
    <div class="search-container">
        <input type="search"
               class="search-input"
               v-model="searchValue"
               @input="search"/>
        <button type="button"
                class="search-button"
                @click="search"> 
                <span class="visually-hidden">Поиск в каталоге по указанному тексту.</span>
        </button>       
    </div>
</template>

<style scoped>
    .search-container {
        border: 1px solid #E0E3EE;
        border-radius: 10px;
        display: flex;
        padding: 4px;
    }

    .search-container:focus-within {
        border-color: #2D3B87
    }

    .search-input {
        border: none;
        outline: none;
        color: #2D3B87;
        font-size: 15px;
        margin-right: 8px;
        flex-grow: 1;
    }

    .search-button {
        width: 40px;
        height: 40px;
        background-color: #2D3B87;
        border-radius: 10px;
        border: none; 
        outline: none;
        background-image: url('../assets/images/search.svg');
        background-repeat: no-repeat;
        background-position: center;
    }

    .search-button:hover {
        opacity: 80%;
    }

    .search-button:active {
        opacity: 30%;
    }
</style>