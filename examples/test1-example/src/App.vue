<script setup lang="ts">
import { playTest } from "@imrobot/screen";
import { ref } from "vue";
import axios from "axios";

const onClick = async () => {
  const res = await axios.get("/getEvent");
  playTest(videoRef.value!, res.data.message);
};

const videoRef = ref<HTMLElement>();
</script>

<template>
  <button @click="onClick">查看录屏</button>
  <div ref="videoRef"></div>
</template>
