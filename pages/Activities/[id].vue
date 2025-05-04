<script setup lang="ts">
import Breadcrumbs from "@/components/Breadcrumbs.vue";


const breadcrumbItems = [
  { label: "Home", url: "/" },
  { label: "Activities", url: "/Activities" }, // "Activity"
];

</script>

<template>
  <div class="container">
  <Breadcrumbs :crumbs="breadcrumbItems" />
  </div>

</template>
