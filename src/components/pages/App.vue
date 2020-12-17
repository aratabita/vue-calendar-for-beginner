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
      @handle-set-modal="setModal"
    />
    <transition
      :enter-class="$style.enter"
      :enter-active-class="$style.enterActive"
      :leave-to-class="$style.leaveTo"
      :leave-active-class="$style.leaveActive"
    >
      <Modal
        v-if="isModal"
        :task-list="taskList"
        :selected-date="selectedDate"
        @handle-add-task="addTask"
        @handle-remove-task="removeTask"
        @handle-set-modal="setModal"
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
    axios
      .get(HOLIDAY_URL)
      .then(({ data: holidays }) => {
        this.setHolidays({ holidays });
      })
      .catch(() => {
        // eslint-disable-next-line no-console
        console.error('休日が取得できませんでした。');
      })
      .then(() => {
        this.fetchLocalStorage();
      })
      .catch(() => {
        // eslint-disable-next-line no-console
        console.error('ローカルストレージから情報を取得できませんでした。');
      })
      .finally(() => {
        this.setCalendar();
        this.setId();
        this.connection = true;
      });
  },
  methods: {
    ...mapActions([
      'setCalendar',
      'setId',
      'setHolidays',
      'fetchLocalStorage',
      'setDate',
      'addTask',
      'saveTaskList',
      'removeTask',
      'setModal',
    ]),
  },
};
</script>
<style module lang="scss">
.wrapper {
  position: relative;
}

.enterActive,
.leaveActive {
  transition: opacity 0.5s;
}
.enter,
.leaveTo {
  opacity: 0;
}
</style>
