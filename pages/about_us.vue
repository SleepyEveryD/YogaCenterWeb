import Breadcrumbs from "@/components/Breadcrumbs.vue";
<template>
  <div class="container">
    <Breadcrumbs :crumbs="breadcrumbItems" />
  </div>

</template>

<script setup lang="ts">

const breadcrumbItems = [
  { label: "Home", url: "/" },
];

</script>

<style scoped>

</style>ase