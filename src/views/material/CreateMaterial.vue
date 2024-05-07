<template>
  <v-container>
    <BackHome />
    <v-card>
      <v-card-title>Registro de Material</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="registrarMaterial">
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field v-model="material.materialName" label="Nombre del Material" required></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-select v-model="material.availabilityStatus" :items="[true, false]" label="Estado de Disponibilidad"
                required></v-select>
            </v-col>
            <v-col cols="12">
              <v-menu v-model="menu" :close-on-content-click="false" transition="scale-transition" offset-y
                min-width="auto">
                <template v-slot:activator="{ on }">
                  <v-text-field v-model="material.lastMaintenance" label="Último Mantenimiento" readonly v-on="on"
                    required></v-text-field>
                </template>
                <v-date-picker v-model="material.lastMaintenance" @input="menu = false" scrollable></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
          <v-btn type="submit" color="primary">Registrar Material</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios';
import Material from '@/models/Material';
import BackHome from '@/components/navbar/BackHome.vue';

export default {
  components: {
    BackHome
  },
  data() {
    return {
      material: new Material(null, '', true, new Date().toISOString().substr(0, 10)),
      menu: false
    };
  },
  methods: {
    async registrarMaterial() {
      try {
        console.log('Registrando material:', this.material);
        const response = await axios.post('http://localhost:3001/api/material', this.material);
        console.log('Material registrado:', response.data);
        this.$router.push({ name: 'material' });
      } catch (error) {
        console.error('Error al registrar material:', error);
      }
    }
  }
};
</script>