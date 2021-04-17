<template>
  <span>
      {{ this.getValue() }}
  </span>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      required: true
    },
    sign: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    getValue() {
      const valueFormat = this.value.toLocaleString('pt-BR', { 
        style: 'currency', currency: 'BRL', maximumFractionDigits: 2 
      });

      if(this.sign) {
        if(this.value > 0) return '+ ' + valueFormat;
      }

      return valueFormat;
    }
  }
};
</script>

<style>

</style>