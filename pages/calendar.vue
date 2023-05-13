<template>
    <div class="container mx-auto">
        <div class="mx-5">
            <div class="py-10">
                <h1 class="font-bold text-xl text-gray-600 dark:text-white">Calendar</h1>
            </div>
            <MainCalendar />
        </div>
    </div>
</template>

<script lang="ts">

export default {
    data: () => ({
        fb: null as any | null,
    }),
    mounted() {
        this.fb = firebase()
        const auth = this.fb.getAuth()
        auth.onAuthStateChanged((user: any) => {
            if (user) {
                // console.log(user)
            } else {
                window.location.href = '/profile'
            }
        }, 3000);
    },
}
</script>