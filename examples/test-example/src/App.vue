<script setup lang="ts">
import { ref } from 'vue'

const onClick = () => {
  test1()
}

const visible = ref(false)
</script>

<template>
  <button @click="onClick">运行错误</button>
  <button @click="visible = true">资源加载错误</button>
  <img v-if="visible" src="http://www.abc.com/test.png" />
</template>

<style scoped></style>
