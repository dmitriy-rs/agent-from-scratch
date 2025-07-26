<script setup lang="ts">
import type { Experiment } from '../../../../evals/types';
import Selector from './Selector.vue';
import Graph from './Graph.vue';
import SetMetadata from './SetMetadata.vue';
import Actions from './Actions.vue';

const { results } = defineProps<{
    results: Experiment[];
}>();

const selectedExperiment = ref<Experiment | null>(results[0] ?? null);

const currentExperiment = computed(() => {
    if (!selectedExperiment.value) return null;
    return {
        ...selectedExperiment.value,
        sets: selectedExperiment.value.sets.slice(-10),
    };
});
</script>

<template>
    <Selector
        v-if="results.length > 0"
        v-model="selectedExperiment"
        :results="results"
    />

    <div v-if="currentExperiment" class="grid grid-cols-2">
        <div class="flex flex-col gap-6">
            <Graph :experiment="currentExperiment" />
            <Actions :experiment-name="currentExperiment.name" />
        </div>

        <div class="flex flex-col gap-3">
            <h2 class="text-xl">Latest experiment run</h2>
            <SetMetadata :set="currentExperiment.sets.at(-1)!" />
        </div>
    </div>
</template>
