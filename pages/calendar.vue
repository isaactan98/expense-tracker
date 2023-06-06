<template>
    <div class="container mx-auto">
        <transition enter-active-class="transition duration-500 ease-out" enter-from-class="transform translate-y-full"
            enter-to-class="transform translate-y-0" leave-active-class="transition duration-500 ease-out"
            leave-from-class="transform translate-y-0" leave-to-class="transform translate-y-full" :appear="true"
            :show="expenseShow">
            <ExpenseComp v-if="expenseShow" @closeExpense="getReturnCheck" :date="selectedDateTime" />
        </transition>
        <div class="mx-5">
            <div class="py-10 flex justify-between items-center">
                <h1 class="font-bold text-xl text-gray-600 dark:text-white">Calendar</h1>
                <button class="p-1" @click="showExpense">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6 text-gray-600 dark:text-white">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
            </div>
            <MainCalendar @dateTime="clickedInd" />

            <div class="my-3 text-gray-700 dark:text-white">
                <div class="p-5 rounded-xl bg-white dark:bg-zinc-800">
                    {{ selectedDateTime }}
                </div>

                <div class="overflow-y-auto max-h-96 scroll-smooth">
                    <div class="flex w-full gap-5 bg-white dark:bg-zinc-800 rounded-xl p-3 my-5 shadow-md dark:text-white"
                        v-for="e in expenseList" :key="e">
                        <div class="w-2/12 grid place-content-center bg-zinc-300 dark:bg-zinc-600 rounded-xl">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
                            </svg>
                        </div>
                        <div class="w-10/12 flex justify-between items-center">
                            <div>{{ e.category }}</div>
                            <div>
                                <p class="text-right">$ {{ e.amount?.toFixed(2) }}</p>
                                <p class="text-zinc-400 text-xs">{{ e.date }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { collection, where, query, getDocs, onSnapshot } from 'firebase/firestore'
export default {
    data: () => ({
        fb: null as any | null,
        selectedDateTime: null as any | null,
        dummies: [] as any | null,
        expenseShow: false as boolean | null,
        expenseList: [] as any | null
    }),
    mounted() {
        this.fb = firebase()
        const auth = this.fb.getAuth()
        auth.onAuthStateChanged((user: any) => {
            if (user) {
                // console.log(user)
                this.getExpense(this.selectedDateTime)
            } else {
                window.location.href = '/profile'
            }
        }, 3000);
        this.dummies = new Array(10)
    },
    methods: {
        clickedInd(ind: any) {
            // console.log("%cind: " + ind, "color: yellow")
            if (notNull(ind)) {
                this.selectedDateTime = ind.getFullYear() + "-" + (toDoubleDigits(ind.getMonth())) + "-" + dateDoubleDigits(ind.getDate())
                // this.selectedDateTime = new Date(ind).toISOString().split('T')[0]
                this.getExpense(this.selectedDateTime)
            }
        },
        showExpense() {
            this.expenseShow = true
            // change date format to YYYY-MM-DD
            // this.selectedDateTime = new Date(this.selectedDateTime).toISOString().split('T')[0]
            document.body.classList.add('overflow-hidden')
        },
        getReturnCheck(e: any) {
            this.expenseShow = e
            document.body.classList.remove('overflow-hidden')
        },
        async getExpense(date: string) {
            this.fb = firebase()
            const auth = await this.fb.getAuth()
            const user = await auth.currentUser
            const ref = collection(this.fb.db, 'expenses')
            if (notNull(user)) {
                const q = query(ref, where('date', '==', date), where('userId', '==', user?.uid))
                onSnapshot(q, (querySnapshot) => {
                    this.expenseList = []
                    querySnapshot.forEach((doc) => {
                        // console.log(doc.id, " => ", doc.data());
                        doc.data().category = categoryList.find((c: any) => c.id == doc.data().category)?.name
                        this.expenseList.push(doc.data())
                    });
                });
            }
        }
    }
}
</script>