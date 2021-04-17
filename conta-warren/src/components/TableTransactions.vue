<template>
  <div class="table-responsive mb-2" v-if="transactions">
    <table class="table bg-white">
      <thead>
        <tr>
          <th>Data</th>
          <th>Operação</th>
          <th>Valor</th>
          <th>Saldo</th>
        </tr>
      </thead>
      <tbody>
        <tr :key="index" v-for="(event,index) in transactions.events">
          <td class="transaction_date">{{ event.date }}</td>
          <td class="transaction_type">{{ event.operation.type }}</td>
          <td class="transaction_value">
            <money :sign="true" :value="event.newBalance - event.previousBalance" />
          </td>
          <td class="transaction_balance"><money :value="Number(event.newBalance)" /></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    account: String
  },
  data() {
    return {
      transactions: null
    };
  },
  created() {
    this.loadTransactions();
  },
  methods: {
    async loadTransactions() {
      const response = await this.$http.get('account/' + this.account + '/transactions');
      this.transactions = response.data;
    },
  }
};
</script>

<style>

</style>