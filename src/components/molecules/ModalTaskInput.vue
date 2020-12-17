<template>
  <div>
    <input v-model="name" :class="$style.input" type="text" />
    <button @click="handleAddTask">+</button>
  </div>
</template>

<script>
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
      this.$emit('handle-add-task', { name: this.name, date: this.date });
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
