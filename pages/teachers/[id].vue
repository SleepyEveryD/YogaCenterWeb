<template>
  <Head>
    <Title>Team member - Helping Hands</Title>
  </Head>
  <BreadCrumbs :crumbs="BCrumbs" />
  <div class="back-button-container">
    <div class="back-button-single">
      <BackButton />
    </div>
  </div>

  <!--previous and next link-->

  <div class="person-container">
    <img :src="person.img" class="image" alt="Person image" />
    <div class="person-title">
      <div class="title-page font-bold">
        {{ person.name }} {{ person.surname }}
      </div>
      <div class="person-info">
        <div class="flex-1 overflow-y-auto max-h-64 pr-2">
          <div class="flex flex-wrap items-center gap-3">
            <span class="font-semibold text-gray-700">Teach:</span>
            <span
                v-for="teach in person.Teach"
                :key="teach.Course.id"
                class="px-4 py-1 bg-gray-200 text-gray-800 rounded-full text-base"
            >
      <NuxtLink
          :to="`/activities/${teach.Course.id}`"
          class="hover:underline"
      >
        {{ teach.Course.name }}
      </NuxtLink>
    </span>
          </div>
        </div>


        <div class="">Description: {{ person.description }}</div>
        <div class="person-cv">
          <NuxtLink :to="person.CV" target="_blank" class="cv">See {{ person.name }}'s CV</NuxtLink>
        </div>
      </div>
    </div>
  </div>


</template>

<script setup>
const route = useRoute();
const person = await $fetch("/api/teachers/" + route.params.id);
const { data: peopleCount } = await useFetch("/api/peopleCount");

const nextLink = person.id + 1 > peopleCount.value ? 1 : person.id + 1;
const previousLink = person.id - 1 < 1 ? peopleCount.value : person.id - 1;
</script>

<script>
export default {
  computed: {
    BCrumbs() {
      return [
        {
          label: "home",
          url: "/",
        },

        {
          label: "our team",
          url: "/our_team",
        },
      ];
    },
  },
};
</script>

<style scoped>
.back-button-container {
  display: flex;
  margin: 2vw;
}

.back-button-single {
  position: relative;
  left: 2vw;
  top: 0.5vw;
}


.person-title {
  align-self: start;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  font-family: Jost;
  font-size: 1.8vw;
  font-weight: 300;
  text-align: left;
  height: 100%;
}

.title-page {
  text-align: left;
}

.person-info {
  padding-top: 3vw;
}

.image {
  border-radius: 50vw;
  border: 2px solid black;
  width: 37%;
}

.person-container {
  display: flex;
  flex-direction: row;
  padding: 5.5vw;
  padding-top: 4vw;
  padding-bottom: 4vw;
  gap: 10vw;
  justify-content: center;
  padding-right: 20vw;
}

.person-name-surname {
  font-size: 4vw;
  font-weight: 1000;
}

.person-description {
  font-size: 2.3vh;
  font-weight: 300;
  font-family: Jost;
  background-color: #48a6a7;
  display: flex;
  padding-left: 5.5vw;
  padding-right: 5.5vw;
  padding-top: 2vw;
  padding-bottom: 2vw;
  gap: 2vw;
  margin-top: 1vw;
}

.title-description {
  font-family: Jost;
  font-size: 2.5vw;
  font-weight: 1000;
  text-align: left;
  padding-left: 5.5vw;
  padding-right: 5.5vw;
  padding-top: 5.5vw;
  padding-bottom: 1vw;
}

.carousel-container {
  justify-content: center;
}

.link {
  text-align: center;
  font-family: Jost;
  font-size: 1.3vw;
  font-weight: 300;
  text-align: left;
  color: #B6244F;
  text-decoration: underline;
}
.link:hover {
  text-decoration: none;
}

.person-cv {
  padding-top: 1vw;
}

.cv{
  font-family: Jost;
  font-weight: 300;
  color: #B6244F;
  text-decoration: underline;
}

.cv:hover {
  text-decoration: none;
}

@media screen and (max-width: 850px) {

  .image{
    align-items: center;
    width: 70%;
  }

  .person-container {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: center;
    padding-right: 0;
    gap: 0;
    margin-bottom: 3vh;
    padding: 0;
  }

  .person-title {
    align-self: center;
    align-items: center;
    text-align: center;
    padding-top: 2vw;
  }

  .person-name-surname {
    font-size: 2.6vh;
  }

  .person-info, .person-role, .person-email, .person-phone, .person-cv, .person-description {
    font-size: 2.3vh;
  }

  .person-description {
    text-align: center;
  }

  .title-description{
    font-size: 2vh;
  }

  .link {
    font-size: 2.3vh;
    text-align: center;
  }

  .carousel-container {
    margin-bottom: 3vh;
  }

  .cv{
    color: #B6244F;
    text-align: center;
  }
}
</style>
