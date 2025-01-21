<template>
  <div class="relative flex items-center justify-center">
    <div
      class="absolute h-full w-full bg-[radial-gradient(theme(colors.border/90%)_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]"
    />

    <div class="relative w-full rounded-lg px-5 py-8 lg:w-[400px]">
      <header class="text-center">
        <h1 class="text-4xl font-bold tracking-tight text-emerald-200">NuxtStarter</h1>
        <p class="text-md mt-1 text-muted-foreground">
          {{ isLoggingIn ? "log in to your account" : "create an account" }}
        </p>
      </header>

      <div class="mt-10">
        <fieldset :disabled="isLoading" class="grid gap-5">
          <UiInput label="username" v-model="username" placeholder="Username" />
          <UiInput label="Password" type="password" v-model="password" placeholder="Password" />

          <div class="flex items-center gap-2" v-if="!isLoggingIn">
            <UiCheckbox id="checkbox-terms" v-model:checked="acceptTerms" />
            <UiLabel for="checkbox-terms">
              <span>
                I agree to
                <a href="#" class="text-primary underline">TOS</a>
              </span>
            </UiLabel>
          </div>

          <UiButton
            class="w-full"
            variant="secondary"
            @click="handleSubmit"
            :loading="isLoading"
            :disabled="!formValid"
          >
            {{ isLoggingIn ? "sign in" : "create account" }}
          </UiButton>
        </fieldset>
      </div>

      <p class="mt-8 text-center text-sm text-muted-foreground">
        {{ isLoggingIn ? "Don't have an account?" : "Already have an account?" }}
        <NuxtLink
          @click="isLoggingIn = !isLoggingIn"
          class="font-semibold text-primary underline-offset-2 hover:underline"
          to="#"
        >
          {{ isLoggingIn ? "Register" : "Log in" }}
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

<script>
  import axios from "axios";

  definePageMeta({
    noNav: true,
  });

  export default {
    data() {
      return {
        isLoading: false,
        acceptTerms: false,
        isLoggingIn: true,
        username: "",
        password: "",
      };
    },
    computed: {
      formValid() {
        return this.username && this.password && (this.isLoggingIn || this.acceptTerms);
      },
    },
    watch: {
      isLoggingIn() {
        this.acceptTerms = false;
        this.username = "";
        this.password = "";
      },
    },
    methods: {
      async handleSubmit() {
        this.isLoading = true;
        const payload = {
          username: this.username,
          password: this.password,
        };

        try {
          await axios.post(`/api/${this.isLoggingIn ? "login" : "register"}`, payload);
          toast({
            title: this.isLoggingIn ? "Successfully logged in" : "Successfully registered",
            variant: "success",
          });

          const redirectUrl = new URLSearchParams(window.location.search).get("redirect");
          window.location.href = redirectUrl || "/";
        } catch (error) {
          console.error(error);
          toast({
            title: error.response?.data?.error || "An error occurred",
            variant: "destructive",
          });
        } finally {
          this.isLoading = false;
        }
      },
    },
    mounted() {
      const { loggedIn } = useUserSession();
      if (loggedIn.value === true) {
        this.$router.push("/");
      }
    },
  };
</script>

<style scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
