<script setup lang="ts">
const onClick = () => {
  console.log("test");
};
</script>

<template>
  <div class="text-red-500">
    <el-button type="primary" @click="onClick">test</el-button>
  </div>
</template>
