<template>
  <div class="container">

  </div>
  <div class="container">
    <PageTitle :short-description="'They are all the best teachers in the world'" :title="'Teachers'" />
  </div>

  <div id="IndexPage" class="mt-4 max-w-[1200px] mx-auto px-2">
    <div class="grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-4">
      <div v-if="teachers" v-for="teacher in teachers" :key="teacher">
        <TeacherComponent :teacher="teacher"/>
      </div>
    </div>
  </div>

</template>
<script setup lang="ts">

const breadcrumbItems = [
  { label: "Home", url: "/" },
  { label: "Teachers", url: "/Teachers" }, // "Activity"
];
import {compileScript} from "@vue/compiler-sfc";

const client = useSupabaseClient();
// 1. 先获取所有老师
const { data: teachers } = await client
    .from('Teacher')
    .select(`
    id,
    name,
    surname,
    description,
    img,
    Teach ( Course:course(id,name))
  `)


// 2. 为每个老师获取课程
</script>

