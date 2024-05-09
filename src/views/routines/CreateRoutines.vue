<template>
  <v-container>
    <h2>Crear Nueva Rutina</h2>
    <v-form @submit.prevent="crearRutina">
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field label="Descripción" v-model="routine.description"></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field label="Categoría" v-model="routine.category"></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-checkbox label="Estado" v-model="routine.status"></v-checkbox>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field label="Inicio" type="date" v-model="routine.start"></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field label="Fin" type="date" v-model="routine.end"></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-textarea label="Comentarios del Entrenador" v-model="routine.coachsComments"></v-textarea>
        </v-col>
        <v-col cols="12">
          <v-btn type="submit" color="primary">Crear Rutina</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import axios from 'axios';
import Routine from '@/models/routine';

export default {
  data() {
    return {
      routine: new Routine("", "", "", "", "", "", ""),
      userId: null
    };
  },
  created() {
    this.userId = localStorage.getItem('userId');
    console.log(this.userId); // Corregido: acceder a userId con this
  },
  methods: {
    crearRutina() {
      const nuevaRutina = this.routine;
      axios.post(`http://localhost:3001/api/user/createRoutine/${this.userId}`, nuevaRutina)
        .then(() => {
          console.log('Rutina creada');
          this.$router.push({ name: 'routine' });
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
};
</script>

<style scoped>
</style>
