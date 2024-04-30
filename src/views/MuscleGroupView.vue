<template>
  <v-container>
    <v-row>
      <v-col v-for="(group, index) in muscleGroups" :key="index" cols="12" md="6" lg="4">
        <v-card>
          <v-card-title>{{ group.groupName }}</v-card-title>
          <v-img :src="group.muscleImage" :alt="group.groupName" height="200"></v-img>
          <v-card-text>
            <p><strong>Body Part:</strong> {{ group.bodyPart }}</p>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="editGroup(group)">Editar</v-btn>
            <v-btn color="error" @click="deleteGroup(group.id)">Borrar</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-btn class="create-btn" fab dark fixed bottom right @click="createGroup">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      muscleGroups: []
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get('http://localhost:3001/api/muscleGroup');
        this.muscleGroups = response.data;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    editGroup(group) {
      // Lógica para editar un grupo
      console.log('Editar grupo:', group);
    },
    deleteGroup(groupId) {
      axios.delete(`http://localhost:3001/api/muscleGroup/${groupId}`)
        .then(() => {
          this.muscleGroups = this.muscleGroups.filter(group => group.id !== groupId);
        })
        .catch(error => {
          console.error('Error al borrar el grupo:', error);
        });
      console.log('Borrar grupo con ID:', groupId);
    },
    createGroup() {
      this.$router.push({ name: 'createMuscleGroup' });
      console.log('Crear nuevo grupo');
    }
  }
};
</script>

<style scoped>
.create-btn {
  margin-bottom: 20px;
  margin-right: 20px;
}
</style>
