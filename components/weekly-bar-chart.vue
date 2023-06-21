<template>
    <div class="bg-zinc-800 dark:bg-zinc-50 p-5 rounded-2xl">
        <div class="flex justify-between text-white dark:text-black text-sm">
            <p class="font-bold">Analytics</p>
            <p>This month</p>
        </div>
        <div class="mt-5 flex justify-between place-items-end text-white dark:text-zinc-600">
            <div v-for="i, k, u in loopDate" class=" text-center">
                <div class="w-3.5 bg-zinc-600 rounded-t-3xl mx-auto" :style="`height: ` + ((i / data.total) * 100) + `px`">
                </div>
                <span class="text-xs">{{ dayByWeek.find((e) => e.value == u)?.day }}</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    props: ['data'],
    data: () => ({
        dayByWeek: [
            { day: 'Sun', value: 0 },
            { day: 'Mon', value: 1 },
            { day: 'Tue', value: 2 },
            { day: 'Wed', value: 3 },
            { day: 'Thu', value: 4 },
            { day: 'Fri', value: 5 },
            { day: 'Sat', value: 6 },
        ],
        loopDate: {
            total: 0,
            weekByDate: {} as any
        }
    }),
    mounted() {
        console.clear()
        console.log("data:", this.data)
        this.loopDate = { ...this.data.weekByDate }
        let counter = 1

        for (let w in this.loopDate.weekByDate) {
            this.loopDate.weekByDate.w = { ...this.loopDate.weekByDate.w, day: counter }
        }
        console.log("loopDate: ", this.loopDate)
    }
}
</script>