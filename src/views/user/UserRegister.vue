<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card>
          <v-card-title class="headline center">Registro de Usuario</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="registrarUsuario">
              <div class="form-group">
                <label for="name">Nombre</label>
                <input v-model="user.name" type="text" class="form-control" id="name" required>
              </div>
              <div class="form-group">
                <label for="lastNames">Apellidos</label>
                <input v-model="user.lastNames" type="text" class="form-control" id="lastNames" required>
              </div>
              <div class="form-group">
                <v-menu
                  v-model="menu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field v-model="user.dateOfBirth" label="Fecha de Nacimiento" readonly v-on="on" required></v-text-field>
                  </template>
                  <v-date-picker v-model="user.dateOfBirth" @input="menu = false" scrollable></v-date-picker>
                </v-menu>
              </div>
              <div class="form-group">
                <label for="email">Email</label>
                <input v-model="user.email" type="email" class="form-control" id="email" required>
              </div>
              <div class="form-group">
                <label for="password">Contraseña</label>
                <input v-model="user.password" type="password" class="form-control" id="password" required>
              </div>
              <div class="form-group">
                <label for="phoneNumber">Número de Teléfono</label>
                <input v-model="user.phoneNumber" type="text" class="form-control" id="phoneNumber" required>
              </div>
              <div class="form-group">
                <label for="address">Dirección</label>
                <input v-model="user.address" type="text" class="form-control" id="address" required>
              </div>
              <div class="form-group">
                <label for="image">Imagen</label>
                <vue-dropzone
                  @vdropzone-success="onDropSuccess"
                  ref="dropzone"
                  :id="'dropzoneId'"
                  :options="dropzoneOptions"
                >
                  <div class="dropzone"></div>
                </vue-dropzone>
                <v-btn class="mt-2" color="error" v-if="user.image" @click="removeUserImage()">Eliminar Imagen</v-btn>
              </div>
              <button type="submit" class="btn btn-primary">Registrar</button>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <CustomDialog
      :loading="loading"
      :error-text="errorText"
      :success-text="successText"
      :route-on-success="routeOnSuccess"
      @close="handleDialogClose"
    ></CustomDialog>
  </v-container>
</template>

<script>
import axios from 'axios';
import User from '@/models/User';
import VueDropzone from "vue2-dropzone";
import CustomDialog from '@/components/dialogs/CustomDialog.vue';


export default {
  components: {
    VueDropzone,
    CustomDialog,
  },
  data() {
    return {
      user: new User("", "", new Date(), "", "", new Date(), "", "", "User", "", ""),
      menu: false,
      dropzoneOptions: {
        url: "http://localhost:3001/api/file/upload",
        maxFilesize: 10, // MB
        acceptedFiles: "image/*",
      },
      loading: false,
      errorText: "",
      successText: "",
      routeOnSuccess: "",
    };
  },
  methods: {
    async registrarUsuario() {
      this.loading = true;
      try {
        this.user.registrationDate = new Date().toISOString().substr(0, 10);
        console.log('Registrando usuario:', this.user);
        const response = await axios.post('http://localhost:3001/api/user/createUser', this.user);
        console.log('Usuario registrado:', response.data);
        this.successText = "¡Usuario registrado con éxito!";
        this.routeOnSuccess = { name: 'login' };
      } catch (error) {
        console.error('Error al registrar usuario:', error);
        this.errorText = 'Error al registrar usuario. Por favor, inténtelo de nuevo.';
      } finally {
        this.loading = false;
      }
    },
    onDropSuccess(file) {
      console.log("Archivo subido:", file.upload.filename);
      this.user.image = file.upload.filename;
    },
    removeUserImage() {
      this.user.image = '';
      this.$refs.dropzone.removeAllFiles();
    },
    handleDialogClose() {
      this.successText = "";
      this.errorText = "";
    },
    getImageUrl(image) {
      return image ? `http://localhost:3001/uploads/${image}` : '';
    }
  }
};
</script>

<style scoped>
.center {
  text-align: center;
}
.imagePicture {
  width: 100%;
  max-width: 200px;
  margin-bottom: 10px;
}
.v-menu__content {
  z-index: 1000 !important;
}
</style>
