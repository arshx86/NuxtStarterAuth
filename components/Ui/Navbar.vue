<template>
  <div>
    <UiNavbar>
      <UiContainer class="flex h-14 items-center justify-between border border-b-0">
        <p class="font-semibold">Alptraume</p>
        <nav class="hidden items-center gap-5 sm:flex">
          <NuxtLink
            v-for="l in links"
            :key="l"
            class="text-sm text-muted-foreground transition-colors hover:text-foreground"
            to="/"
            >{{ l }}</NuxtLink
          >
        </nav>
      </UiContainer>
    </UiNavbar>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        links: ["Home"],
      };
    },
  };
</script>
