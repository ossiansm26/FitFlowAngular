<template>
  <v-container>
    <v-row>
      <v-col
        v-for="(group, index) in muscleGroups"
        :key="index"
        cols="12"
        md="6"
        lg="4"
      >
        <v-card class="card">
          <v-card-title>{{ group.groupName }}</v-card-title>
          <div class="card-image">
            <v-img
              class="card-image"
              :src="getImageUrl(group.muscleImage)"
              :alt="group.groupName"
              contain
            ></v-img>
          </div>
          <v-card-text>
            <p><strong>Body Part:</strong> {{ group.bodyPart }}</p>
          </v-card-text>
          <v-card-actions>
            <v-btn small color="blue darken-1" @click="editGroup(group)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn small color="red darken-1" @click="deleteGroup(group.id)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
            <v-btn small color="purple" @click="viewGroupDetail(group)">
              <v-icon>mdi-eye</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-btn class="create-btn" color="success" fab large @click="createGroup">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </v-container>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      muscleGroups: [],
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/muscleGroup/getAll"
        );
        this.muscleGroups = response.data;
        console.log("Grupos musculares:", this.muscleGroups);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    getImageUrl(imageName) {
      return `http://localhost:3001/api/file/download/${imageName}`;
    },
    editGroup(group) {
      localStorage.setItem("editGroupID", group.id);
      this.$router.push({ name: "editMuscleGroup" });
    },
    deleteGroup(groupId) {
      axios
        .delete(`http://localhost:3001/api/muscleGroup/${groupId}`)
        .then(() => {
          this.muscleGroups = this.muscleGroups.filter(
            (group) => group.id !== groupId
          );
        })
        .catch((error) => {
          console.error("Error al borrar el grupo:", error);
        });
      console.log("Borrar grupo con ID:", groupId);
    },
    createGroup() {
      this.$router.push({ name: "createMuscleGroup" });
      console.log("Crear nuevo grupo");
    },
    viewGroupDetail(group) {
      localStorage.setItem("selectedGroupId", group.id);
      this.$router.push({ name: "muscleGroupDetails" });
    },
  },
};
</script>

<style scoped>
.card {
  height: 100%; /* Asegura que todas las tarjetas tengan la misma altura */
}
.card-image {
  width: 100%; /* Ajusta el tamaño de la imagen para que ocupe todo el espacio disponible */
  height: 200px; /* Ajusta la altura de la imagen según tus preferencias */
}
.create-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
}
</style>
