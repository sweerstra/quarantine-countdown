<template>
  <div id="app">
    <h1 class="title">Quarantaine aftellen ⏲️</h1>
    <div class="grid">
      <div class="left">
        <div class="controls">
          <Input
            label="Het begon op"
            type="date"
            v-model="date.start"
          />
          <Input
            label="Vandaag is het"
            type="date"
            v-model="date.end"
          />
        </div>
        <div class="overview">
          <Days
            :days="availableDays"
            :selected="selectedDay"
            :highlighted="foundActivityDays"
            @select="onDaySelect"
          />
        </div>
      </div>

      <div
        v-if="selectedDay"
        class="right"
      >
        <div class="search">
          <Input
            label="Zoeken"
            v-model="searchQuery"
            placeholder="theetje gedronken..."
          />
        </div>
        <div>
          <h2>Activiteiten op dag #{{ selectedDay }}</h2>
          <Activities
            :activities="selectedActivities"
            @create="onActivityCreate"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { reactive, ref, computed, watchEffect, onMounted } from '@vue/composition-api';
import format from 'date-fns/format';
import Input from './components/Input.vue';
import Days from './components/Days.vue';
import Activities from './components/Activities.vue';
import { getDaysBetweenDates } from './utils/days';

export default {
  name: 'App',
  components: {
    Input,
    Days,
    Activities,
  },
  setup() {
    const date = reactive({
      start: format(new Date(2020, 2, 4), 'yyyy-MM-dd'),
      end: format(new Date(), 'yyyy-MM-dd'),
    });

    // string, number, boolean -> ref
    // object -> reactive

    function onDateChange(value, type) {
      Vue.set(date, type, value);
    }

    onMounted(() => {
      console.log('on mounted');
    });

    const { availableDays, selectedDay, onDaySelect } = useDays(date);
    const { daysToActivitiesMap, selectedActivities, onActivityCreate } = useActivities(selectedDay);
    const { searchQuery, foundActivityDays } = useActivitySearch(daysToActivitiesMap);

    watchEffect(() => {
      console.log('Zoeken', foundActivityDays.value);
    });

    return {
      date,
      onDateChange,
      availableDays,
      selectedDay,
      onDaySelect,
      daysToActivitiesMap,
      selectedActivities,
      onActivityCreate,
      searchQuery,
      foundActivityDays
    };
  },
};

function useDays(date) {
  const availableDays = computed(() => getDaysBetweenDates(date.start, date.end));
  const selectedDay = ref(0);

  function onDaySelect(day) {
    selectedDay.value = day;
  }

  return { availableDays, selectedDay, onDaySelect };
}

function useActivities(selectedDay) {
  const daysToActivitiesMap = ref({});
  const selectedActivities = computed(() => daysToActivitiesMap.value[selectedDay.value]);

  function onActivityCreate(newActivity) {
    if (!daysToActivitiesMap.value[selectedDay.value]) {
      Vue.set(daysToActivitiesMap.value, selectedDay.value, [newActivity])
    } else {
      daysToActivitiesMap.value[selectedDay.value].push(newActivity);
    }
  }

  return { daysToActivitiesMap, selectedActivities, onActivityCreate };
}

function useActivitySearch(daysToActivitiesMap) {
  const searchQuery = ref('');
  const foundActivityDays = computed(() => {
    if (searchQuery.value === '') {
      return [];
    }
    const nameContainsQuery = ({ name }) => name.toLowerCase().includes(searchQuery.value.toLowerCase());
    return Object.entries(daysToActivitiesMap.value)
      .filter(([, activities]) => activities.some(nameContainsQuery))
      .map(([day]) => Number(day));
  });

  return { searchQuery, foundActivityDays };
}
</script>

<style lang="scss">
:root {
  --gray: #a0aec0;
  --teal: #38b2ac;
}

html {
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin-top: 0;
  margin-bottom: 0.5rem;
}

#app {
  max-width: 960px;
  margin: 2rem auto 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.title {
  margin-bottom: 1.5rem;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 3rem;
  width: 100%;
}

.left {
  display: flex;
  flex-direction: column;
}

.controls {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1rem;
  margin-bottom: 1rem;
}

.search {
  margin-bottom: 2rem;
}
</style>
