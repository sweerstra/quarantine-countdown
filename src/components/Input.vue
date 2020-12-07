<template>
  <label class="input-label">
    {{ label }}
    <input
      class="input"
      :class="{ 'is-highlighted': highlight }"
      :type="type"
      :readonly="readonly"
      :placeholder="placeholder"
      :value="value"
      @input="$emit('input', $event.target.value)"
      @change="$emit('change', $event)"
      @keyup.enter="$emit('enter', $event)"
    >
  </label>
</template>

<script>
export default {
  props: {
    value: String,
    label: String,
    type: String,
    readonly: String,
    placeholder: String,
    highlight: Boolean,
  },
};
</script>

<style lang="scss" scoped>
.input {
  width: 100%;
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid var(--gray);
  outline-color: var(--teal);
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 14px;

  &.is-highlighted {
    border-color: darkorange;
  }
}

input[type="date"]::-webkit-inner-spin-button,
input[type="date"]::-webkit-clear-button {
  display: none;
  -webkit-appearance: none;
}

input[type="date"][readonly] {
  outline: 0;
}

.input-label {
  font-size: 0.875rem;
  font-weight: bold;

  .input {
    margin-top: 0.25rem;
  }
}
</style>
