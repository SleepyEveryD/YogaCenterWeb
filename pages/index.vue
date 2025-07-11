<template>
  <div class="container">
    <TextOverImg :text=" 'You only live once.But if you do it right,once is enough.'" :img="'assets/img/course/9.jpg'" />
  </div>
  <div class="container">
    <ActivitiesSection />
    <LeftImageRightText
        imageUrl="assets/img/course/6.avif"
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
    />


  </div>
  <div class="container">
    <TeachersSession></TeachersSession>
  </div>
</template>

<script setup>

</script>