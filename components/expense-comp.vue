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
                        <select
                            class="px-4 py-2 text-white bg-zinc-600 rounded-full outline-none w-full appearance-none text-center"
                            v-model="currency" @change="changeCurrency(currency)">
                            <optgroup v-for="c in Object.keys(all_currency)" :key="c" :label="c">
                                <option v-for="cc in all_currency[c]" :value="cc">{{ cc }}</option>
                            </optgroup>
                        </select>
                    </div>
                    <div class="w-4/5">
                        <input type="text" class="w-full bg-transparent outline-none text-right" @input="convertToCurrency"
                            inputmode="numeric" style="font-size: 5em;" placeholder="0.00" v-model="expenseAmount"
                            pattern="[0-9]*">
                    </div>
                </div>
                <div class="mt-5 flex items-center w-full gap-3">
                    <!-- category -->
                    <div class="w-1/5">
                        <div class="p-4 rounded-full bg-zinc-500 text-center text-white">
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
                    <div class="w-4/5 mx-auto justify-center flex">
                        <input type="date" v-model="selectedDate" class="bg-transparent outline-none text-2xl">
                    </div>
                </div>
                <div class="mt-5 flex items-center w-full gap-3">
                    <div class="w-1/5">
                        <div class="p-4 rounded-full bg-zinc-500 text-center text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-8 h-8 mx-auto">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6z" />
                            </svg>
                        </div>
                    </div>
                    <div class="w-4/5 mx-auto justify-center flex">
                        <select class="py-3 px-5 bg-transparent outline-none text-2xl" v-model="expenseCategory">
                            <option :value="cat.id" v-for="cat in categoryList">
                                {{ cat.name }}
                            </option>
                        </select>
                    </div>
                </div>

                <div class="mt-10" v-if="expense_id">
                    <button class="bg-red-500 text-white py-3 px-5 w-full rounded-full" @click="deleteExpense(expense_id)">
                        <span v-if="!loading.delete">DELETE</span>
                        <span v-if="loading.delete" class="ml-3">
                            <svg class="animate-spin h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg"
                                fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                                </circle>
                                <path class="opacity-75" fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                            </svg>
                        </span>
                    </button>
                </div>

                <div class="mt-10">
                    <button class="text-white bg-zinc-900 py-3 px-5 rounded-full w-full" @click="saveExpense">
                        <span v-if="!loading.save">SAVE</span>
                        <span v-if="loading.save" class="ml-3">
                            <svg class="animate-spin h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg"
                                fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                                </circle>
                                <path class="opacity-75" fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                            </svg>
                        </span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { addDoc, collection, where, deleteDoc, onSnapshot, doc } from 'firebase/firestore'
export default {
    props: ['show', 'date', 'expenseId'],
    data() {
        return {
            all_currency: {} as any,
            selectedDate: this.date,
            expenseAmount: "" as string,
            currency: 'USD' as string,
            expenseCategory: 'Food' as string,
            loading: {
                save: false,
                delete: false
            },
            expense_id: this.expenseId
        }
    },
    mounted() {
        this.currency = localStorage.getItem('currency') ?? 'MYR'

        for (let c in currencies) {
            const alp = c.substring(0, 1).toString()
            if (this.all_currency[alp] == undefined) {
                this.all_currency[alp] = []
            }
        }
        for (let a in this.all_currency) {
            this.all_currency[a] = Object.keys(currencies).filter(key => key.startsWith(a));
        }

        if (this.expense_id != null) {
            this.getExpenseDetail()
        }
    },
    methods: {
        convertToCurrency() {
            console.clear()
            // console.log("this.expenseAmount1", this.expenseAmount)
            // replace dot 
            this.expenseAmount = this.expenseAmount?.toString().replace('.', '') ?? 0
            // console.log("this.expenseAmount2", this.expenseAmount)
            // split the amount into array
            let amount = this.expenseAmount?.toString().split('')
            // console.log("amount1", amount)

            if (amount.length == 1) {
                amount = ['0', '0', this.expenseAmount]
            } else if (amount.length == 2) {
                amount = ['0', amount[0], amount[1]]
            }

            if (amount.length > 3) {
                // remove the first 0
                if (amount[0] == '0') {
                    amount?.splice(0, 1)
                }
                // console.log("amount2.5: ", amount)
            }
            // add dot to the array
            amount?.splice(amount.length - 2, 0, '.')
            // console.log("amount3", amount)
            // join the array
            this.expenseAmount = amount?.join('')
            // console.log("this.expenseAmount3", this.expenseAmount)
        },

        closeExpense() {
            this.$emit('closeExpense', false)
        },
        changeCurrency(currency: string) {
            console.log("currency", currency)
            this.currency = currency
            localStorage.setItem('currency', currency)
        },
        saveExpense() {
            this.loading.save = true
            const fb = firebase()
            const auth = fb.getAuth()
            let user = auth.currentUser
            let expense = new Expense(null, this.selectedDate, this.expenseCategory, this.currency, Number(this.expenseAmount), user?.uid)

            addDoc(collection(fb.db, 'expenses'), {
                date: expense.date,
                category: expense.category,
                currency: expense.currency,
                amount: expense.amount,
                userId: expense.userId
            })
                .then((docRef) => {
                    this.loading.save = false
                    // console.log("Document written with ID: ", docRef.id);
                    setTimeout(() => {
                        this.$emit('closeExpense', false)
                    }, 300);
                })
                .catch((error) => {
                    this.loading.save = false
                    console.error("Error adding document: ", error);
                });
        },
        getExpenseDetail() {
            const fb = firebase()
            const ref = doc(fb.db, 'expenses', this.expense_id)
            onSnapshot(ref, (doc) => {
                if (doc.exists()) {
                    // console.log("Document data:", doc.data());
                    const data = doc.data()
                    this.selectedDate = data.date
                    this.expenseCategory = data.category
                    this.currency = data.currency
                    this.expenseAmount = data.amount
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            });
        },
        deleteExpense(id: any) {
            this.loading.delete = true
            const fb = firebase()
            const ref = doc(fb.db, 'expenses', id)
            deleteDoc(ref).then(() => {
                this.loading.delete = false
                setTimeout(() => {
                    this.$emit('closeExpense', false)
                }, 300);
            }).catch((error: any) => {
                this.loading.delete = false
                console.error("Error removing document: ", error);
            });
        }
    }
}
</script>
<style>
input[type="date"]::-webkit-calendar-picker-indicator {
    display: none;
}
</style>