<template>
    <div class="container text-gray-600 dark:text-white">

        <Head>
            <title>Home</title>
        </Head>
        <div class="mx-5">
            <div class="pt-10 pb-5">
                <h1 class="font-bold text-xl">Home</h1>
            </div>
            <div class="grid place-content-center my-3">
                <span class="text-sm text-center text-gray-500 dark:text-gray-400 mb-1">This month spend</span>
                <span class="text-5xl my-5">$ {{ totalExpense.toFixed(2) }}</span>
            </div>
            <!-- <div class="p-10 rounded-xl bg-black dark:bg-white"></div> -->
            <weekly-bar-chart :data="weeklyData" v-if="!loading.weekly" />

            <div class="mt-6">
                <div class="flex">
                    <p class="text-gray-500 dark:text-gray-400">Recent</p>
                </div>
                <div class="overflow-y-auto max-h-64 scroll-smooth">
                    <div class="flex w-full gap-5 bg-white dark:bg-zinc-800 rounded-xl p-3 my-5 shadow-md dark:text-white relative"
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
import { collection, where, query, getDocs, onSnapshot, orderBy } from 'firebase/firestore'
export default {
    head() {
        return {
            title: 'Home',
            meta: [
                { hid: 'description', name: 'description', content: 'My custom description' }
            ]
        }
    },
    data: () => ({
        totalExpense: 0,
        weeklyData: {
            weekByDate: [] as any,
            total: 0,
        },
        loading: {
            monthly: true,
            weekly: true
        }
    }),
    async mounted() {
        const fb = firebase()
        const user = await fb.getAuth()

        user.onAuthStateChanged(async (user: any) => {
            if (user) {
                await this.getMonthlyExpense(user.uid)
                await this.getWeeklyExpense(user.uid)
                await this.getExpense(user.uid)
            } else {
                console.log('no user')
            }
        })
    },
    methods: {
        async getMonthlyExpense(userId: string | undefined) {
            const currentDate = new Date()
            const currentMonth = currentDate.getMonth() + 1
            const currentYear = currentDate.getFullYear()

            const startDate = `${currentYear}-${currentMonth.toString().padStart(2, '0')}-01`;
            const endDate = `${currentYear}-${currentMonth.toString().padStart(2, '0')}-${new Date(currentYear, currentMonth, 0).getDate()}`;

            const fb = firebase()
            const ref = collection(fb.db, 'expenses')
            this.totalExpense = 0
            if (notNull(userId)) {
                const q = query(ref, where('date', '>=', startDate), where('date', '<', endDate), where('userId', '==', userId))
                onSnapshot(q, (querySnapshot) => {
                    let total = 0
                    querySnapshot.forEach((doc) => {
                        // console.log(doc.data())
                        total += doc.data().amount
                    })
                    this.totalExpense = total
                })

            }
        },
        async getWeeklyExpense(userId: string | undefined) {
            var currentDate = new Date();
            var currentDayOfWeek = currentDate.getDay();
            var difference = currentDayOfWeek - 0; // Change 0 to the desired start day of the week (e.g., 1 for Monday)

            var startDate = new Date(currentDate);
            startDate.setDate(startDate.getDate() - difference);

            var endDate = new Date(startDate);
            endDate.setDate(endDate.getDate() + 6);

            var startDateFormat = startDate.toLocaleDateString('en-US');
            var endDateFormat = endDate.toLocaleDateString('en-US');

            var newStartDateFormat = startDateFormat.split('/')
            var newEndDateFormat = endDateFormat.split('/')

            startDateFormat = `${newStartDateFormat[2]}-${newStartDateFormat[0].padStart(2, '0')}-${newStartDateFormat[1].padStart(2, '0')}`
            endDateFormat = `${newEndDateFormat[2]}-${newEndDateFormat[0].padStart(2, '0')}-${newEndDateFormat[1].padStart(2, '0')}`

            for (var i = 0; i < 7; i++) {
                var loopDate = new Date(startDate);
                loopDate.setDate(loopDate.getDate() + i);
                var formattedDate = loopDate.toISOString().slice(0, 10);
                this.weeklyData.weekByDate[formattedDate] = 0;
            }

            const fb = firebase()
            const ref = collection(fb.db, 'expenses')

            let processDoc = 0
            let totalDoc = 0

            if (notNull(userId)) {
                const q = query(ref, where('date', '>=', startDateFormat), where('date', '<', endDateFormat), where('userId', '==', userId))
                onSnapshot(q, (querySnapshot) => {
                    totalDoc = querySnapshot.docs.length
                    querySnapshot.forEach((doc) => {
                        // console.log(doc.data())
                        processDoc++
                        this.weeklyData.weekByDate[doc.data().date] += doc.data().amount
                        this.weeklyData.total += doc.data().amount

                        if (processDoc == totalDoc) {
                            this.loading.weekly = false
                        }
                    })
                    // this.totalExpense = total
                })
            }

        },
        async getExpense(userId: string) {
            var currentDate = new Date();
            var currentDayOfWeek = currentDate.getDay();
            var difference = currentDayOfWeek - 0; // Change 0 to the desired start day of the week (e.g., 1 for Monday)

            var startDate = new Date(currentDate);
            startDate.setDate(startDate.getDate() - difference);

            var endDate = new Date(startDate);
            endDate.setDate(endDate.getDate() + 6);

            var startDateFormat = startDate.toLocaleDateString('en-US');
            var endDateFormat = endDate.toLocaleDateString('en-US');

            var newStartDateFormat = startDateFormat.split('/')
            var newEndDateFormat = endDateFormat.split('/')

            startDateFormat = `${newStartDateFormat[2]}-${newStartDateFormat[0].padStart(2, '0')}-${newStartDateFormat[1].padStart(2, '0')}`
            endDateFormat = `${newEndDateFormat[2]}-${newEndDateFormat[0].padStart(2, '0')}-${newEndDateFormat[1].padStart(2, '0')}`

            this.fb = firebase()
            const auth = await this.fb.getAuth()
            const user = await auth.currentUser
            const ref = collection(this.fb.db, 'expenses')
            if (notNull(user)) {
                const q = query(ref, where('date', '>=', startDateFormat), where('date', '<', endDateFormat), where('userId', '==', userId), orderBy('date', 'desc'))
                onSnapshot(q, (querySnapshot) => {
                    this.expenseList = []
                    querySnapshot.forEach((doc) => {
                        // console.log(doc.id, " => ", doc.data());
                        doc.data().category = categoryList.find((c: any) => c.id == doc.data().category)?.name
                        this.expenseList.push({ ...doc.data(), id: doc.id })
                    });
                });
            }
        },
    }
}
</script>