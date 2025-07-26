<script setup lang="ts">
import type { Experiment } from '../../../../evals/types';

const { results } = defineProps<{
    results: Experiment[];
}>();

const valueModel = defineModel<Experiment | null>();
</script>

<template>
    <div v-if="results.length > 0" class="py-6 space-x-4">
        <label for="experiment-select">Select Experiment: </label>

        <select id="experiment-select" class="p-2" v-model="valueModel">
            <option v-for="exp in results" :key="exp.name" :value="exp">
                {{ exp.name }}
            </option>
        </select>
    </div>
</template>
