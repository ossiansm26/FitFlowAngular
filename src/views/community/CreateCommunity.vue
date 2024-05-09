<template>
  <v-container>
    <v-form @submit.prevent="createCommunity">
      <v-text-field v-model="newCommunity.name" label="Nombre"></v-text-field>
      <v-textarea v-model="newCommunity.description" label="Descripción"></v-textarea>
      <v-btn type="submit" color="primary">Crear comunidad</v-btn>
    </v-form>
  </v-container>
</template>

<script>
import axios from 'axios';
import Community from '@/models/Community';

export default {
  data() {
    return {
      newCommunity: new Community(),
      userId: ''
    };
  },
  mounted() {
    this.userId = localStorage.getItem('userId');
    console.log('ID de usuario:', this.userId);
  },
  methods: {
    createCommunity() {
      axios.post(`http://localhost:3001/api/community/create/${this.userId}`, this.newCommunity)
        .then(response => {
          console.log('Comunidad creada exitosamente:', response.data);
          this.$router.push({ name: 'community' });
           
        })
        .catch(error => {
      
          console.error('Error al crear comunidad:', error);
        });
    }
  }
};
</script>

<style scoped>
/* Estilos opcionales */
</style>
