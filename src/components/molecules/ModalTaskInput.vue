<template>
  <div>
    <input v-model="name" :class="$style.input" type="text" />
    <button @click="handleAddTask">+</button>
  </div>
</template>

<script>
import { uniqId } from '~/constants/function';

export default {
  props: {
    date: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      name: '',
    };
  },
  methods: {
    handleAddTask() {
      if (!this.name) return;
      const id = uniqId();
      this.$emit('handle-add-task', { name: this.name, date: this.date, id });
      this.name = '';
    },
  },
};
</script>
<style module lang="scss">
.input {
  width: 92%;
  @media screen and (max-width: 400px) {
    width: 80%;
  }
}
</style>
