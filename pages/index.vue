<template>
    <div>
        <NuxtWelcome />
    </div>
</template>

<script lang="ts">
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

export default {
    layout: 'default',
    data: () => ({

    }),
    mounted() {
        const config = useRuntimeConfig()
        const firebaseConfig = {
            apiKey: config.public['firebase'].apiKey,
            authDomain: config.public['firebase'].authDomain,
            projectId: config.public['firebase'].projectId,
            storageBucket: config.public['firebase'].storageBucket,
            messagingSenderId: config.public['firebase'].messagingSenderId,
            appId: config.public['firebase'].appId,
            measurementId: config.public['firebase'].measurementId
        };

        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        const analytics = getAnalytics(app);
        console.info(analytics)
    },
}
</script>