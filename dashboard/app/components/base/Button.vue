<script setup lang="ts">
import Spinner from '../icon/Spinner.vue';

interface ButtonProps {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    loading?: boolean;
    type?: 'button' | 'submit' | 'reset';
}

const {
    variant = 'primary',
    size = 'md',
    type = 'button',
} = defineProps<ButtonProps>();

const buttonClasses = computed(() => {
    const base = [
        'inline-flex items-center justify-center rounded-md font-medium transition-colors',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',
    ];

    const sizes = {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4 py-2',
        lg: 'h-12 px-6 text-lg',
    } as const;

    const variants = {
        primary: [
            'bg-blue-600 text-white hover:bg-blue-700',
            'dark:bg-blue-600 dark:hover:bg-blue-700',
            'focus:ring-blue-500 dark:focus:ring-blue-400',
        ],
        secondary: [
            'bg-gray-100 text-gray-900 hover:bg-gray-200',
            'dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700',
            'focus:ring-gray-500 dark:focus:ring-gray-400',
        ],
        outline: [
            'border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50',
            'dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800',
            'focus:ring-gray-500 dark:focus:ring-gray-400',
        ],
        ghost: [
            'bg-transparent text-gray-700 hover:bg-gray-100',
            'dark:text-gray-300 dark:hover:bg-gray-800',
            'focus:ring-gray-500 dark:focus:ring-gray-400',
        ],
        destructive: [
            'bg-red-600 text-white hover:bg-red-700',
            'dark:bg-red-600 dark:hover:bg-red-700',
            'focus:ring-red-500 dark:focus:ring-red-400',
        ],
    } as const;

    return [...base, sizes[size], ...variants[variant]].join(' ');
});
</script>

<template>
    <button
        :class="buttonClasses"
        :disabled="disabled || loading"
        :type="type"
        v-bind="$attrs"
    >
        <Spinner v-if="loading" class="mr-2" />

        <slot />
    </button>
</template>
