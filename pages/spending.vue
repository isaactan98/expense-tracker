<template>
    <div class="container mx-auto">
        <div class="mx-5">
            <div class="py-10">
                <h1 class="font-bold text-xl text-gray-600 dark:text-white">Spending</h1>
            </div>

            <div class="flex bg-zinc-100 dark:bg-gray-800 dark:text-white text-center rounded-xl mb-10">
                <button class="w-1/3 px-3 py-2"
                    :class="indicator == 'weekly' ? 'rounded-xl bg-white dark:bg-slate-600' : ''" id="weekly"
                    @click="clickedInd('weekly')">
                    Weekly
                </button>
                <button class="w-1/3 px-3 py-2"
                    :class="indicator == 'monthly' ? 'rounded-xl bg-white dark:bg-slate-600' : ''" id="monthly"
                    @click="clickedInd('monthly')">
                    Monthly
                </button>
                <button class="w-1/3 px-3 py-2"
                    :class="indicator == 'yearly' ? 'rounded-xl bg-white dark:bg-slate-600' : ''" id="yearly"
                    @click="clickedInd('yearly')">
                    Yearly
                </button>
            </div>

            <div class="p-10 rounded-xl bg-white dark:bg-gray-800 mb-10"></div>

            <div class="flex gap-10 mb-10">
                <div class="p-5 rounded-xl w-1/2 bg-white dark:bg-gray-800"></div>
                <div class="p-5 rounded-xl w-1/2 bg-white dark:bg-gray-800"></div>
            </div>

            <div class="py-5">
                <h1 class="font-bold text-gray-600 dark:text-white">Recent Transaction</h1>
            </div>

            <div class="overflow-y-auto max-h-96 scroll-smooth">
                <div class="flex w-full gap-5 bg-white dark:bg-gray-800 rounded-xl p-3 my-5 shadow-md dark:text-white"
                    v-for="d in dummies" :key="d">
                    <div class="w-2/12 grid place-content-center bg-zinc-300 dark:bg-zinc-600 rounded-xl">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
                        </svg>
                    </div>
                    <div class="w-10/12 flex justify-between items-center">
                        <div>Flue</div>
                        <div>
                            <p>$55.00</p>
                            <p class="text-zinc-400 text-xs">06 May</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    data: () => ({
        fb: null as any | null,
        indicator: 'weekly' as string | null,
        dummies: [] as any | null
    }),
    mounted() {
        this.dummies = []
        this.fb = firebase()
        const auth = this.fb.getAuth()
        auth.onAuthStateChanged((user: any) => {
            if (user) {
                // console.log(user)
            } else {
                window.location.href = '/profile'
            }
        }, 3000);
        this.dummies = new Array(10)
    },
    methods: {
        clickedInd(ind: any) {
            this.indicator = ind
        }
    }
}
</script>