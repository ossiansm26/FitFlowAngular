<template>
  <v-container>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img alt="FitFlow Logo" class="shrink mr-2" contain src="https://raw.githubusercontent.com/ossiansm26/FitFlow/main/images/logo-hombre.png" transition="scale-transition" width="55" />
        <v-img alt="FitFlow name" class="shrink mt-1 hidden-sm-and-down" contain min-width="100" src="https://raw.githubusercontent.com/ossiansm26/FitFlow/main/images/logo-texto.png" width="200" />
      </div>
    </v-app-bar>
    <v-layout justify-center row wrap>
      <!-- Tarjeta para Registrar Usuario -->
      <v-flex xs12 sm6 md4>
        <v-card class="mx-4" @click="registrarUsuario">
          <v-img src="https://raw.githubusercontent.com/ossiansm26/FitFlow/main/images/mujerPesas.png" aspect-ratio="1"></v-img>
          <v-card-title class="headline text">Registrar Usuario</v-card-title>
        </v-card>
      </v-flex>
      <!-- Tarjeta para Ver Usuarios -->
      <v-flex xs12 sm6 md4>
        <v-card class="mx-4" style="background-color:" @click="verUsuarios">
          <v-img src="https://raw.githubusercontent.com/ossiansm26/FitFlow/main/images/gimnasio-con-usuarios.jpg" aspect-ratio="1"></v-img>
          <v-card-title class="headline text">Ver Usuarios</v-card-title>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6 md4>
        <v-card class="mx-4" @click="verMaterial">
          <v-img src="https://raw.githubusercontent.com/ossiansm26/FitFlowSpringBoot/main/images/material.png" aspect-ratio="1"></v-img>
          <v-card-title class="headline text">Material</v-card-title>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6 md4>
        <v-card class="mx-4" @click="verEjercicios">
          <v-img src="ruta_de_la_imagen" aspect-ratio="1"></v-img>
          <v-card-title class="headline text">Ejercicios</v-card-title>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6 md4>
        <v-card class="mx-4" @click="verRutinas">
          <v-img src="https://github.com/ossiansm26/FitFlowSpringBoot/blob/main/images/rutinas.png" aspect-ratio="1"></v-img>
          <v-card-title class="headline text">Rutinas</v-card-title>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6 md4>
        <v-card class="mx-4" @click="verComunidad">
          <v-img src="https://raw.githubusercontent.com/ossiansm26/FitFlowSpringBoot/main/images/comunidades.png" aspect-ratio="1"></v-img>
          <v-card-title class="headline text">Comunidad</v-card-title>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6 md4>
        <v-card class="mx-4" @click="verLogros">
          <v-img src="https://raw.githubusercontent.com/ossiansm26/FitFlowSpringBoot/main/images/4895b8fa-9430-4f24-9173-53d44c69bfb2.png" aspect-ratio="1"></v-img>
          <v-card-title class="headline text">Logros</v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  methods: {
    registrarUsuario() {
      this.$router.push({ name: 'reguistrarUsuario' });
    },
    verUsuarios() {
      this.$router.push({ name: 'usuarios' });
    },
    verMaterial() {
      this.$router.push({ name: 'material' });
    },
    verEjercicios() {
      this.$router.push({ name: 'exercices' });
    },
    verRutinas() {
      this.$router.push({ name: 'routine' });
    },
    // Añadir más métodos para otras rutas aquí
    verComunidad() {
      this.$router.push({ name: 'community' });
    },
    verLogros() {
      this.$router.push({ name: 'achievement' });
    }
  }
}
</script>

<style scoped>
.text {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
