<template>
  <div>
    <div >
      <TextOverImg :text="'Discover the most popular and valuable courses from our platform'" :img="'/img/highlights.png'" />
    </div>
    <div id="IndexPage" class="mt-4 max-w-[1200px] mx-auto px-2">
      <div class="grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-4">
        <div v-for="activity in starredCourses" :key="activity.id">
          <ActivityComponent :activity="activity" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 定义类型
interface Teacher {
  id: string;
  name: string;
  surname: string;
  img: string | null;
}

interface Activity {
  id: string;
  name: string;
  description: string;
  Type: string;
  img: string | null;
  star: boolean;
  Teach: {
    Teacher: Teacher;
  } | null;
  price: number;
  oldPrice: number | null;
}

// 获取 starred 课程
const { data: starredCourses, error } = await useAsyncData('starredCourses', () =>
    $fetch<Activity[]>('/api/starred')
)

</script>
