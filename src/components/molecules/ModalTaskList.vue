<template>
  <div :class="$style.task">
    <span :class="$style.task__close" @click.stop="handleRemoveTask(task.id)">×</span>
    {{ task.name }}
  </div>
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    handleRemoveTask(id) {
      this.$emit('handle-remove-task', { id });
    },
  },
};
</script>
<style lang="scss" module>
.task {
  background-color: deepskyblue;
  border-radius: 3px;
  color: whitesmoke;
  margin-bottom: 1px;
  padding: 0 20px 0 5px;
  position: relative;
  word-break: break-word;
}
.task__close {
  color: white;
  cursor: pointer;
  position: absolute;
  right: 4px;
  top: 0;
}
</style>
