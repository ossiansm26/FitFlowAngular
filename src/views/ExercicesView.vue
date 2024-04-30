<template>
    <v-container>
      <v-card v-if="exercise">
        <v-card-title>{{ exercise.exerciseName }}</v-card-title>
        <v-card-text>
          <p><strong>ID:</strong> {{ exercise.id }}</p>
          <p><strong>Duration:</strong> {{ exercise.duration }}</p>
          <p><strong>Description:</strong> {{ exercise.description }}</p>
          <div>
            <strong>Materials:</strong>
            <ul>
              <li v-for="(material, index) in exercise.material" :key="index">{{ material }}</li>
            </ul>
          </div>
          <div>
            <strong>Muscle Groups:</strong>
            <ul>
              <li v-for="(muscle, index) in exercise.muscleGroup" :key="index">{{ muscle }}</li>
            </ul>
          </div>
        </v-card-text>
      </v-card>
      <v-alert v-else>No se encontraron datos de ejercicio.</v-alert>
    </v-container>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        exercise: []
      };
    },
    mounted() {
      axios.get(`http://localhost:3001/api/exercise`)
        .then(response => {
          this.exercise = response.data;
        })
        .catch(error => {
          console.error('Error fetching exercise data:', error);
        });
    },
    methods: {
      
    }
  };
  </script>
  
  <style scoped>
  /* Agrega estilos
  