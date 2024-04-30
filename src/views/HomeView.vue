<template>
  <v-container>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img alt="FitFLow Logo" class="shrink mr-2" contain
          src="https://raw.githubusercontent.com/ossiansm26/FitFlow/main/images/logo-hombre.png"
          transition="scale-transition" width="55" />
        <v-img alt="FitFlow name" class="shrink mt-1 hidden-sm-and-down" contain min-width="100"
          src="https://raw.githubusercontent.com/ossiansm26/FitFlow/main/images/logo-texto.png" width="200" />
      </div>
    </v-app-bar>
    <v-layout justify-center row wrap>
      <v-flex xs12 sm6 md4>
        <v-card class="mx-4" @click="registrarUsuario">
          <v-img src="https://raw.githubusercontent.com/ossiansm26/FitFlow/main/images/mujerPesas.png"
            aspect-ratio="1"></v-img>
          <v-card-title class="headline text">Registrar Usuario</v-card-title>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6 md4>
        <v-card class="mx-4" style="background-color:" @click="verUsuarios">
          <v-img src="https://raw.githubusercontent.com/ossiansm26/FitFlow/main/images/gimnasio-con-usuarios.jpg"
            aspect-ratio="1"></v-img>
          <v-card-title class="headline text">Ver Usuarios</v-card-title>
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
