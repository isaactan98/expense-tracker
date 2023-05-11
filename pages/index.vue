<template>
    <div class="container text-gray-600 dark:text-white">

        <Head>
            <title>Home</title>
        </Head>
        <!-- <NuxtWelcome v-show="!splashLoading" /> -->
        <div class="p-10 bg-gray-800 rounded-2xl">
            HOME
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