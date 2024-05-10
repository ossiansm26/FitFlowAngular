<template>
    <v-container>
      <h1>Create Collection</h1>
      <v-form @submit.prevent="createCollection">
        <v-text-field v-model="collection.id" label="ID" required></v-text-field>
        <v-text-field v-model="collection.collectionName" label="Collection Name" required></v-text-field>
        <v-text-field v-model.number="collection.difficultyLevel" label="Difficulty Level" required></v-text-field>
        <v-text-field v-model="collection.urlExplanatoryVideo" label="URL Explanatory Video"></v-text-field>
        <v-btn type="submit" color="primary">Create</v-btn>
      </v-form>
    </v-container>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        collection: new CollectionExercices('', '', 0, 0, '')
      };
    },
    methods: {
      async createCollection() {
       axios.post('http://localhost:3001/api/collectionExercices/add', this.collection)
        .then(response => {
          console.log('Collection created:', response.data);
          this.$router.push('collectionExercices');
        })
        .catch(error => {
          console.error('Error creating collection:', error);
        });
      }
    }
  };
  
  class CollectionExercices {
    constructor(id, collectionName, difficultyLevel, totalExercises, urlExplanatoryVideo) {
      this.id = id;
      this.collectionName = collectionName;
      this.difficultyLevel = difficultyLevel;
      this.totalExercises = totalExercises;
      this.urlExplanatoryVideo = urlExplanatoryVideo;
      this.exercises = []; // Puedes inicializar más propiedades aquí si es necesario
    }
  }
  </script>
  