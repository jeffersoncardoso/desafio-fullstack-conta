<template>
  <div>
    <btn-back @click="back()"/>
    <table-transactions :account="$route.params.id"></table-transactions>
  </div>
</template>

<script>

export default {
  methods: {
    back() {
      return this.$router.push({ name: 'Home', params: { account: this.$route.params.id } });
    }
  }
};

</script>

<style>

</style>