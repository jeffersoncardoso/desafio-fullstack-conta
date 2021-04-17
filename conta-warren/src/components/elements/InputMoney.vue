<template>
  <div class="form-group">
    <input type="number" :value="value" @input="handleInput" class="form-control form-control-lg" :placeholder="placeholder">
  </div>
</template>

<script>
export default {
  props: {
    value: { required: true },
    placeholder: String,
  },
  methods: {
    handleInput(event) {
      this.$emit("input", event.target.value);
    }
  }
};
</script>

<style>

</style>