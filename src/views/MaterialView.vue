<template>
  <v-container>
    <h2 class="headline">Detalles de los Materiales</h2>
    <v-row v-if="materials.length > 0">
      <v-col v-for="material in materials" :key="material.id" cols="12">
        <v-card>
          <v-card-text>
            <v-list dense>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title><strong>ID:</strong> {{ material.id }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title><strong>Nombre:</strong> {{ material.materialName }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    <strong>Disponibilidad:</strong>
                    {{ material.availabilityStatus ? 'Disponible' : 'No disponible' }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title><strong>Último mantenimiento:</strong> {{ formattedLastMaintenance(material) }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-btn color="primary" @click="editMaterial(material)">Editar</v-btn>
                <v-btn color="error" @click="deleteMaterial(material.id)">Borrar</v-btn>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-progress-linear v-else indeterminate color="primary"></v-progress-linear>
    
    <!-- Botón para añadir material -->
    <v-btn color="success" @click="addMaterial">Añadir Material</v-btn>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      materials: []
    };
  },
  methods: {
    formattedLastMaintenance(material) {
      return new Date(material.lastMaintenance).toLocaleString();
    },
    editMaterial(material) {
     this.$router.push({ name: 'editMaterial', params: { material } });
      console.log('Editar material:', material);
    },
    deleteMaterial(materialId) {
      axios.delete(`http://localhost:3001/api/material/${materialId}`)
        .then(() => {
          this.materials = this.materials.filter(material => material.id !== materialId);
        })
        .catch(error => {
          console.error('Error al borrar el material:', error);
        });
        
      console.log('Borrar material con ID:', materialId);
    },
    addMaterial() {
      this.$router.push({ name: 'addMaterial' });
      console.log('Añadir nuevo material');
    }
  },
  mounted() {
    axios.get('http://localhost:3001/api/material')
      .then(response => {
        this.materials = response.data;
        console.log('Materiales cargados:', this.materials);
      })
      .catch(error => {
        console.error('Error al cargar los detalles de los materiales:', error);
      });
  }
};
</script>

<style scoped>

</style>
