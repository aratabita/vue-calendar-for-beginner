<template>
  <div :class="$style.modal" @click.self="handleModal('close')">
    <div :class="$style.modal__inner">
      <span :class="$style.modal__close" @click="handleModal('close')">✖️</span>
      <div>{{ selectedDate }}</div>
      <div :class="$style.wrapper">
        <ModalTaskList
          v-for="task in displayedTaskList"
          :key="task.id"
          :task="task"
          @handle-remove-task="handleRemoveTask"
        />
      </div>
      <ModalTaskInput :date="selectedDate" @handle-add-task="handleAddTask" />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

import ModalTaskList from '~/components/molecules/ModalTaskList.vue';
import ModalTaskInput from '~/components/molecules/ModalTaskInput.vue';

export default {
  components: {
    ModalTaskList,
    ModalTaskInput,
  },
  props: {
    taskList: {
      type: Array,
      default: () => [],
    },
    selectedDate: {
      type: String,
      default: '',
    },
  },
  computed: {
    displayedTaskList() {
      return this.taskList.filter(({ date }) => date === this.selectedDate);
    },
  },
  methods: {
    ...mapActions(['handleModal']),
    handleAddTask(task) {
      this.$emit('handle-add-task', task);
    },
    handleRemoveTask(payload) {
      this.$emit('handle-remove-task', payload);
    },
  },
};
</script>

<style module lang="scss">
.modal {
  background-color: rgba(0, 0, 0, 0.5);
  height: 100vh;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  @media screen and (max-width: 400px) {
    height: 100%;
  }
}

.modal__inner {
  background-color: white;
  border-radius: 10px;
  height: 350px;
  left: 50%;
  padding: 40px;
  position: fixed;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  @media screen and (max-width: 400px) {
    padding: 20px;
    width: 90%;
  }
}
.modal__close {
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: 10px;
}
.wrapper {
  height: 210px;
  margin-bottom: 15px;
  margin-top: 10px;
  overflow: scroll;
  padding: 0 10px;
}
</style>
