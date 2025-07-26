<script setup lang="ts">
import type { Experiment } from '../../../../evals/types';

const { results } = defineProps<{
    results: Experiment[];
}>();

const value = defineModel<string>()
</script>

<template>
    <div v-if="results.length > 0" className="controls">
        <label htmlFor="experiment-select">Select Experiment: </label>

        <select id="experiment-select" v-model="value">
            <option v-for="exp in results" :key="exp.name" :value="exp.name">
                {{ exp.name }}
            </option>
        </select>
    </div>
</template>

<style scoped>
.controls {
    margin: 2rem 0;
}

select {
    margin-left: 1rem;
    padding: 0.5rem;
    font-size: 1rem;
}
</style>
