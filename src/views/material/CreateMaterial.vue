<template>
  <v-container>
    <BackBar />
    <v-card>
      <v-card-title>Registro de Material</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="submitForm">
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="material.materialName"
                label="Nombre del Material"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-switch
                v-model="material.avalibilityStatus"
                label="Estado de Disponibilidad"
              ></v-switch>
            </v-col>
            <v-col cols="12">
              <v-menu
                v-model="menu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="formattedLastMaintenance"
                    label="Último Mantenimiento"
                    readonly
                    v-on="on"
                    required
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="material.lastMaintenance"
                  @input="menu = false"
                  scrollable
                ></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
          <v-btn type="submit" color="primary">Registrar Material</v-btn>
        </v-form>
      </v-card-text>
    </v-card>


    <v-dialog v-model="loading" persistent max-width="400">
      <v-card color="white" dark elevation="0">
        <v-card-text class="text-center">
          <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular>
          <br />
          <div class="black--text">Cargando...</div>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="errorMaterial" max-width="400">
      <v-card color="white" dark elevation="0">
        <v-card-text class="text-center">
          <v-icon size="64" color="error">mdi-alert-circle</v-icon>
          <br />
          <div class="black--text">No se pudo guardar el material.</div>
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-btn color="error" @click="handleErrorOK">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="success" max-width="400">
      <v-card color="white" dark elevation="0">
        <v-card-text class="text-center">
          <v-icon size="64" color="success">mdi-check-circle</v-icon>
          <br />
          <div class="black--text">Material registrado exitosamente!</div>
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-btn color="success" @click="handleSuccessOK">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import axios from "axios";
import Material from "@/models/Material";
import BackBar from "@/components/navbar/BackBar.vue";
import router from "@/router";

export default {
  components: {
    BackBar,
  },
  data() {
    return {
      material: new Material(
        null,
        "",
        false,
        new Date().toISOString().substr(0, 10)
      ),
      menu: false,
      loading: false,
      success: false,
      errorMaterial: false,
    };
  },
  computed: {
    formattedLastMaintenance() {
      return this.material.lastMaintenance
        ? new Date(this.material.lastMaintenance).toLocaleDateString()
        : "";
    },
  },
  methods: {
    async submitForm() {
      try {
        this.loading = true;
        console.log("Registrando material:", this.material);
        const response = await axios.post(
          "http://localhost:3001/api/material",
          this.material
        );
        console.log("Material registrado:", response.data);
        this.success = true;
      } catch (eror) {
        console.error("Error al registrar material:", eror);
        this.errorMaterial = true;
      } finally {
        this.loading = false;
      }
    },
    handleSuccessOK() {
      this.success = false;
      router.push({ name: "material" });
    },
    handleErrorOK() {
      this.errorMaterial = false;
      router.push({ name: "material" });
    },
  },
};
</script>

<style scoped>
</style>
