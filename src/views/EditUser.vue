<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card>
          <v-card-title class="headline">Edit User</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="saveUser">
              <v-text-field v-model="user.name" label="Name" required></v-text-field>
              <v-text-field v-model="user.lastNames" label="Last Names" required></v-text-field>
              <v-text-field v-model="user.age" label="Age" type="date" required></v-text-field>
              <v-text-field v-model="user.email" label="Email" type="email" required></v-text-field>
              <v-text-field v-model="user.password" label="Password" type="password" required></v-text-field>
              <v-text-field v-model="user.phoneNumber" label="Phone Number" required></v-text-field>
              <v-text-field v-model="user.address" label="Address" required></v-text-field>
              <v-btn type="submit" color="primary">Save</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import User from '@/models/User';
import axios from 'axios';
export default {
  data() {
    return {
      user: new User()
    };
  },
  created() {
    this.user = this.$route.params.user;
  },
  methods: {
    saveUser() {
      axios.put(`http://localhost:3001/api/user/${this.user.id}`, this.user)
        .then(() => {
          this.$router.push({ name: 'usuarios' });
        })
        .catch(error => {
          console.error('Error saving user:', error);
        });
    }
  }
};
</script>

<style scoped>
</style>
