<template>
    <v-container>
      <BackBar />
      <h2 class="display-4 mb-4">Detalles del Ejercicio</h2>
      <v-card class="mb-4">
        <v-card-title>{{ exercise.exerciseName }}</v-card-title>
        <v-card-text>
          <p><strong>Duración:</strong> {{ exercise.duration }} minutos</p>
          <p><strong>Descripción:</strong> {{ exercise.description }}</p>
          <p><strong>Intensidad (1-10):</strong> {{ exercise.feelings }}</p>
          <p><strong>Material Necesario:</strong></p>
          <ul>
            <li v-for="(item, index) in exercise.material" :key="index">{{ item }}</li>
          </ul>
          <p><strong>Grupos Musculares:</strong></p>
          <ul>
            <li v-for="(group, index) in exercise.muscleGroup" :key="index">{{ group }}</li>
          </ul>
        </v-card-text>
      </v-card>
    </v-container>
  </template>

  <script>
    import BackBar from '@/components/navbar/BackBar.vue';
    import axios from 'axios';
    import Exercise from '@/models/exercise';
    import Material from '@/models/material';
    import MuscleGroup from '@/models/muscleGroup';

    export default {
      components: {
        BackBar
      },
      data() {
        return {
          exercise: new Exercise('', '', '', '', '', '', [], [], [])
        };
      },
      mounted() {
        const exerciseId = localStorage.getItem('selectedExerciseId');
        this.fetchExerciseDetails(exerciseId);
      },
      methods: {
        fetchExerciseDetails(exerciseId) {
          axios.get(`http://localhost:3001/api/exercise/getExerciseById/${exerciseId}`)
            .then(response => {
              console.log(response.data);
              this.exercise = response.data;
            })
            .catch(error => {
              console.error(error);
            });
        }
      }
    };
    </script>


