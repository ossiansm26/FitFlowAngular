<template>
  <v-container>
    <BackBar />
    <v-form @submit.prevent="createCommunity">
      <v-text-field v-model="newCommunity.name" label="Nombre"></v-text-field>
      <v-textarea v-model="newCommunity.description" label="Descripción"></v-textarea>
      <vue-dropzone
        @vdropzone-success="onDropSuccess"
        ref="dropzone"
        :id="'dropzoneId'"
        :options="dropzoneOptions"
      ></vue-dropzone>
      <v-btn @click="removeCommunityImage" 
        class="mt-2"
        color="error"
        v-if="newCommunity.urlpicture"
      >Eliminar Imagen</v-btn>
      <v-btn type="submit" color="primary">Crear comunidad</v-btn>
    </v-form>
  </v-container>
</template>

<script>
import axios from 'axios';
import Community from '@/models/Community';
import BackBar from '@/components/navbar/BackBar.vue';
import VueDropzone from "vue2-dropzone";

export default {
  components: {
    BackBar,
    VueDropzone
  },
  data() {
    return {
      newCommunity: new Community(),
      userId: '',
      dropzoneOptions: {
        url: "http://localhost:3001/api/file/upload",
        maxFilesize: 10, // MB
        acceptedFiles: "image/*",
      },
    };
  },
  mounted() {
    this.userId = localStorage.getItem('userId');
  },
  methods: {
    createCommunity() {
      axios.post(`http://localhost:3001/api/community/create/${this.userId}`, this.newCommunity)
        .then(response => {
          this.$router.push({ name: 'community' });
        })
        .catch(error => {
          console.error('Error al crear comunidad:', error);
          
        });
    },
    removeCommunityImage() {
      this.newCommunity.urlpicture = '';
    },
    onDropSuccess(file) {
      this.newCommunity.urlpicture = file.upload.filename;
    },
  }
};
</script>

<style scoped>

</style>
