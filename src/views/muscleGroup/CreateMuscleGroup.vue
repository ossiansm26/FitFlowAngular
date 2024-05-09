<template>
  <div>
    <v-container>
      <v-form @submit.prevent="crearObjeto">
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="nuevoObjeto.groupName"
              label="Nombre del grupo"
              required
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="nuevoObjeto.bodyPart"
              label="Parte del cuerpo"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <label for="muscleImage">Imagen del músculo:</label>
            <vue-dropzone
              @vdropzone-success="onDropSuccess"
              ref="dropzone"
              :id="'dropzoneId'"
              :options="dropzoneOptions"
            >
             
            </vue-dropzone>
            <v-btn
              @click="removeMuscleImage"
              class="mt-2"
              color="error"
              v-if="nuevoObjeto.muscleImage"
              >Eliminar Imagen</v-btn
            >
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-btn type="submit" class="mt-2" color="primary"
              >Crear Objeto</v-btn
            >
          </v-col>
        </v-row>
      </v-form>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import VueDropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import MuscleGroup from '@/models/MuscleGroup';

export default {
  name: "CrearObjeto",
  components: {
    VueDropzone,
  },
  data() {
    return {
      nuevoObjeto: new MuscleGroup("", "", ""),
      dropzoneOptions: {
        url: "http://localhost:3001/api/file/upload" ,
        maxFilesize: 10, // MB
        acceptedFiles: "image/*",
      },
    };
  },
  methods: {
    async crearObjeto() {
      axios.post("http://localhost:3001/api/muscleGroup/create", this.nuevoObjeto)
        .then(() => {
          console.log("Objeto creado");
          this.$router.push({ name: "muscleGroup" });
        })
        .catch((error) => {
          console.error(error);
        });
    },
    removeMuscleImage() {
      this.nuevoObjeto.muscleImage = "";
      this.$refs.dropzone.removeAllFiles();
    },
    onDropSuccess(file) {
      console.log("Archivo subido:", file.upload.filename);
      this.nuevoObjeto.muscleImage = file.upload.filename;
    },
  },
};
</script>
