
<template>
  <div class="container">
    <Breadcrumbs :crumbs="breadcrumbItems" />
  </div>

</template>

<script setup lang="ts">
import Breadcrumbs from "@/components/Breadcrumbs.vue";
const breadcrumbItems = [
  { label: "Home", url: "/" },
];

</script>

<style scoped>

</style>ase