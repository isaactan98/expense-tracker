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
                <span class="text-sm text-center text-gray-500 dark:text-gray-400 mb-3">This month spend</span>
                <span class="text-5xl my-5">$ {{ totalExpense.toFixed(2) }}</span>
            </div>
            <!-- <div class="p-10 rounded-xl bg-black dark:bg-white"></div> -->
            <weekly-bar-chart :data="weeklyData" v-if="!loading.weekly" />
        </div>
    </div>
</template>

<script lang="ts">
import { collection, where, query, getDocs, onSnapshot } from 'firebase/firestore'
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

        }
    }
}
</script>