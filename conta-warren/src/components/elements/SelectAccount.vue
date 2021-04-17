<template>
  <div class="input-group mb-3">
    <select v-model="account" class="form-control form-control-lg">
      <option :key="index" v-for="(account, index) in accounts" :value="account"> 
        {{ account.user }} - Conta Nº ***{{ account.id.slice(-4) }}
      </option>
    </select>
    <div class="input-group-append">
      <button @click="$emit('create')" class="btn btn-outline-secondary" type="button">
        <fa class="fa-2x" icon="plus" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    defaultAccount: {
      required: false
    },
    exceptIds: {
      type: Array,
      default: () => { return []; }
    }
  },
  created() {
    this.loadAccounts();
  },
  data() {
    return {
      accounts: [],
      account: null
    };
  },
  methods: {
    async loadAccounts() {
      const response = await this.$http.get('accounts');
      
      this.accounts = response.data;

      if(this.exceptIds.length > 0) {
        this.accounts = this.accounts.filter(account => {
          return this.exceptIds.indexOf(account.id) == -1;
        });
      }
  
      if(this.defaultAccount) {
        let accountSelected = this.accounts.find(account => account.id == this.defaultAccount);
        if(accountSelected) this.account = accountSelected;
      } else {
        this.account = this.accounts[0];
      }
    },
  },
  watch: {
    account() {
      this.$emit('selected', this.account);
    }
  }
};
</script>

<style>

</style>