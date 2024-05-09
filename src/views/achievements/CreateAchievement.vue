<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h2>Nuevo Logro</h2>
        <v-form @submit.prevent="crearLogro">
          <v-text-field v-model="logro.achievementName" label="Nombre del Logro" required></v-text-field>
          <v-textarea v-model="logro.achievementDescription" label="Descripción del Logro" required></v-textarea>
          <v-text-field v-model="logro.achievementURL" label="URL del Logro" required></v-text-field>
          <v-btn color="primary" type="submit">Crear Logro</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';
import Achievement from '@/models/Achievement';

export default {
  data() {
    return {
      logro: new Achievement('', '', '')
    };
  },
  methods: {
    async crearLogro() {
      try {
        await axios.post('http://localhost:3001/api/achievement/add', this.logro);
        console.log('Logro creado:', this.logro);
        this.$router.push('achievement');
      } catch (error) {
        console.error('Error al crear el logro:', error);
      }
    }
  }
};
</script>

<style scoped>
/* Estilos específicos de esta vista, si es necesario */
</style>
