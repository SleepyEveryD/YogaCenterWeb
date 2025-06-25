<template>
  <div class="container">
    <TextOverImg :text=" 'You only live once.But if you do it right,once is enough.'" :img="'https://uxaykvqxewglsxwdxtan.supabase.co/storage/v1/object/sign/img/course/9.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81ZGZiNjYyYy01N2JhLTRmNzEtYTRkYi05YTg2ZjFkY2VlZDMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWcvY291cnNlLzkuanBnIiwiaWF0IjoxNzUwNTE0OTk0LCJleHAiOjE3ODIwNTA5OTR9._2zNAqmfrJlFBoUMx62q1Omk-jETogy20psTrMe9oDY'" />
  </div>
  <div class="container">
    <ActivitiesSection />
    <LeftImageRightText
        imageUrl="https://uxaykvqxewglsxwdxtan.supabase.co/storage/v1/object/sign/img/course/6.avif?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81ZGZiNjYyYy01N2JhLTRmNzEtYTRkYi05YTg2ZjFkY2VlZDMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWcvY291cnNlLzYuYXZpZiIsImlhdCI6MTc1MDUxNTA0MiwiZXhwIjoxNzgyMDUxMDQyfQ.s4GVvZfA9Q-fknf6GP_tMVFKxp3NplOq2rJEu223liE"
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