<template>
    <div class="min-h-screen container text-gray-500 dark:text-white">
        <div class="grid gap-3 mx-5" v-if="user">
            <div class="pt-10 pb-5">
                <h1 class="font-bold text-xl text-gray-600 dark:text-white">Profile</h1>
            </div>
            <div class="bg-white dark:bg-zinc-800 grid grid-cols-3 gap-5 p-5 place-content-center rounded-t-xl">
                <div class="w-28 h-28 justify-center items-center">
                    <img :src="user.photoURL" alt="" class="rounded-full" referrerpolicy="no-referrer">
                </div>
                <div class="col-span-2">
                    <div class="">
                        <label for="" class="text-gray-500 text-xs">Display name</label>
                        <h1 class="text-lg">{{ user.displayName }}</h1>
                    </div>
                    <div class="">
                        <label for="" class="text-gray-500 text-xs">Email</label>
                        <h1 class="text-lg">{{ user.email }}</h1>
                    </div>
                    <div class="">
                        <label for="" class="text-gray-500 text-xs">Last Login</label>
                        <h1 class="text-sm">{{ dateTime(user.metadata.lastSignInTime) }}</h1>
                    </div>
                </div>
            </div>
            <div class="bg-white dark:bg-zinc-800 flex gap-5 p-5 rounded-b-xl">
                <button class="flex items-center gap-3" @click="logout()">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6 text-red-500">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                    </svg>
                    <h1 class="text-red-500 text-xl">Logout</h1>
                </button>
            </div>
        </div>
        <div class="grid place-content-center min-h-screen" v-if="!user">
            <div class="p-10 rounded-xl bg-amber-50 backdrop-blur-xl bg-opacity-20 shadow-lg">
                <button class="bg-white py-2 px-4 rounded-md flex gap-3 items-center text-black" @click="loginWithGoogle">
                    <svg viewBox="0 0 128 128" class="w-5 h-5">
                        <path fill="#fff"
                            d="M44.59 4.21a63.28 63.28 0 004.33 120.9 67.6 67.6 0 0032.36.35 57.13 57.13 0 0025.9-13.46 57.44 57.44 0 0016-26.26 74.33 74.33 0 001.61-33.58H65.27v24.69h34.47a29.72 29.72 0 01-12.66 19.52 36.16 36.16 0 01-13.93 5.5 41.29 41.29 0 01-15.1 0A37.16 37.16 0 0144 95.74a39.3 39.3 0 01-14.5-19.42 38.31 38.31 0 010-24.63 39.25 39.25 0 019.18-14.91A37.17 37.17 0 0176.13 27a34.28 34.28 0 0113.64 8q5.83-5.8 11.64-11.63c2-2.09 4.18-4.08 6.15-6.22A61.22 61.22 0 0087.2 4.59a64 64 0 00-42.61-.38z">
                        </path>
                        <path fill="#e33629"
                            d="M44.59 4.21a64 64 0 0142.61.37 61.22 61.22 0 0120.35 12.62c-2 2.14-4.11 4.14-6.15 6.22Q95.58 29.23 89.77 35a34.28 34.28 0 00-13.64-8 37.17 37.17 0 00-37.46 9.74 39.25 39.25 0 00-9.18 14.91L8.76 35.6A63.53 63.53 0 0144.59 4.21z">
                        </path>
                        <path fill="#f8bd00"
                            d="M3.26 51.5a62.93 62.93 0 015.5-15.9l20.73 16.09a38.31 38.31 0 000 24.63q-10.36 8-20.73 16.08a63.33 63.33 0 01-5.5-40.9z">
                        </path>
                        <path fill="#587dbd"
                            d="M65.27 52.15h59.52a74.33 74.33 0 01-1.61 33.58 57.44 57.44 0 01-16 26.26c-6.69-5.22-13.41-10.4-20.1-15.62a29.72 29.72 0 0012.66-19.54H65.27c-.01-8.22 0-16.45 0-24.68z">
                        </path>
                        <path fill="#319f43"
                            d="M8.75 92.4q10.37-8 20.73-16.08A39.3 39.3 0 0044 95.74a37.16 37.16 0 0014.08 6.08 41.29 41.29 0 0015.1 0 36.16 36.16 0 0013.93-5.5c6.69 5.22 13.41 10.4 20.1 15.62a57.13 57.13 0 01-25.9 13.47 67.6 67.6 0 01-32.36-.35 63 63 0 01-23-11.59A63.73 63.73 0 018.75 92.4z">
                        </path>
                    </svg> Login with Google
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { signInWithPopup, signInWithRedirect, GoogleAuthProvider } from "firebase/auth";
export default {
    data: () => ({
        user: null as any | null,
        fb: null as any | null,
    }),
    mounted() {
        this.fb = firebase()
        const auth = this.fb.getAuth()

        auth.onAuthStateChanged((user: any) => {
            if (user) {
                // console.log(user)
                this.user = user
            }
        }, 3000);
    },
    methods: {
        async loginWithGoogle() {
            const auth = this.fb.getAuth()
            // console.warn("is PWA:: ", window.matchMedia('(display-mode: standalone)').matches);
            alert("is PWA:: " + window.matchMedia('(display-mode: standalone)').matches)
            let isPWA = window.matchMedia('(display-mode: standalone)').matches
            if (!isPWA) {
                alert("signin with redirect")
                signInWithRedirect(auth, new GoogleAuthProvider())
            }
            else if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) {
                alert("signin with pop up")
                signInWithPopup(auth, new GoogleAuthProvider()).then((result) => {
                    console.log(result)
                    // this.user = result.user
                    window.location.reload()
                }).catch((error) => {
                    console.log(error)
                    // alert(error.message)
                });
            } else {
                alert("signin with redirect")
                signInWithRedirect(auth, new GoogleAuthProvider())
            }
        },
        async logout() {
            const auth = this.fb.getAuth()
            await auth.signOut().then(() => {
                // console.log('logout')
                window.location.href = '/'
            }).catch((error: any) => {
                console.log(error)
                alert(error.message)
            });
        },
        dateTime(date: any) {
            return new Date(date).toLocaleString()
        }
    }
}
</script>
