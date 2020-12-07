<template>
  <label class="checkbox-label">
    {{ label }}
    <input
      class="checkbox"
      type="checkbox"
      :checked="value"
      @input="$emit('input', $event.target.checked)"
      @change="$emit('change', $event)"
      @keyup.enter="$emit('enter', $event)"
    >
  </label>
</template>

<script>
export default {
  props: {
    value: Boolean,
    label: String,
    type: String,
    readonly: String,
    placeholder: String,
    highlight: Boolean,
  },
};
</script>

<style lang="scss" scoped>
.checkbox-label {
  display: flex;
  align-items: center;
  margin-top: 0.25rem;
  font-size: 87.5%;
}
</style>