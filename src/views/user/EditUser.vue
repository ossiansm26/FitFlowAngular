<template>
  <v-container>
    <BackBar/>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card>
          <v-card-title class="headline center">Editar Ejercicio</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="saveExercise">
              <div class="form-group">
                <label for="exerciseName">Nombre del Ejercicio</label>
                <input v-model="exercise.exerciseName" type="text" class="form-control" id="exerciseName" required>
              </div>
              <div class="form-group">
                <label for="duration">Duración (min)</label>
                <input v-model="exercise.duration" type="text" class="form-control" id="duration" required>
              </div>
              <div class="form-group">
                <label for="description">Descripción</label>
                <input v-model="exercise.description" type="text" class="form-control" id="description" required>
              </div>
              <div class="form-group">
                <label for="picture">Imagen</label>
                <img class="exercise-image" :src="exercise.urlImage ? getImageUrl(exercise.urlImage) : ''" :alt="exercise.exerciseName">
                <vue-dropzone
                  @vdropzone-success="onDropSuccess"
                  ref="exerciseImageDropzone"
                  :id="'exercise-image-dropzone'"
                  :options="dropzoneOptions">
                  <div class="dropzone"></div>
                </vue-dropzone>
              </div>
              <button type="submit" class="btn btn-primary">Guardar Cambios</button>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import BackBar from '@/components/navbar/BackBar.vue';
import axios from 'axios';
import Exercices from '@/models/Exercices.ts';
import router from '@/router';
import VueDropzone from 'vue2-dropzone';

export default {
  components: {
    BackBar,
    VueDropzone
  },
  data() {
    return {
      exercise: new Exercices('', '', '', '', [], [], []),
      dropzoneOptions: {
        url: "http://localhost:3001/api/file/upload",
        maxFilesize: 10, // MB
        acceptedFiles: "image/*",
      }
    };
  },
  mounted() {
    const exerciseId = localStorage.getItem('selectedExerciseId');
    this.fetchExerciseDetails(exerciseId);
  },
  methods: {
    fetchExerciseDetails(exerciseId) {
      axios.get(`http://localhost:3001/api/exercices/getExerciseById/${exerciseId}`)
        .then(response => {
          this.exercise = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    getImageUrl(imageName) {
      return `http://localhost:3001/api/file/download/${imageName}`;
    },
    onDropSuccess(file) {
      this.exercise.urlImage = file.upload.filename;
    },
    saveExercise() {
      axios.post(`http://localhost:3001/api/exercices/update/${this.exercise.id}`, this.exercise)
        .then(response => {
          router.push({ name: 'exercices' });
        })
        .catch(error => {
          console.error('Error updating exercise:', error);
        });
    }
  }
};
</script>

<style scoped>
.center {
  display: flex;
  justify-content: center;
}
.exercise-image {
  display: flex;
  justify-content: center;
  width: 200px;
  height: auto;
}
</style>
