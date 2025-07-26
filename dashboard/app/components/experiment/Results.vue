<script setup lang="ts">
import type { Experiment } from '../../../../evals/types';
import Selector from './Selector.vue';
import Graph from './Graph.vue';
import SetMetadata from './SetMetadata.vue';

const { results } = defineProps<{
    results: Experiment[];
}>();

const selectedExperiment = ref(results[0]?.name);

const currentExperiment = computed(() => {
    const experiment = results.find(
        (exp) => exp.name === selectedExperiment.value,
    );
    return experiment
        ? ({
              ...experiment,
              sets: experiment.sets.slice(-10),
          } satisfies Experiment)
        : null;
});
</script>

<template>
    <div>
        <Selector
            v-if="results.length > 0"
            v-model="selectedExperiment"
            :results="results"
        />

        <div v-if="currentExperiment" class="grid grid-cols-2">
            <Graph :experiment="currentExperiment" />

            <div class="flex flex-col gap-3">
                <h2 class="text-xl">Latest experiment run</h2>
                <SetMetadata :set="currentExperiment.sets.at(-1)!" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.experiment {
    display: grid;
    width: 100%;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
}
</style>