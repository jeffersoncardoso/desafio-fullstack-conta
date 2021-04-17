<template>
  <div>
    <input-money v-model="ammount" placeholder="Digite o valor"/>
    <btn-back @click="back()"/>
    <btn-deposit @click="deposit()" :account="{ id: $route.params.id }"/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ammount: null
    };
  },
  methods: {
    async deposit() {
      const options = { params: { value: this.ammount } };
      await this.$http.get('account/' + this.$route.params.id + '/deposit', options);
      this.back();
    },
    back() {
      return this.$router.push({ name: 'Home', params: { account: this.$route.params.id } });
    }
  }
};
</script>

<style lang="scss" scoped>


</style>