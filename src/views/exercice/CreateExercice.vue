<template>
    <v-container>
      <h1>Create Exercise</h1>
      <v-form @submit.prevent="createExercise">
        <v-text-field v-model="exercise.id" label="ID" required></v-text-field>
        <v-text-field v-model="exercise.exerciseName" label="Exercise Name" required></v-text-field>
        <v-text-field v-model.number="exercise.duration" label="Duration" required></v-text-field>
        <v-text-field v-model="exercise.description" label="Description"></v-text-field>
        <v-text-field v-model.number="exercise.repetitions" label="Repetitions" required></v-text-field>
        <p>Add your feelings about this exercise</p>
        <v-rating
        v-model="exercise.feelings"
        background-color="grey"
        color="yellow accent-4"
        dense
        half-increments
        hover
        size="100"
      ></v-rating>


        <v-btn type="submit" color="primary">Create</v-btn>
      </v-form>
    </v-container>
  </template>
  
  <script>
  import axios from 'axios';
  import Exercices from '@/models/Exercices';
  
  export default {
    data() {
      return {
        exercise: new Exercices('', '', 0, '',0,0,0) 
      };
    },
    methods: {
      async createExercise() {
        try {
          const response = await axios.post('/api/exercises', this.exercise);
          console.log(response.data);
          // Lógica adicional después de crear el ejercicio
        } catch (error) {
          console.error('Error creating exercise:', error);
        }
      }
    }
  };
  </script>
  