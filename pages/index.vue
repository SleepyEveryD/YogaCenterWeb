<template>
  <div class="w-full overflow-x-hidden"> <!-- 添加外层容器防止水平滚动 -->
    <div class="container mx-auto px-4"> <!-- 添加容器和水平内边距 -->
      <TextOverImg :text=" 'You only live once.But if you do it right,once is enough.'" :img="'/img/course/9.jpg'"  />
    </div>

    <div class="container mx-auto px-4"> <!-- 添加容器和水平内边距 -->
      <ActivitiesSection />
      <LeftImageRightText
          imageUrl="/img/course/6.avif"
          imageAlt=""
          title="Practice anywhere you want: in-studio, live streaming, or video"
          description="Puoi seguire la lezione in studio a Milano oppure praticare in diretta streaming. Con i video on demand puoi rivedere le lezioni registrate e accedere a brevi video con pratiche e approfondimenti."
          :features="[
          'Instruction by certified yoga instructors',
          'Studio classes in central Milan',
          'Live interactive streaming sessions',
          '200+ on-demand video classes',
          'Suitable for all skill levels'
        ]"
          ctaText="Contact us now"
          ctaLink="/contact_us"
      />
    </div>

    <div class="container mx-auto px-4"> <!-- 添加容器和水平内边距 -->
      <TeachersSession></TeachersSession>
    </div>
  </div>
</template>

<script setup>

</script>