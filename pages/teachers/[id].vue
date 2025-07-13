<template>
  <Head>
    <Title>Team member</Title>
  </Head>
  <BreadCrumbs :crumbs="BCrumbs" />

  <div class="back-button-container">
    <BackButton class="back-button" />
  </div>

  <div class="person-container">
    <img :src="person.img" class="person-image" alt="Person image" />

    <div class="person-details">
      <h1 class="person-name">{{ person.name }} {{ person.surname }}</h1>

      <div class="person-teach">
        <span class="label">Teaches:</span>
        <div class="teach-tags">
          <span
              v-for="teach in person.Teach"
              :key="teach.Course.id"
              class="tag"
          >
            <NuxtLink :to="`/activities/${teach.Course.id}`" class="link">
              {{ teach.Course.name }}
            </NuxtLink>
          </span>
        </div>
      </div>

      <p class="person-description">{{ person.description }}</p>

      <div class="person-cv">
        <NuxtLink :to="person.CV" target="_blank" class="cv-link">
          See {{ person.name }}'s CV
        </NuxtLink>
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
        { label: "home", url: "/" },
        { label: "our team", url: "/our_team" },
      ];
    },
  },
};
</script>

<style scoped>
.back-button-container {
  margin: 2rem;
}

.back-button {
  margin-left: 1rem;
}

.person-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 4rem;
  padding: 4rem 2rem;
}

.person-image {
  border-radius: 9999px;
  border: 2px solid #000;
  width: 300px;
  object-fit: cover;
}

.person-details {
  max-width: 600px;
  font-family: 'Jost', sans-serif;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.person-name {
  font-size: 2rem;
  font-weight: 700;
}

.person-teach .label {
  font-weight: 600;
  color: #555;
}

.teach-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.tag {
  background-color: #eee;
  color: #333;
  padding: 0.4rem 0.8rem;
  border-radius: 9999px;
  font-size: 0.9rem;
}

.link:hover {
  text-decoration: underline;
}

.person-description {
  font-size: 1rem;
  color: #444;
  line-height: 1.6;
}

.cv-link {
  color: #b6244f;
  text-decoration: underline;
  font-weight: 500;
}

.cv-link:hover {
  text-decoration: none;
}

@media (max-width: 768px) {
  .person-container {
    flex-direction: column;
    align-items: center;
    padding: 2rem 1rem;
  }

  .person-details {
    text-align: center;
  }
}
</style>
