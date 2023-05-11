<template>
  <div class="bg-white dark:bg-black">
    <NuxtLayout>
      <splash-screen v-show="splashLoading" class="z-[2]" />
      <NuxtPage :class="{ 'hidden': splashLoading }"
        class="min-h-screen backdrop-blur-xl !bg-opacity-50 bg-white dark:bg-gray-800 z-[1] relative" />
      <div class="p-20 bg-red-300 rounded-full absolute top-0"></div>
      <BottonNavbar :class="{ 'hidden': splashLoading }" />
    </NuxtLayout>
  </div>
</template>

<script lang="ts">
export default {
  data: () => ({
    splashLoading: true
  }),
  mounted() {
    setTimeout(() => {
      this.splashLoading = false
    }, 3000);
  },
}
</script>