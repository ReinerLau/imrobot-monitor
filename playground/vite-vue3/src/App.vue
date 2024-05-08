<script setup lang="ts">
import { record, type EventType } from "rrweb";
import { onMounted } from "vue";

const recordData: EventType[] = [];

onMounted(() => {
  record({
    emit(event) {
      recordData.push(event);
    },
  });
});

setInterval(() => {
  console.log(recordData);
}, 5000);
</script>

<template>
  <div></div>
</template>
