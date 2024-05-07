<template>
    <div>
        <v-container>
            <v-form @submit.prevent="crearObjeto">
                <v-row>
                    <v-col cols="12">
                        <v-text-field v-model="nuevoObjeto.groupName" label="Nombre del grupo" required></v-text-field>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="12">
                        <v-text-field v-model="nuevoObjeto.bodyPart" label="Parte del cuerpo" required></v-text-field>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="12">
                        <label for="muscleImage">Imagen del músculo:</label>
                        <vue-dropzone @vdropzone-success="onDropSuccess" ref="dropzone" :id="'dropzoneId'"
                            :options="dropzoneOptions">
                            <img src="upload-icon.png" alt="Upload Icon" style="width: 100px; height: 100px;">
                        </vue-dropzone>
                        <v-btn @click="removeMuscleImage" class="mt-2" color="error"
                            v-if="nuevoObjeto.muscleImage">Eliminar Imagen</v-btn>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="12">
                        <v-btn type="submit" class="mt-2" color="primary">Crear Objeto</v-btn>
                    </v-col>
                </v-row>
            </v-form>
        </v-container>
    </div>
</template>

<script>
import axios from 'axios';
import VueDropzone from 'vue2-dropzone';
import 'vue2-dropzone/dist/vue2Dropzone.min.css';

export default {
    name: 'CrearObjeto',
    components: {
        VueDropzone,
    },
    data() {
        return {
            nuevoObjeto: {
                groupName: '',
                bodyPart: '',
                muscleImage: '',
            },
            dropzoneOptions: {
                url: 'http://localhost:3001/api/file/upload',
                maxFilesize: 10, // MB
                acceptedFiles: 'image/*',
            }
        };
    },
    methods: {
        async crearObjeto() {
            try {
                const formData = new FormData();
                formData.append('groupName', this.nuevoObjeto.groupName);
                formData.append('bodyPart', this.nuevoObjeto.bodyPart);
                formData.append('muscleImage', this.nuevoObjeto.muscleImage);

                const response = await axios.post(this.dropzoneOptions.url, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                console.log('Ruta del archivo:', response.data);

                this.nuevoObjeto.groupName = '';
                this.nuevoObjeto.bodyPart = '';
                this.nuevoObjeto.muscleImage = '';
                this.$refs.dropzone.removeAllFiles();
            } catch (error) {
                console.error('Error al crear objeto:', error);
            }
        },
        removeMuscleImage() {
            this.nuevoObjeto.muscleImage = ''; 
            this.$refs.dropzone.removeAllFiles(); 
        },
        onDropSuccess(file) {
            console.log('Archivo subido:', file.upload.filename);
            this.nuevoObjeto.muscleImage = file.upload.filename;
        },
    },
};
</script>