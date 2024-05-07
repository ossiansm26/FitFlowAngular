<template>
    <v-container>
      <v-row>
        <v-col v-for="community in communitys" :key="community.id" cols="12" md="6">
          <v-card class="mb-4">
            <v-card-title>{{ community.name }}</v-card-title>
            <v-card-text>{{ community.description }}</v-card-text>
            <v-card-subtitle>Posts:</v-card-subtitle>
            <v-list>
              <v-list-item v-for="post in community.post" :key="post.id">
                <v-list-item-content>{{ post.title }}</v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </v-container>  
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        communitys: []
      };
    },
    mounted() {
      this.fetchData();
    },
    methods: {
      fetchData() {
        axios.get('http://localhost:3001/api/community')
          .then(response => {
            this.communitys = response.data;
          })
          .catch(error => {
            console.error('Error al obtener los datos:', error);
          });
      }
    }
  }
  </script>
  <style scoped>
  .card {
    margin-bottom: 20px;
  }
  
  </style>