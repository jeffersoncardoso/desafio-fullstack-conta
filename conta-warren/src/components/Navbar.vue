<template>
  <div>
    <router-link to="/">
      <img class="navbar-logo" src="@/assets/warren.svg" />
    </router-link>
  </div>
</template>

<script>

export default {
  data() {
    return {
    };
  },
  components: {  }
};
</script>

<style scoped>
  .navbar-logo {
    margin-top: 0.5rem;
    width: 300px; 
    margin-bottom: 5px;
  }
</style>