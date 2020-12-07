<template>
  <div class="days">
    <button
      class="day"
      :class="{ 'is-active': selected === day, 'is-highlighted': isHighlighted(day) }"
      v-for="day in days"
      :key="day"
      @click="onSelect(day)"
    >
      {{ day }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    days: Array,
    selected: Number,
    highlighted: { type: Array, default: () => [] },
  },
  setup(props, { emit }) {
    function onSelect(day) {
      emit('select', day);
    }

    function isHighlighted(day) {
      return props.highlighted.includes(day);
    }

    return { onSelect, isHighlighted };
  },
};
</script>

<style lang="scss">
.days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin: 0 -0.125rem;
}

.day {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  border: 0.125rem solid var(--teal);
  margin: 0.25rem;
  background-color: transparent;
  font-size: 18px;
  font-weight: bold;
  transition: background-color 200ms ease-in;
  cursor: pointer;
  user-select: none;

  &:hover {
    background-color: var(--teal);
    color: white;
  }

  &.is-active {
    background-color: var(--teal);
    color: white;

    &.is-highlighted {
      background-color: darkorange;
    }
  }

  &.is-highlighted {
    border-color: darkorange;
  }
}
</style>
