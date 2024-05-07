<template>
  <v-container>
    <h2 class="headline">Editar Material</h2>
    <v-card class="mb-5">
      <v-card-text>
        <v-form @submit.prevent="submitForm">
          <v-text-field v-model="editedMaterial.materialName" label="Nombre del Material" class="mb-4"></v-text-field>
          <v-switch v-model="editedMaterial.availabilityStatus" label="Disponibilidad" class="mb-4"></v-switch>
          <v-menu v-model="menu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition"
            offset-y min-width="auto" class="mb-4">
            <template v-slot:activator="{ on }">
              <v-text-field v-model="editedMaterial.lastMaintenance" label="Último mantenimiento" readonly
                v-on="on"></v-text-field>
            </template>
            <v-date-picker v-model="editedMaterial.lastMaintenance" no-title></v-date-picker>
          </v-menu>
          <v-btn type="submit" color="primary" class="mr-4">Guardar Cambios</v-btn>
          <v-btn @click="cancelEdit" color="error">Cancelar</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios';
import Material from '@/models/Material';

export default {
  data() {
    return {
      editedMaterial: {
        id: null,
        materialName: '',
        availabilityStatus: false,
        lastMaintenance: ''
      },
      menu: false
    };
  },
  methods: {
    submitForm() {
      this.editedMaterial.lastMaintenance = new Date(this.editedMaterial.lastMaintenance).toISOString();

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
  }
};
</script>

<style scoped>
.mb-4 {
  margin-bottom: 1rem;
}

.mr-4 {
  margin-right: 1rem;
}
</style>
