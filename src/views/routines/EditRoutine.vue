<template>
  <v-container>
    <h2>Edit Routine</h2>
    <v-form @submit.prevent="saveChanges">
      <v-text-field v-model="editedRoutine.description" label="Description"></v-text-field>
      <v-text-field v-model="editedRoutine.category" label="Category"></v-text-field>
      <v-checkbox v-model="editedRoutine.status" label="Status"></v-checkbox>
      <v-text-field v-model="editedRoutine.start" label="Start" type="datetime-local"></v-text-field>
      <v-text-field v-model="editedRoutine.end" label="End" type="datetime-local"></v-text-field>
      <v-textarea v-model="editedRoutine.coachsComments" label="Coach's Comments"></v-textarea>
      <!-- Add more fields as needed -->

      <v-btn color="primary" type="submit">Save Changes</v-btn>
    </v-form>
  </v-container>
</template>

<script>
import axios from 'axios'; 
import Routine from '@/models/routine';
export default {
  data() {
    return {
      editedRoutine: new Routine("", "", "", "", "", "", [])
    };
  },mounted() {
    const routineId = localStorage.getItem('selectedRoutineId'); 
    this.fetchRoutineDetails(routineId);
  },
  methods: {
    fetchRoutineDetails(routineId) {
      axios.get(`http://localhost:3001/api/routine/getById/${routineId}`)
        .then(response => {
          this.editedRoutine = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    saveChanges() {
      axios.put(`http://localhost:3001/api/routine/update/${this.editedRoutine.id}`, this.editedRoutine)
        .then(() => {
          this.$router.push({ name: 'routine' });
        })
        .catch(error => {
          console.error('Error saving routine:', error);
        });
    }
  },
  
};
</script>

<style scoped>
/* Estilos CSS opcionales */
</style>
