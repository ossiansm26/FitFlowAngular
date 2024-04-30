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
    </v-app-bar>
  </template>
  
  <script>
  export default {
    methods: {
      goBack() {
        window.history.go(-1);
      }
    }
  }
  </script>
  
  <style>
  
  </style>
  