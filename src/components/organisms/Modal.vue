<template>
  <div :class="$style.modal" @click.self="handleSetModal('close')">
    <div :class="$style.modal__inner">
      <span :class="$style.modal__close" @click="handleSetModal('close')">✖️</span>
      <div :class="$style.modal__title">{{ displayedDate }}</div>
      <div :class="$style.wrapper">
        <transition-group name="fadeModalTask">
          <ModalTaskList
            v-for="task in displayedTaskList"
            :key="task.id"
            :task="task"
            @handle-remove-task="handleRemoveTask"
          />
        </transition-group>
      </div>
      <ModalTaskInput :date="selectedDate" @handle-add-task="handleAddTask" />
    </div>
  </div>
</template>

<script>
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
    displayedDate() {
      const array = this.selectedDate.split('-');
      return `${array[0]}年 ${array[1]}月 ${array[2]}日`;
    },
  },
  methods: {
    handleSetModal(payload) {
      this.$emit('handle-set-modal', payload);
    },
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

.modal__title {
  text-align: center;
}

.wrapper {
  height: 210px;
  margin: 10px 10px 15px;
  overflow: scroll;
  position: relative;
}

:global(.fadeModalTask-enter-active),
:global(.fadeModalTask-leave-active) {
  transition: opacity 0.3s;
}
:global(.fadeModalTask-enter),
:global(.fadeModalTask-leave-to) {
  opacity: 0;
}

:global(.fadeModalTask-move) {
  transition: all 0.5s;
}

:global(.fadeModalTask-leave-active) {
  position: absolute;
  width: 100%;
}
</style>
