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
          <v-card-actions>
            <v-btn color="red" @click="deleteCommunity(community.id)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
            <v-btn color="blue" @click="editCommunity(community.id)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn color="purple" @click="viewCommunity(community.id)">
              <v-icon>mdi-eye</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-btn class="create-btn" color="success" fab large @click="createCommunity">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
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
    const userId = localStorage.getItem('userId');
    this.fetchData(userId);
  },
  methods: {
    fetchData(userId) {
      axios.get(`http://localhost:3001/api/user/getCommunity/${userId}`)
        .then(response => {
          this.communitys = response.data;
        })
        .catch(error => {
          console.error('Error al obtener los datos:', error);
        });
    },
    deleteCommunity(communityId) {
      axios.delete(`http://localhost:3001/api/community/Delete/${communityId}`)
        .then(() => {
          this.communitys = this.communitys.filter(c => c.id !== communityId);
        })
        .catch(error => {
          console.error('Error al eliminar la comunidad:', error);
        });
    },
    editCommunity(communityId) {
      localStorage.setItem('selectedCommunityId', communityId);
      this.$router.push({ name: 'editCommunity'});
    },
    viewCommunity(communityId) {
       localStorage.setItem('selectedCommunityId', communityId);
        this.$router.push({ name: 'communityDetails'});
    },
    createCommunity() {
      this.$router.push({ name: 'communityCreate'});
    }
  }
}
</script>

<style scoped>
.card {
  margin-bottom: 20px;
}
.create-btn {
  position: fixed;
  right: 20px;
  bottom: 20px;
}
</style>
