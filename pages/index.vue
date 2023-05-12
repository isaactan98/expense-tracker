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
                <span class="text-5xl my-5">$1,200.11</span>
            </div>
            <div class="p-10 rounded-xl bg-black dark:bg-white"></div>
        </div>
    </div>
</template>

<script lang="ts">

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

    }),
    mounted() {
        firebase()
    },
}
</script>