<template>
  <v-container>
    <BackBar />
    <v-card>
      <v-card-title>{{ community.name }}</v-card-title>
      <v-card-text>
        <div><strong>ID:</strong> {{ community.id }}</div>
        <div><strong>Descripción:</strong> {{ community.description }}</div>
        <div v-if="community.post.length > 0">
          <strong>Publicaciones:</strong>
          <ul>
            <li v-for="(post, index) in community.post" :key="index">{{ post.title }}</li>
          </ul>
        </div>
        <div v-else>No hay publicaciones disponibles</div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import BackBar from '@/components/navbar/BackBar.vue';
import axios from 'axios';
import { VContainer, VCard, VCardTitle, VCardText } from 'vuetify/lib';

export default {
  components: {
    VContainer,
    VCard,
    VCardTitle,
    VCardText,
    BackBar
  },
  data() {
    return {
      community: null
    };
  },
  mounted() {
    const communityId = localStorage.getItem('selectedCommunityId');
    this.fetchCommunityDetails(communityId);
  },
  methods: {
    fetchCommunityDetails(communityId) {
      axios.get(`http://localhost:3001/api/community/getCommunityById/${communityId}`)
        .then(response => {
          console.log('Comunidad cargada exitosamente:', response.data);
          this.community = response.data;
        })
        .catch(error => {
          console.error('Error al cargar detalles de la comunidad:', error);
        });
    }
  }
};
</script>

<style scoped>
/* Estilos opcionales */
</style>
