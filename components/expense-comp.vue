<template>
    <div class="min-h-screen w-full bg-white dark:bg-zinc-800 absolute z-50 top-5 rounded-t-2xl"
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
                <div class="flex items-center gap-5">
                    <div class="w-1/5 text-center" v-if="Object.keys(all_currency).length > 0">
                        <select class="px-4 py-2 bg-zinc-600 rounded-full outline-none w-full appearance-none text-center">
                            <optgroup v-for="c in Object.keys(all_currency)" :key="c" :label="c">
                                <option v-for="cc in all_currency[c]" :value="cc">{{ cc }}</option>
                            </optgroup>
                        </select>
                    </div>
                    <div class="w-4/5">
                        <input type="number" class="w-full bg-transparent outline-none" style="font-size: 5em;"
                            placeholder="0.00">
                    </div>
                </div>
                <div class="mt-5 flex items-center w-full gap-3">
                    <!-- category -->
                    <div class="w-1/5">
                        <div class="p-4 rounded-full bg-zinc-500 text-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                class="w-8 h-8 mx-auto">
                                <path
                                    d="M12.75 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM7.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM8.25 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM9.75 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM10.5 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM12.75 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM14.25 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 13.5a.75.75 0 100-1.5.75.75 0 000 1.5z" />
                                <path fill-rule="evenodd"
                                    d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z"
                                    clip-rule="evenodd" />
                            </svg>
                        </div>
                    </div>
                    <div class="w-4/5 mx-auto justify-center flex" v-if="selectedDate != null">
                        <input type="date" v-model="selectedDate" class="bg-transparent outline-none text-2xl">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    props: ['show', 'date'],
    data() {
        return {
            all_currency: {} as any,
            selectedDate: this.date
        }
    },
    mounted() {
        // console.log("date", this.date)
        // this.selectedDate = this.date ?? new Date()
        // console.log("selected date", this.selectedDate)
        for (let c in currencies) {
            const alp = c.substring(0, 1).toString()
            if (this.all_currency[alp] == undefined) {
                this.all_currency[alp] = []
            }
        }
        for (let a in this.all_currency) {
            this.all_currency[a] = Object.keys(currencies).filter(key => key.startsWith(a));
        }
    },
    methods: {
        closeExpense() {
            this.$emit('closeExpense', false)
        }
    }
}
</script>
