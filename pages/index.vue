<template>
  <div>
    <header class="flex flex-col gap-2 text-center">
      <h1 class="text-4xl font-bold text-white">NuxtStarterPack</h1>
      <p v-if="user" class="text-lg text-white">
        Welcome, {{ user.username }},
        <span @click="logout()" class="cursor-pointer text-red-900 underline">logout</span>
      </p>
      <p class="text-red-900" v-else>
        You are not logged in
        <NuxtLink class="underline" to="/auth">click here to do it</NuxtLink>
      </p>
    </header>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        user: null,
      };
    },
    methods: {
      logout() {
        const { clear } = useUserSession();
        clear();
        this.user = null;
        this.$router.push("/auth");
      },
    },
    mounted() {
      const { loggedIn, user } = useUserSession();
      if (loggedIn.value) {
        this.user = user;
      }
    },
  };
</script>
