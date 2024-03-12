<script setup lang="ts">
import { ref } from "vue";

const onClick = () => {
  // @ts-ignore
  noFunc();
};

const imgUrl = ref("https://img.la/200x200");

const onResources = () => {
  const random = Math.floor(Math.random() * 100) + 1;
  imgUrl.value = `http://locslhost/${random}x${random}`;
};

const onAsync = () => {
  setTimeout(() => {
    // @ts-ignore
    noFunc();
  }, 0);
};

const onPromise = () => {
  new Promise((resolve) => {
    // @ts-ignore
    noFunc();
    resolve(true);
  });
};
</script>

<template>
  <div class="flex flex-col gap-4 p-4">
    <div class="flex gap-4">
      <NButton @click="onClick">运行错误</NButton>
      <NButton @click="onResources">资源加载错误</NButton>
      <NButton @click="onAsync">异步错误</NButton>
      <NButton @click="onPromise">promise 错误</NButton>
    </div>
    <NImage :src="imgUrl" fallback-src="https://img.la/200x200" />
  </div>
</template>
