<template>
    <v-container>
      <BackBar />
      <v-card v-for="(exercise, index) in exercises" :key="index" class="mb-4">
        <v-card-title class="headline">{{ exercise.exerciseName }}</v-card-title>
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
        <v-card-actions>
          <v-btn color="primary" @click="editExercise(exercise)">Editar</v-btn>
          <v-btn color="error" @click="deleteExercise(exercise.id)">Borrar</v-btn>
        </v-card-actions>
      </v-card>
      <v-alert v-if="exercises.length === 0" class="mt-4">No se encontraron datos de ejercicio.</v-alert>
  
      <v-btn class="floating-btn" color="success" fab large @click="addExercise">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-container>
  </template>
  
  <script>
  import BackBar from '@/components/navbar/BackBar.vue';
import axios from 'axios';
  
  export default {
    data() {
      return {
        exercises: [],
        rating: 0

      };
    },
    mounted() {
      axios.get(`http://localhost:3001/api/exercices`)
        .then(response => {
          this.exercises = response.data;
        })
        .catch(error => {
          console.error('Error fetching exercise data:', error);
        });
    },
    methods: {
      editExercise(exercise) {
        // Lógica para editar un ejercicio
      },
      deleteExercise(exerciseId) {
        axios.delete(`http://localhost:3001/api/exercices/${exerciseId}`)
          .then(() => {
            this.exercises = this.exercises.filter(exercise => exercise.id !== exerciseId);
          })
          .catch(error => {
            console.error('Error deleting exercise:', error);
          });
      },
      addExercise() {
        // Lógica para añadir un nuevo ejercicio
      }
    }
  };
  </script>
  
  <style scoped>
  .headline {
    font-size: 24px;
    margin-bottom: 10px;
  }
  
  .mb-4 {
    margin-bottom: 1.5rem !important;
  }
  
  .mt-4 {
    margin-top: 1.5rem !important;
  }
  
  .floating-btn {
    position: fixed;
    bottom: 20px;
    right: 20px;
  }
  </style>
  
  