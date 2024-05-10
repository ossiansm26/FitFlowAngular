<template>
  <v-container>
    <BackBar />
    <v-card>
      <v-card-title>Lista de Ejercicios</v-card-title>
      <v-card-text>
        <table class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre de la Colección</th>
              <th>Nivel de Dificultad</th>
              <th>Total de Ejercicios</th>
              <th>Video Explicativo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="exercise in exercises" :key="exercise.id">
              <td>{{ exercise.id }}</td>
              <td>{{ exercise.collectionName }}</td>
              <td>{{ exercise.difficultyLevel }}</td>
              <td>{{ exercise.totalExercices }}</td>
              <td>
                <iframe
                  title="Exercise Video"
                  width="560"
                  height="315"
                  :src="getYouTubeEmbedUrl(exercise.urlExplanatoryVideo)"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </td>
              <td>
                <v-btn icon color="primary" @click="editExercise(exercise)">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon color="error" @click="deleteExercise(exercise.id)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </table>
      </v-card-text>
      <div class="floating-button">
        <v-btn fab dark color="green" @click="yourFunctionHere">
          <v-icon dark>mdi-plus</v-icon>
        </v-btn>
      </div>
    </v-card>
  </v-container>
</template>

<script>
import BackBar from '@/components/navbar/BackBar.vue';
import axios from 'axios';

export default {
  components: {
    BackBar,
  },
  data() {
    return {
      exercises: [],
    };
  },
  mounted() {
    this.fetchExercises();
  },
  methods: {
    fetchExercises() {
      axios.get('http://localhost:3001/api/collectionExercices')
        .then(response => {
          this.exercises = response.data;
        })
        .catch(error => {
          console.error('Error fetching exercises:', error);
        });
    },
    getYouTubeEmbedUrl(url) {
      const videoId = url.split('v=')[1];
      return `https://www.youtube.com/embed/${videoId}`;
    },
    editExercise(exercise) {
      // Lógica para editar un ejercicio
    },
    deleteExercise(exerciseId) {
      // Lógica para borrar un ejercicio
    },
    addExercise() {
      // Lógica para añadir un nuevo ejercicio
    },
  }
};
</script>

<style>
.floating-button {
  
    position: fixed;
    bottom: 20px;
    right: 20px;
  
}
</style>
