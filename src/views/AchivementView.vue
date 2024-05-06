<template>
    <div>
      <v-container>
        <h2 class="display-1">Achievements</h2>
        <v-row v-if="achievements && achievements.length > 0">
          <v-col v-for="achievement in achievements" :key="achievement.id" cols="12">
            <v-card>
              <v-card-title><strong>ID:</strong> {{ achievement.id }}</v-card-title>
              <v-card-text>
                <p><strong>Name:</strong> {{ achievement.achivementName }}</p>
                <p><strong>Description:</strong> {{ achievement.achivementDescription }}</p>
                <p><strong>URL:</strong> <a :href="achievement.achivementURL" target="_blank">{{ achievement.achivementURL }}</a></p>
              </v-card-text>
              <v-card-actions>
                <v-btn color="blue darken-1" @click="editAchievement(achievement)">
                  <v-icon left>mdi-pencil</v-icon>
                 
                </v-btn>
                <v-btn color="red darken-1" @click="deleteAchievement(achievement)">
                  <v-icon left>mdi-delete</v-icon>
                  
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
        <v-row v-else>
          <v-col cols="12">
            <p>No achievements found.</p>
          </v-col>
        </v-row>
        <v-btn color="success" fab dark fixed right bottom @click="addAchievement">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-container>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        achievements: []
      };
    },
    methods: {
      fetchAchievements() {
        axios.get('http://localhost:3001/api/achivement')
          .then(response => {
            this.achievements = response.data;
          })
          .catch(error => {
            console.error('Error fetching achievements:', error);
          });
      },
      editAchievement(achievement) {
        // Implement edit logic here
      },
      deleteAchievement(achievement) {
        axios.delete(`http://localhost:3001/api/achivement/Delete/${achievement.id}`)
          .then(() => {
            this.achievements = this.achievements.filter(a => a.id !== achievement.id);
          })
          .catch(error => {
            console.error('Error deleting achievement:', error);
          });
      },
      addAchievement() {
        // Implement add logic here
      }
    },
    created() {
      this.fetchAchievements(); // Fetching achievements when the component is created
    }
  };
  </script>
  
  <style scoped>
  /* You can add custom styles here */
  </style>
  