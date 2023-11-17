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
                <button @click="loginWithGoogle()" class="py-2 px-3 rounded-lg bg-zinc-500 bg-opacity-40">
                    Login with Google</button>
            </div>

        </div>
    </div>
</template>

<script lang="ts">
import { signInWithPopup, signInWithRedirect, signInWithCredential, GoogleAuthProvider, getRedirectResult } from "firebase/auth";
export default {
    data: () => ({
        user: null as any | null,
        fb: null as any | null,
    }),
    async mounted() {
        this.fb = firebase()
        const auth = this.fb.getAuth()
        auth.onAuthStateChanged((user: any) => {
            console.log(user)
            if (user) {
                this.user = user
            }
        });
    },
    methods: {
        async loginWithGoogle() {
            alert("loginWithGoogle")
            alert("url:: " + window.location.href)
            const auth = this.fb.getAuth()
            // console.warn("is PWA:: ", window.matchMedia('(display-mode: standalone)').matches);
            // alert("is PWA:: " + window.matchMedia('(display-mode: standalone)').matches)
            let isPWA = window.matchMedia('(display-mode: standalone)').matches
            // signInWithRedirect(auth, new GoogleAuthProvider()).then((res) => {
            //     console.log("res", res)
            //     getRedirectResult(auth)
            // }).catch((error: any) => {
            //     console.log(error)
            //     alert(error.message)
            // });
            await signInWithPopup(auth, new GoogleAuthProvider()).then((res) => {
                console.log("res", res)
                const credential = GoogleAuthProvider.credentialFromResult(res);
                const token = credential?.accessToken;
                console.warn("credential:: ", credential)
                console.warn("token:: ", token)
                this.user = res.user
                signInWithCredential(auth, GoogleAuthProvider.credential(credential?.idToken)).then((r) => {
                    console.warn("signInWithCredential ", r)
                })
            }).catch((error: any) => {
                console.log(error)
                const credential = GoogleAuthProvider.credentialFromError(error);
                alert(error.message)
            });

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
        },
        getFromRedirectLogin() {
            const auth = this.fb.getAuth()
            getRedirectResult(auth);
        },
    }
}
</script>
