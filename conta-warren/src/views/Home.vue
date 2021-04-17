<template>
  <div>
    <h1 class="title-text">Gerencie sua conta. <br> Em um só lugar</h1>
    <select-account 
      :default-account="account ? account.id : null" 
      @selected="account = $event" 
      @create="$router.push('/account/create')" 
    />
    <h1 class="user-title" v-if="account"> Olá, {{ account.user }}. O que deseja fazer? </h1>
    <div class="m-3" v-if="account">
      <btn-deposit @click="$router.push('/account/' + account.id + '/deposit')" :account="account" />
      <btn-payment @click="$router.push('/account/' + account.id + '/payment')" :account="account" />
      <btn-withdraw :disabled="account.balance == 0" @click="$router.push('/account/' + account.id + '/withdraw')" :account="account" />
    </div>
    <account-summary 
      v-if="account"
      :account="account.id" 
      @statement="$router.push('account/' + account.id + '/statement')" 
      :auto-update="true" />
  </div>
</template>

<script>

export default {
  name: 'Home',
  data() {
    return {
      account: null
    };
  }
};
</script>

<style lang="scss" scoped>
  .user-title {
      font-size: 30px;
      font-weight: 700;
      font-family: 'Montserrat', sans-serif;
      color: white;
      letter-spacing: -2px;
      margin: 2rem;

      @media screen and (max-width: 400px){
          font-size: 20px;
          line-height: 40px;
          margin: 1rem;
      }
  }

  .title-text {
      font-size: 55px;
      font-weight: 700;
      font-family: 'Montserrat', sans-serif;
      color: white;
      letter-spacing: -2px;
      line-height: 64px;
      margin: 2rem;

      @media screen and (max-width: 400px){
          font-size: 30px;
          line-height: 40px;
          margin: 1rem;
          margin-top: 0px;
      }
  }
</style>