<template>
  <div id="IndexPage" class="mt-4 max-w-[1200px] mx-auto px-2">
    <!-- 修改为更合理的响应式列数 -->
    <div class="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-4">
      <div v-if="teachers" v-for="teacher in teachers" :key="teacher">
        <TeacherComponent :teacher="teacher"/>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">

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
  `) .limit(4);


// 2. 为每个老师获取课程
</script>

