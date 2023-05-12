<template>
    <div class="grid place-content-center min-h-screen relative bg-white dark:bg-black">
        <div id="lottie" class=""></div>
    </div>
</template>

<script lang="ts">
import lottie from 'lottie-web/build/player/lottie';
export default {
    data: () => ({
        element: null as HTMLElement | null
    }),
    mounted() {
        this.element = document.getElementById('lottie') as HTMLElement;
        lottie.loadAnimation({
            container: this.element, // the dom element that will contain the animation
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: 'https://assets8.lottiefiles.com/private_files/lf30_n8x8yeqs.json' // the path to the animation json
        });
    }
}
</script>