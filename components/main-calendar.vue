<template>
    <div class="calendar bg-white dark:bg-zinc-800 rounded-xl shadow-lg">
        <div
            class="calendar-header flex items-center justify-between px-4 py-2 bg-gray-200 dark:bg-zinc-900 dark:text-white rounded-t-xl">
            <button class="text-gray-600 hover:text-gray-800" @click="prevMonth">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
            </button>
            <div class="calendar-header-text font-bold">{{ monthYear }}</div>
            <button class="text-gray-600 hover:text-gray-800" @click="nextMonth">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
            </button>
        </div>
        <div class="calendar-body p-4">
            <div class="calendar-row">
                <div class="calendar-cell">
                    <div class="calendar-date text-center py-2 rounded-full dark:text-white">
                        Sun
                    </div>
                </div>
                <div class="calendar-cell">
                    <div class="calendar-date text-center py-2 rounded-full dark:text-white">
                        Mon
                    </div>
                </div>
                <div class="calendar-cell">
                    <div class="calendar-date text-center py-2 rounded-full dark:text-white">
                        Tue
                    </div>
                </div>
                <div class="calendar-cell">
                    <div class="calendar-date text-center py-2 rounded-full dark:text-white">
                        Wed
                    </div>
                </div>
                <div class="calendar-cell">
                    <div class="calendar-date text-center py-2 rounded-full dark:text-white">
                        Thu
                    </div>
                </div>
                <div class="calendar-cell">
                    <div class="calendar-date text-center py-2 rounded-full dark:text-white">
                        Fri
                    </div>
                </div>
                <div class="calendar-cell">
                    <div class="calendar-date text-center py-2 rounded-full dark:text-white">
                        Sat
                    </div>
                </div>
            </div>
            <div class="calendar-row" v-for="week in weeks" :key="week[0].date">
                <div class="calendar-cell" v-for="day in week" :key="day.date">
                    <div class="calendar-date text-center p-2 rounded-full dark:text-white" @click="dateTime(day.date)"
                        :class="{ 'text-gray-400': day.otherMonth, 'bg-blue-200 dark:bg-slate-600': isCurrentDate(day.date) }">
                        {{ day.day }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import { ref, computed } from 'vue'

export default {
    name: 'Calendar',
    setup() {
        const currentDate = new Date()
        const currentMonth = ref(currentDate.getMonth())
        const currentYear = ref(currentDate.getFullYear())

        const weeks = computed(() => {
            const firstDayOfMonth = new Date(currentYear.value, currentMonth.value, 1).getDay()
            const lastDateOfMonth = new Date(currentYear.value, currentMonth.value + 1, 0).getDate()

            const weeks = [[]]

            let weekIndex = 0

            for (let i = 0; i < firstDayOfMonth; i++) {
                weeks[0].push({
                    day: '',
                    date: '',
                    otherMonth: true,
                })
            }

            for (let i = 1; i <= lastDateOfMonth; i++) {
                if (weeks[weekIndex].length === 7) {
                    weeks.push([])
                    weekIndex++
                }

                weeks[weekIndex].push({
                    day: i,
                    date: new Date(currentYear.value, currentMonth.value, i),
                    otherMonth: false,
                })
            }

            const lastWeek = weeks[weeks.length - 1]

            for (let i = lastWeek.length; i < 7; i++) {
                lastWeek.push({
                    day: '',
                    date: '',
                    otherMonth: true,
                })
            }

            return weeks
        })

        const monthYear = computed(() => {
            const months = [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December',
            ]

            return `${months[currentMonth.value]} ${currentYear.value}`
        })

        const isCurrentDate = (date) => {
            let now = new Date()
            let selectDate = new Date(date)
            now = new Date(now.setHours(0, 0, 0, 0))
            // console.warn("date {} , now {} ", selectDate, now)
            if (date) {
                // if (selectDate.getFullYear() === now.getFullYear() &&
                //     selectDate.getMonth() === now.getMonth() &&
                //     selectDate.getDate() === now.getDate()) {
                //     // console.warn("date {} , now {} ", selectDate, now)
                // }
                return selectDate.getFullYear() === now.getFullYear() &&
                    selectDate.getMonth() === now.getMonth() &&
                    selectDate.getDate() === now.getDate()
            }
        }

        const prevMonth = () => {
            if (currentMonth.value === 0) {
                currentMonth.value = 11
                currentYear.value--
            } else {
                currentMonth.value--
            }
        }

        const nextMonth = () => {
            if (currentMonth.value === 11) {
                currentMonth.value = 0
                currentYear.value++
            } else {
                currentMonth.value++
            }
        }

        return {
            weeks,
            monthYear,
            prevMonth,
            nextMonth,
            isCurrentDate
        }
    },
    data: () => ({
        currentDate: new Date()
    }),
    mounted() {
        // console.log(this.currentDate)
        this.dateTime(this.currentDate)
    },
    methods: {
        dateTime(date) {
            this.$emit('dateTime', date)
        }
    }
}
</script>
  
<style>
.calendar {
    font-family: 'Helvetica Neue', Arial, sans-serif;
    max-width: 480px;
}

.calendar-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.calendar-header-text {
    font-size: 1.25rem;
    line-height: 1.25rem;
}

.calendar-body {
    display: grid;
    grid-auto-flow: dense;
    justify-content: center;
}

.calendar-row {
    display: flex;
    gap: 1rem;
}

.calendar-cell {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 48px;
}

.calendar-date {
    width: 32px;
    height: 32px;
}
</style>