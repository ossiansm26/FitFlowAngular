<template>
    <v-container>
        <v-layout justify-center>
            <v-flex xs12 sm8 md4>
                <v-card>
                    <v-card-title class="text-center">Inicio de Sesión</v-card-title>
                    <v-card-text>
                        <v-form ref="form" v-model="valid">
                            <v-text-field v-model="user.email" label="Usuario" required></v-text-field>
                            <v-text-field v-model="user.password" label="Contraseña" type="password"
                                required></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="login" :disabled="!valid">Iniciar Sesión</v-btn>
                        <v-btn color="success" @click="goToRegistration">Registrarse</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import axios from 'axios';
import router from '@/router';
import User from '../../models/User';

export default {
    data() {
        return {
            user: new User("", "", new Date(), "", "", new Date(), "", "", "User", ""),
            valid: true
        };
    },
    methods: {
        login() {
            axios.put('http://localhost:3001/api/user/login', this.user)
                .then(response => {
                    console.log('Usuario autenticado:', response.data);
                    router.push({ name: 'routine', params: { id: response.data.id } }); 
                }).catch(error => {
                    console.error('Error al autenticar usuario:', error);
                });
        },
        goToRegistration() {
            router.push({ name: 'reguistrarUsuario' });
        }
    }
};
</script>

<style></style>