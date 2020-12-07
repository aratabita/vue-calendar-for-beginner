<template>
  <div>
    <div :class="$style.calender">
      <div v-for="day in $options.static.days" :key="day" :class="$style.cell">{{ day }}</div>
      <CalenderCell
        v-for="(day, index) in displayedDateList"
        :key="day.date"
        :index="index"
        :task-list="taskList"
        :day="day"
        :today="today"
        @handle-set-date="handleSetDate"
        @handle-remove-task="handleRemoveTask"
      />
    </div>
  </div>
</template>
<script>
import CalenderCell from '~/components/molecules/CalenderCell.vue';
import { WEEK_DAYS, MONTH_DAYS } from '~/constants/variable';

export default {
  components: {
    CalenderCell,
  },
  props: {
    currentCalendar: {
      type: Object,
      required: true,
    },
    holidays: {
      type: Object,
      default: () => {},
    },
    displayedDateList: {
      type: Array,
      required: true,
    },
    taskList: {
      type: Array,
      default: () => [],
    },
    today: {
      type: String,
      default: '',
    },
  },
  static: {
    days: WEEK_DAYS,
    day: MONTH_DAYS,
  },
  methods: {
    handleSetDate(payload) {
      this.$emit('handle-set-date', payload);
    },
    handleRemoveTask(payload) {
      this.$emit('handle-remove-task', payload);
    },
  },
};
</script>

<style module lang="scss">
.calender {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin: 10px 10px 0;
  min-width: 900px;
  @media screen and (max-width: 400px) {
    min-width: auto;
  }
}
.cell {
  border-bottom: 1px dashed #ccc;
  height: 30px;
  margin: 0 auto;
  text-align: center;
  width: 100px;
  @media screen and (max-width: 400px) {
    width: 100%;
  }
}
</style>
