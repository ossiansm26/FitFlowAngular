<template>
  <v-container>
    <BackHome />
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
            <v-col cols="12">
              <v-menu v-model="menu" :close-on-content-click="false" transition="scale-transition" offset-y
                min-width="auto">
                <template v-slot:activator="{ on }">
                  <v-text-field v-model="user.age" label="Fecha de Nacimiento" readonly v-on="on"
                    required></v-text-field>
                </template>
                <v-date-picker v-model="user.age" @input="menu = false" scrollable></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field v-model="user.email" label="Email" required type="email"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="user.password" label="Contraseña" required type="password"></v-text-field>
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
import User from '../models/User';
import BackHome from '../components/navbar/BackHome.vue';

export default {
  components: {
    BackHome
  },
  data() {
    return {
      BackHome,
      user: new User("", "", new Date(), "", "", new Date(), "", "", "", ""),
      menu: false
    };
  },
  created() {
    this.user.age = new Date().toISOString().substr(0, 10);

  },
  methods: {
    async registrarUsuario() {
      try {
        console.log('Registrando usuario:', this.user);
        const response = await axios.post('http://localhost:3001/api/user/createUser', this.user);
        console.log('Usuario registrado:', response.data);
        this.$router.push({ name: 'usuarios' });
      } catch (error) {
        console.error('Error al registrar usuario:', error);
      }
    }
  }
};
</script>