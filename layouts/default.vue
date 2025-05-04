<template>
  <div>
    <TopBar />
    <div class="container">

    </div>

    <slot></slot>

    <Footer/>
  </div>
</template>

<script setup lang="ts">
import BreadCrumbs from "~/components/BreadCrumbs.vue";
import Footer from "~/components/Footer.vue";


</script>
