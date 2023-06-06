<template>
    <div class="container text-gray-600 dark:text-white">

        <Head>
            <title>Home</title>
        </Head>
        <div class="mx-5">
            <div class="py-10">
                <h1 class="font-bold text-xl">Home</h1>
            </div>
            <div class="grid place-content-center my-3">
                <span class="text-sm text-center text-gray-500 dark:text-gray-400 mb-3">This month spend</span>
                <span class="text-5xl my-5">$ {{ totalExpense.toFixed(2) }}</span>
            </div>
            <div class="p-10 rounded-xl bg-black dark:bg-white"></div>
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
        totalExpense: 0
    }),
    async mounted() {
        const fb = firebase()
        const user = await fb.getAuth()

        user.onAuthStateChanged((user: any) => {
            if (user) {
                this.getMonthlyExpense(user.uid)
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
        }
    }
}
</script>