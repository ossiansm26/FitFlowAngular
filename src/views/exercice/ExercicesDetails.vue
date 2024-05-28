<template>
  <v-container>
    <BackBar />
    <h2 class="display-4 mb-4">Detalles del Ejercicio</h2>
    <v-card class="mb-4">
      <v-card-title>{{ exercise.exerciseName }}</v-card-title>
      <v-card-text>
        <v-img
          class="exercise-image"
          :src="getImageUrl(exercise.urlImage)"
          :alt="exercise.exerciseName"
          contain
        ></v-img>
        <p><strong>Duración:</strong> {{ exercise.duration }} minutos</p>
        <p><strong>Descripción:</strong> {{ exercise.description }}</p>
        <p><strong>Intensidad (1-10):</strong> {{ exercise.feelings }}</p>
        <p><strong>Material Necesario:</strong></p>
        <ul>
          <li v-for="(item, index) in exercise.material" :key="index">{{ item }}</li>
        </ul>
        <v-btn color="primary"  @click="addMaterial">Añadir Material</v-btn>
        <p><strong>Grupos Musculares:</strong></p>
        <ul>
          <li v-for="(group, index) in exercise.muscleGroup" :key="index">{{ group }}</li>
        </ul>
        <v-btn color="primary"  @click="addMuscleGroup">Añadir Grupo Muscular</v-btn>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import BackBar from '@/components/navbar/BackBar.vue';
import axios from 'axios';
import Exercices from '@/models/Exercices.ts';
import router from '@/router';

export default {
  components: {
    BackBar
  },
  data() {
    return {
      exercise: new Exercices('', '', '', '', '', '', [], [], [])
    };
  },
  mounted() {
    const exerciseId = localStorage.getItem('selectedExerciseId');
    this.fetchExerciseDetails(exerciseId);
  },
  methods: {
    fetchExerciseDetails(exerciseId) {
      axios.get(`http://localhost:3001/api/exercices/getExerciseById/${exerciseId}`)
        .then(response => {
          console.log(response.data);
          this.exercise = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    getImageUrl(imageName) {
      return `http://localhost:3001/api/file/download/${imageName}`;
    },
    addMaterial() {
      localStorage.setItem('exerciseId', this.exercise.id);
      router.push({ name: 'material' });
    },
    addMuscleGroup() {
      localStorage.setItem('exerciseId', this.exercise.id);
      router.push({ name: 'muscleGroup' });
    }
  }
};
</script>

<style scoped>
.exercise-image {
  width: 100%;
  height: 300px;
  object-fit: contain;
  margin-bottom: 20px;
}
</style>