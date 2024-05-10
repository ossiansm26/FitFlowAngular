<template>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center" @click="goBack">
        <v-img
          alt="FitFLow Logo"
          class="shrink mr-2"
          contain
          src="https://raw.githubusercontent.com/ossiansm26/FitFlow/main/images/fitflow-home.png"
          transition="scale-transition"
          width="55"
        />
         <v-img
            alt="FitFlow name"
            class="shrink mt-1 hidden-sm-and-down"
            contain
            min-width="100"
            src="https://raw.githubusercontent.com/ossiansm26/FitFlow/main/images/logo-texto.png"
            width="200"
          />
      </div>
      <v-spacer></v-spacer>
      <v-avatar color="indigo" size="57">
        <img :src="userImageUrl" alt="User Image">
      </v-avatar>
    </v-app-bar>
  </template>
  
  <script>
  export default {
    data() {
      return {
        userImageUrl: ''
      }
    },
    mounted() {
      this.fetchUserImage();
    },
    methods: {
      goBack() {
        window.history.go(-1);
      },fetchUserImage() {
      const cachedLogoImage = localStorage.getItem('cachedLogoImage');
      if (cachedLogoImage) {
        console.log('Using cached user image2:', cachedLogoImage);
        this.userImageUrl = cachedLogoImage;
      } else {
        const nameImg = localStorage.getItem('userImg');
        if (nameImg) {
          this.userImageUrl = `http://localhost:3001/api/file/download/${nameImg}`;
          console.log('User image fetched:', this.userImageUrl);
          localStorage.setItem('cachedLogoImage', this.userImageUrl);
        } else {
          console.error('No image name found in localStorage');
        }
      }
    }
  }
    
  }
  </script>
  
  <style>
  
  </style>
  