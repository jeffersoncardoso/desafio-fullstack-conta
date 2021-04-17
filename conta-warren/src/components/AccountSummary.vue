<template>
  <div class="account-summary">
    <h2>Saldo disponível</h2>
    <h2 v-if="summary">
      <money :value="summary.balance" />
      <button @click="generateStatement()" type="button" class="btn btn-default btn-statement">
        <fa class="fa-2x" icon="file-alt"></fa>
      </button>
    </h2>
  </div>
</template>

<script>
export default {
  props: {
    account: {
      type: String,
      required: true
    },
    autoUpdate: {
      type: Boolean,
      default: false
    }
  },
  async created() { 
    await this.loadSummary();
    
    if(this.autoUpdate)
      this.timer = setInterval(this.loadSummary, 10000);
  },
  data() {
    return {
      summary: null,
      timer: null
    };
  },
  methods: {
    async loadSummary() {
      const response = await this.$http.get('account/' + this.account + '/balance');
      this.summary = response.data;
    },
    generateStatement() {
      this.$emit('statement', { account: this.account });
    },
  },
  watch: {
    account() {
      this.transactions = null;
      this.loadSummary();
    }
  }
};
</script>

<style>
  .account-summary {
    border: 1px solid #CCC;
    border-radius: 30px;
    max-width: 500px;
    padding: 3px;
    margin: auto;
  }

  .btn-statement {
    color:white !important;
  }
</style>