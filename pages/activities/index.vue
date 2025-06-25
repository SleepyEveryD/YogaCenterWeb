
<template>
  <div class="container">

  </div>
  <div class="container">
    <PageTitle :short-description="'They are all the best activities in the world'" :title="'Activities'" />
  </div>

  <div id="IndexPage" class="mt-4 max-w-[1200px] mx-auto px-2">
    <div class="grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-4">
      <div v-if="activities" v-for="activity in activities" :key="activity">
        <ActivityComponent :activity="activity"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">


const client = useSupabaseClient();

// 使用 useAsyncData 获取所有课程
const { data: activities, error } = await useAsyncData(
    'all-courses',
    async () => {
      const { data, error } = await client
          .from('Course')
          .select(`id, name,description,Type,img, star,Teach(Teacher:teacher(id,name,surname,img)),price, oldPrice`); // 移除了 .single() 以获取所有记录

      if (error) {
        console.error('Supabase error:', error);
        return [];
      }

      return data || []; // 如果 data 为 null，返回空数组
    }
);




</script>

