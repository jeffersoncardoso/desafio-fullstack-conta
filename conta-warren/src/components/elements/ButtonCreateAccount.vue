<template>
  <button v-on:click="$emit('click')" type="button" class="btn-create-account">Criar Conta</button>
</template>

<script>
export default {

};
</script>

<style lang="scss" scoped>
    @import '~bootstrap/scss/bootstrap.scss';

    .btn-create-account {
        @extend .btn;
        @extend .btn-info;
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