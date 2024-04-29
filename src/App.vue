<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>
 
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'App',

  data: () => ({
    //
  }),
  methods: {
    goToHome() {
      if (this.$route.name === 'home') return;
      this.$router.push({ name: 'home' });
    }
  }
});
</script>
