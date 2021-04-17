<template>
  <div>
    <input-money v-model="ammount" placeholder="Digite o valor"/>
    <select-account 
      @selected="receiver = $event" 
      @create="$router.push('/account/create')" 
      :except-ids="[$route.params.id]"
    />
    <btn-back @click="back()"/>
    <btn-payment @click="pay()" />
    <div class="mt-3">
      <account-summary v-if="$route.params.id" :account="$route.params.id"></account-summary>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ammount: null,
      receiver: "",
      receivers: []
    };
  },
  async mounted() {
    const response = await this.$http.get('account/' + this.$route.params.id + '/accountsForPayment');
    this.receivers = response.data;
  },
  methods: {
    async pay() {
      const options = { params: { value: this.ammount }};
      await this.$http.get('account/'  + this.$route.params.id +  '/payment/to/' + this.receiver.id, options);
      this.back();
    },
    back() {
      return this.$router.push({ name: 'Home', params: { account: this.$route.params.id } });
    }
  }
};
</script>