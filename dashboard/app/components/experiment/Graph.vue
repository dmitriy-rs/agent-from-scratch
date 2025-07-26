<script setup lang="ts">
import { computed } from 'vue';
import { Line } from 'vue-chartjs';
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
} from 'chart.js';
import type { Experiment } from '../../../../evals/types';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
);

const props = defineProps<{
    experiment: Experiment;
}>();

const labels = computed(() =>
    props.experiment.sets.map((_, i) => `Set ${i + 1}`),
);

const scores = computed(() => props.experiment.sets.map((set) => set.score));

const chartData = computed(() => ({
    labels: labels.value,
    datasets: [
        {
            label: 'Score',
            data: scores.value,
            borderColor: '#8884d8',
            backgroundColor: '#8884d8',
            fill: false,
            tension: 0,
            pointRadius: 4,
            pointBackgroundColor: '#8884d8',
        },
    ],
}));

const options = {
    scales: {
        y: {
            type: 'linear' as const,
            min: 0,
            max: 1,
            clip: false,
            bounds: 'data' as const,
            offset: true,
            ticks: {
                stepSize: 0.1,
            },
        },
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        tooltip: {
            mode: 'index' as const,
            intersect: false,
        },
    },
};
</script>

<template>
    <div>
        <h2>{{ experiment.name }} Scores</h2>
        <div style="width: 600px; height: 400px">
            <Line :data="chartData" :options="options" />
        </div>
    </div>
</template>
