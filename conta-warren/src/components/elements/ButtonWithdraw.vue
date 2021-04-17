<template>
    <button 
      :disabled="account && account.balance <= 0"
      class="btn-withdraw" 
      @click="onClick()" 
      type="button">Resgatar</button>
</template>

<script>
export default {
  props: {
    account: {
      type: Object
    }
  },
  methods: {
    onClick() {
      this.$emit('click', this.account);
    }
  }
};
</script>

<style lang="scss" scoped>
    @import '~bootstrap/scss/bootstrap.scss';

    .btn-withdraw {
        @extend .btn;
        @extend .btn-danger;
        @extend .btn-lg;
        font-family: "Source Sans Pro", Helvetica, Arial, Sans-Serif;
        text-transform: uppercase;
        font-weight: 700;
        padding: 0 40px;
        height: 50px;
        border-radius: 100px;
        margin: 5px;
    }
</style>