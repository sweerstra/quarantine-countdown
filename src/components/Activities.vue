<template>
  <div class="activities">
    <ul>
      <li
        v-for="(activity, index) in activities"
        :key="index"
      >
        {{ activity.name }} {{ activity.subject }} {{ activity.isHighlight ? '🤗' : '' }}
      </li>
    </ul>
    <form @submit="onAddActivity">
      <div class="add-activity">
        <Input
          label="Wat heb je gedaan?"
          placeholder="wandelingetje..."
          v-model="newActivityName"
        />
      </div>
      <div class="add-activity-highlight">
        <Checkbox
          label="Was dit een hoogtepunt van je dag?"
          v-model="isHighlight"
        />
        <span v-if="isHighlight">😃</span>
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from '@vue/composition-api';
import Input from './Input.vue';
import Checkbox from './Checkbox.vue';

export default {
  components: {
    Input,
    Checkbox,
  },
  props: {
    activities: { type: Array, default: () => [] },
  },
  setup(_, { emit }) {
    const newActivityName = ref('');
    const isHighlight = ref(false);

    function onAddActivity(e) {
      e.preventDefault();

      emit('create', {
        name: newActivityName.value,
        isHighlight: isHighlight.value,
        subject: determineSubject(newActivityName.value)
      });

      newActivityName.value = '';
      isHighlight.value = false;
    }

    function determineSubject(name) {
      if (name.includes('fiets')) return '🚲';
      if (name.includes('thee')) return '☕';
      if (name.includes('tennis')) return '🎾';
    }

    return { newActivityName, isHighlight, onAddActivity };
  },
}
</script>

<style lang="scss" scoped>
.add-activity-highlight {
  display: flex;
  align-items: center;
}
</style>
