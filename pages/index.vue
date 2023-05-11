<template>
    <div>

        <Head>
            <title>Home</title>
        </Head>
        <!-- <NuxtWelcome v-show="!splashLoading" /> -->
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