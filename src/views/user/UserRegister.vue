<template>
  <v-container>
    <v-card>
      <v-card-title>Registro de Usuario</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="registrarUsuario">
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field v-model="user.name" label="Nombre" required></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field v-model="user.lastNames" label="Apellidos" required></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-menu v-model="menu" :close-on-content-click="false" transition="scale-transition" offset-y min-width="auto">
                <template v-slot:activator="{ on }">
                  <v-text-field v-model="user.dateOfBirth" label="Fecha de Nacimiento" readonly v-on="on" required></v-text-field>
                </template>
                <v-date-picker v-model="user.dateOfBirth" @input="menu = false" scrollable></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field v-model="user.email" label="Email" required type="email"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field v-model="user.password" label="Contraseña" required type="password"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field v-model="user.phoneNumber" label="Número de Teléfono" required></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field v-model="user.address" label="Dirección" required></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <vue-dropzone
              @vdropzone-success="onDropSuccess"
              ref="dropzone"
              :id="'dropzoneId'"
              :options="dropzoneOptions">
              <div class="dropzone">
                
              </div>
            </vue-dropzone>
            <v-btn
              class="mt-2"
              color="error"
              v-if="user.image"
              >Eliminar Imagen</v-btn
            >
            </v-col>
          </v-row>
          <v-btn type="submit" color="primary">Registrar</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios';
import User from '@/models/User';
import VueDropzone from "vue2-dropzone";

export default {
  components: {
    VueDropzone
  },
  data() {
    return {
      user: new User("", "", new Date(), "", "", new Date(), "", "", "User", "",""),
      menu: false,
      dropzoneOptions: {
        url: "http://localhost:3001/api/file/upload" ,
        maxFilesize: 10, // MB
        acceptedFiles: "image/*",
      }
     };
  },
  created() {
    localStorage.clear();
    this.user.dateOfBirth = new Date().toISOString().substr(0, 10);
  },
  methods: {
    async registrarUsuario() {
      try {
        this.user.registrationDate = new Date().toISOString().substr(0, 10);

        console.log('Registrando usuario:', this.user);
        const response = await axios.post('http://localhost:3001/api/user/createUser', this.user);
        console.log('Usuario registrado:', response.data);
        this.$router.push({ name: 'login' });
      } catch (error) {
        console.error('Error al registrar usuario:', error);
      }
    },
    onDropSuccess(file) {
      console.log("Archivo subido:", file.upload.filename);
      this.user.image = file.upload.filename;
    }
  }
};
</script>
