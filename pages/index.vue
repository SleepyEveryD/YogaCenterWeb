<template>
  <div class="container">
    <TextOverImg :text=" 'You only live once.But if you do it right,once is enough.'" :img="'https://uxaykvqxewglsxwdxtan.supabase.co/storage/v1/object/sign/img/course/9.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5XzRlY2E2ZWQxLTNjY2MtNGU0ZS05NTk4LWJhNjRiYzg1OGM2MyJ9.eyJ1cmwiOiJpbWcvY291cnNlLzkuanBnIiwiaWF0IjoxNzQ2MzI3MDIxLCJleHAiOjE3Nzc4NjMwMjF9.Tj8kMkSezJS27r3nKF0jHL-MbDuUW0Ht3j0PUEddNRA'" />
  </div>
  <div class="container">
    <ActivitiesSection />
    <LeftImageRightText
        imageUrl="https://uxaykvqxewglsxwdxtan.supabase.co/storage/v1/object/sign/img/course/6.avif?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5XzRlY2E2ZWQxLTNjY2MtNGU0ZS05NTk4LWJhNjRiYzg1OGM2MyJ9.eyJ1cmwiOiJpbWcvY291cnNlLzYuYXZpZiIsImlhdCI6MTc0NjMyODQyNywiZXhwIjoxNzc3ODY0NDI3fQ.6C1cgNRrjQCcPttalw1feaiVhUJeutvDfxVb4ea4taA"
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
// No props needed for this static quote component
// Can be enhanced with props for dynamic content if needed
import TextOverImg from "~/components/TextOverImg.vue";
import TeachersSession from "~/components/TeachersSession.vue";
</script>