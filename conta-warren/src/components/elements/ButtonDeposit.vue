<template>
    <button class="btn-deposit" @click="onClick()" type="button">Depositar</button>
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

    .btn-deposit {
        @extend .btn;
        @extend .btn-success;
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