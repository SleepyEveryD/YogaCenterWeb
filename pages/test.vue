<template>
  <div id="sorting-selector-team">
    <label for="order">Sort by:</label>
    <select
        id="order"
        v-model="order"
        @change="logChange"
    >
      <option value="Role">Role</option>
      <option value="A-Z">A-Z</option>
      <option value="Z-A">Z-A</option>
    </select>
    <p>current value: {{ order }}</p>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const order = ref('A-Z');

// 监听 order 变化
watch(order, (newVal) => {
  console.log('[watch] order 变化:', newVal);
});

// 手动打印 change 事件
const logChange = () => {
  console.log('[@change] 当前 order:', order.value);
};
</script>
<style>

</style>