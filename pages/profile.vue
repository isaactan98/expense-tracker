<template>
    <div class="min-h-screen container text-gray-500 dark:text-white">
        <div class="grid gap-3 mx-3" v-if="user">
            <h1 class="font-bold text-3xl mx-5 pt-3">Profile</h1>
            <div class="bg-amber-50 dark:bg-slate-800 grid grid-cols-3 gap-5 p-5 place-content-center">
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
            <div></div>
            <div class="bg-amber-50 dark:bg-slate-800 flex gap-5 p-5">
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
        <div></div>
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
            } else {
                console.warn('user not logged in')
                setTimeout(() => {
                    // check if device is mobile 
                    if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i)) {
                        signInWithPopup(auth, new GoogleAuthProvider()).then((result) => {
                            console.log(result)
                            // this.user = result.user
                            window.location.reload()
                        }).catch((error) => {
                            // console.log(error)
                            alert(error.message)
                        });
                    } else
                        signInWithRedirect(auth, new GoogleAuthProvider())
                });
            }
        }, 3000);
    },
    methods: {
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
