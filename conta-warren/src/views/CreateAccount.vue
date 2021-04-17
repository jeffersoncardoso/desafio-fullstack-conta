<template>
  <div>
    <input-text v-model="user" placeholder="Digite o nome do usuário"/>
    <btn-back @click="back()"/>
    <btn-create-account :disabled="user.trim().length == 0" @click="create()"></btn-create-account>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: ""
    };
  },
  methods: {
    async create() {
      const options = { params: { user: this.user } };
      await this.$http.get('account/new', options);
      this.back();
    },
    back() {
      this.$router.push({ name: 'Home' });
    }
  }
};
</script>

<style>

</style>