<template>
  <div class="dark flex min-h-screen flex-col bg-background">
    <NuxtLoadingIndicator />
    <Navbar />
    <main class="mt-25 dark flex flex-grow items-center justify-center lg:mt-10">
      <NuxtPage />
    </main>
    <UiToastToaster position="bottom-center" />
    <UiVueSonner position="bottom-center" />
  </div>
</template>

<script setup lang="ts">
  const route = useRoute();
  const hideNav = computed(() => {
    return route.meta["noNav"];
  });
</script>

<style>
  .page-enter-active,
  .page-leave-active {
    transition: all 0.2s;
  }
  .page-enter-from,
  .page-leave-to {
    opacity: 0;
    filter: blur(2rem);
  }
</style>
