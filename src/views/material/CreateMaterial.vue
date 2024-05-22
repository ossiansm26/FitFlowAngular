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
                v-model="material.availabilityStatus"
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

    <CustomDialog
      :loading="loading"
      :error-text="errorText"
      :success-text="successText"
      :route-on-success="routeOnSuccess"
      :route-on-error="routeOnError"
      @close="showDialog = false"
    ></CustomDialog>
  </v-container>
</template>

<script>
import axios from "axios";
import Material from "@/models/Material";
import BackBar from "@/components/navbar/BackBar.vue";
import CustomDialog from "@/components/dialogs/CustomDialog.vue";

export default {
  components: {
    BackBar,
    CustomDialog
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
      showDialog: false,
      loading: false,
      successText: "",
      errorText: "",
      routeOnSuccess: "",
      routeOnError: ""
    };
  },
  computed: {
    formattedLastMaintenance() {
      return this.material.lastMaintenance
        ? new Date(this.material.lastMaintenance).toLocaleDateString()
        : "";
    }
  },
  methods: {
    async submitForm() {
      this.loading = true;
      try {
        console.log("Registrando material:", this.material);
        const response = await axios.post(
          "http://localhost:3001/api/material",
          this.material
        );
        console.log("Material registrado:", response.data);
        this.successText = "¡Material registrado con éxito!";
        this.routeOnSuccess = "/ruta-exito";
      } catch (error) {
        console.error("Error al registrar material:", error);
        this.errorText = "Error al registrar el material. Por favor, inténtalo de nuevo.";
        this.routeOnError = "/ruta-error";
      } finally {
        this.showDialog = true;
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
</style>
