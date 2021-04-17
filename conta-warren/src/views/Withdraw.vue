<template>
  <div>
    <div class="row mb-3">
      <div class="col">
        <input-money v-model="ammount" placeholder="Digite o valor"/>
        <btn-back @click="back()"/>
        <btn-withdraw @click="withdraw()" :account="{ id: this.$route.params.id }"/>
      </div>
    </div>
    <account-summary :account="$route.params.id"></account-summary>
  </div>
</template>

<script>
import AccountSummary from '@/components/AccountSummary.vue';

export default {
  data() {
    return {
      ammount: null,
    };
  },
  methods: {
    async withdraw() {
      const options = { params: { value: this.ammount } };
      await this.$http.get('account/' + this.$route.params.id + '/withdraw', options);
      this.back();
    },
    back() {
      return this.$router.push({ name: 'Home', params: { account: this.$route.params.id } });
    }
  },
  components: {
    AccountSummary
  }
};
</script>

<style lang="scss" scoped>

</style>