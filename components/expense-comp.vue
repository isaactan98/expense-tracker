<template>
    <div class="min-h-[99vh] w-full bg-white dark:bg-zinc-800 absolute z-50 bottom-0 rounded-t-2xl"
        :class="show ? 'block' : 'hidden'">
        <div class="pt-10 px-5 text-zinc-800 dark:text-white">
            <div class="flex items-center relative">
                <div class="w-1/5 absolute">
                    <button class="p-1" @click="closeExpense">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div class="w-full text-center">
                    Expense
                </div>
            </div>
            <div class="mt-10">
                <div class="flex items-center">
                    <div class="w-2/5 text-center">
                        <span class="px-4 py-2 bg-zinc-600 rounded-full">USD</span>
                    </div>
                    <div class="w-3/5">
                        <input type="number" class="w-full bg-transparent outline-none" style="font-size: 5em;"
                            placeholder="0.00">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    props: ['show'],
    methods: {
        closeExpense() {
            this.$emit('closeExpense', false)
        }
    }
}
</script>
