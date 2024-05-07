<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card>
          <v-card-title class="headline center">Edit User</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="saveUser">
              <div class="form-group">
                <label for="name">Name</label>
                <input v-model="user.name" type="text" class="form-control" id="name" required>
              </div>
              <div class="form-group">
                <label for="lastNames">Last Names</label>
                <input v-model="user.lastNames" type="text" class="form-control" id="lastNames" required>
              </div>
              <div class="form-group">
                <label for="age">Age</label>
                <input v-model="user.age" type="date" class="form-control" id="age" required>
              </div>
              <div class="form-group">
                <label for="email">Email</label>
                <input v-model="user.email" type="email" class="form-control" id="email" required>
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <input v-model="user.password" type="password" class="form-control" id="password" required>
              </div>
              <div class="form-group">
                <label for="phoneNumber">Phone Number</label>
                <input v-model="user.phoneNumber" type="text" class="form-control" id="phoneNumber" required>
              </div>
              <div class="form-group">
                <label for="address">Address</label>
                <input v-model="user.address" type="text" class="form-control" id="address" required>
              </div>
              <button type="submit" class="btn btn-primary">Save</button>
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
import BackHome from '../../components/navbar/BackHome.vue';

export default {
  comments: {
    BackHome
  },
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
.center {
  display: flex;
  justify-content: center;
}
</style>
