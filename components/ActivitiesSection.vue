<template>
  <div class="container">

    <div id="IndexPage" class="mt-4 max-w-[1200px] mx-auto px-2">
      <div class="grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-4">
        <div v-for="activity in displayedActivities" :key="activity.id">
          <ActivityComponent :activity="activity"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const client = useSupabaseClient();

// Fetch all courses
const { data: allActivities, error } = await useAsyncData(
    'all-courses',
    async () => {
      const { data, error } = await client
          .from('Course')
          .select(`id, name, description, Type, img, star, Teach(Teacher:teacher(id,name,surname,img))`);

      if (error) {
        console.error('Supabase error:', error);
        return [];
      }
      return data || [];
    }
);

// Process activities to display exactly 3
const displayedActivities = computed(() => {
  if (!allActivities.value) return [];

  // Separate starred and non-starred activities
  const starred = allActivities.value.filter(a => a.star);
  const nonStarred = allActivities.value.filter(a => !a.star);

  // Shuffle non-starred activities for randomness
  const shuffledNonStarred = [...nonStarred].sort(() => 0.5 - Math.random());

  // Combine starred first, then fill remaining slots with random non-starred
  const combined = [...starred, ...shuffledNonStarred];

  // Return exactly 3 items
  return combined.slice(0, 3);
});
</script>