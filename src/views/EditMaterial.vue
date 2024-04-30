<template>
    <v-container>
      <h2 class="headline">Editar Material</h2>
      <v-card>
        <v-card-text>
          <v-form @submit.prevent="submitForm">
            <v-text-field v-model="editedMaterial.materialName" label="Nombre del Material"></v-text-field>
            <v-checkbox v-model="editedMaterial.availabilityStatus" label="Disponibilidad"></v-checkbox>
            <v-btn type="submit" color="primary">Guardar Cambios</v-btn>
            <v-btn @click="cancelEdit" color="error">Cancelar</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        editedMaterial: {
          id: null,
          materialName: '',
          availabilityStatus: false,
          lastMaintence:''
        }
      };
    },
    methods: {
        submitForm() {
        axios.put(`http://localhost:3001/api/material/update/${this.editedMaterial.id}`, this.editedMaterial)
        .then(() => {
        this.$router.push({ name: 'material' }); 
        })
        .catch(error => {
        console.error('Error al guardar los cambios del material:', error);
         });
        console.log('Enviar cambios del material:', this.editedMaterial);
    },

      cancelEdit() {
        this.$router.push({ name: 'material' });
        console.log('Cancelar edición');
      }
    },
    mounted() {
      
        this.editedMaterial = this.$route.params.material; 
       console.log('ID del material:', this.editedMaterial.id);
    }
  };
  </script>
  
  <style scoped>
  /* Estilos opcionales */
  </style>