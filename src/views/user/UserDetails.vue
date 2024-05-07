<template>
    <v-container>
      <BackHome/>
      <v-card>
        <v-card-title>Detalles del Usuario</v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" sm="6">
              <strong>Nombre:</strong> {{ user.name }}  
            </v-col>
            <v-col cols="12" sm="6">
              <strong>Apellidos:</strong> {{ user.lastNames }}
            </v-col>
            <v-col cols="12" sm="6">
              <strong>Edad:</strong> {{ calculateAge(user.age) }}
            </v-col>
            <v-col cols="12" sm="6">
              <strong>Email:</strong> {{ user.email }}
            </v-col>
            <v-col cols="12" sm="6">
              <strong>Fecha de Inscripción:</strong> {{ formatDate(user.enrollmentDate) }}
            </v-col>
            <v-col cols="12" sm="6">
              <strong>Número de Teléfono:</strong> {{ user.phoneNumber }}
            </v-col>
            <v-col cols="12" sm="6">
              <strong>Dirección:</strong> {{ user.address }}
            </v-col>
            <v-col cols="12" sm="6">
              <strong>Rol:</strong> {{ user.rol }}
            </v-col>
            <v-col cols="12" sm="6">
              <strong>Especialidad:</strong> {{ user.speciality }}
            </v-col>
            <v-col cols="12">
              <strong>Rutinas Creadas:</strong>
              <ul>
                <li v-for="routine in user.routinesCreated" :key="routine.id">
                  {{ routine.title }}
                </li>
              </ul>
            </v-col>
            <v-col cols="12">
              <strong>Rutinas Asociadas:</strong>
              <ul>
                <li v-for="routine in user.routinesAssociated" :key="routine.id">
                  {{ routine.title }}
                </li>
              </ul>
            </v-col>
            <v-col cols="12">
            </v-col>
            <v-col cols="12">
              <strong>Post creados:</strong>
              <ul>
                <li v-for="post in user.post" :key="post.id">
                  {{ post.title }}
                </li>
              </ul>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script>
  import BackHome from '../../components/navbar/BackHome.vue';
  
  export default {
    name: 'UserDetails',
  components: {
    BackHome,
  },
  props: {
    user: {
      type: Object,
      required: true
    }
  },
    methods: {
      calculateAge(birthDate) {
        const today = new Date();
        const birthDateObj = new Date(birthDate);
        let age = today.getFullYear() - birthDateObj.getFullYear();
        const month = today.getMonth() - birthDateObj.getMonth();
        if (month < 0 || (month === 0 && today.getDate() < birthDateObj.getDate())) {
          age--;
        }
        return age;
      },
      formatDate(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString(undefined, options);
      },
    },
  };
  </script>
  
  <style scoped>

  </style>
  