<template>
  <div v-if="connection" :class="$style.wrapper">
    <Header :year="currentCalendar.year" :month="currentCalendar.month" />
    <Calender
      :current-calendar="currentCalendar"
      :holidays="holidays"
      :displayed-date-list="displayedDateList"
      :task-list="taskList"
      :today="today"
      @handle-set-date="setDate"
      @handle-remove-task="removeTask"
    />
    <transition name="fade">
      <Modal
        v-if="isModal"
        :task-list="taskList"
        :selected-date="selectedDate"
        @handle-add-task="addTask"
        @handle-remove-task="removeTask"
      />
    </transition>
  </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from 'vuex';
import axios from 'axios';
import Header from '~/components/organisms/Header.vue';
import Calender from '~/components/organisms/Calender.vue';
import Modal from '~/components/organisms/Modal.vue';
import { HOLIDAY_URL } from '~/constants/variable';

export default {
  components: {
    Header,
    Calender,
    Modal,
  },
  data() {
    return {
      connection: false,
    };
  },
  computed: {
    ...mapState(['isModal', 'selectedDate', 'holidays', 'taskList', 'currentCalendar', 'today']),
    ...mapGetters(['displayedDateList']),
  },
  watch: {
    taskList() {
      this.saveTaskList();
    },
  },
  created() {
    (async () => {
      try {
        const { data: holidays } = await axios.get(HOLIDAY_URL);
        this.initialize({ holidays });
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
      } finally {
        this.connection = true;
      }
    })();
  },
  methods: {
    ...mapActions(['initialize', 'setDate', 'addTask', 'saveTaskList', 'removeTask']),
  },
};
</script>
<style module lang="scss">
.wrapper {
  position: relative;
}

:global(.fade-enter-active),
:global(.fade-leave-active) {
  transition: opacity 0.5s;
}
:global(.fade-enter),
:global(.fade-leave-to) {
  opacity: 0;
}
</style>
