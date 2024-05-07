<template>
    <v-container>
      <h2 class="display-4 mb-4">Detalles de la Rutina</h2>
      <v-card class="mb-4">
        <v-card-title>{{ routine.description }}</v-card-title>
        <v-card-text>
          <p>Categoría: {{ routine.category }}</p>
          <p v-if="routine.status" class="text-success">Estado: Activo</p>
          <p v-else class="text-danger">Estado: Inactivo</p>
          <p>Comentarios del Entrenador: {{ routine.coachsComments }}</p>
          <p>Fecha de Inicio: {{ formatDate(routine.start) }}</p>
          <p>Fecha de Fin: {{ formatDate(routine.end) }}</p>
          <p>Lista de Ejercicios:</p>
          <ul>
            <li v-for="(exercise, index) in routine.exercicesCollection" :key="index">{{ exercise }}</li>
          </ul>
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script>
  import Routine  from '@/models/routine';
  import axios from 'axios';
  export default {
    data() {
      return {
        routine: new Routine("", "", "", "", "", "", [])
      };
    },
    mounted() {
      const routineId = localStorage.getItem('selectedRoutineId');
      this.fetchRoutineDetails(routineId);
    },
    methods: {
      fetchRoutineDetails(routineId) {
       axios.get(`http://localhost:3001/api/routine/${routineId}`)
         .then(response => {
           this.routine = response.data;
         })
         .catch(error => {
           console.error(error);
         });
      },
      formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES');
      }
    }
  };
  </script>
  
  <style scoped>
  /* Estilos específicos para esta pantalla de detalle */
  </style>
  