<script setup lang="ts">
import rrwebPlayer from "rrweb-player";
import "rrweb-player/dist/style.css";

const { data } = await useFetch("/api/record");

const events: any[] = data.value as [];

onMounted(() => {
  new rrwebPlayer({
    target: document.body,
    props: {
      events: events[events.length - 1].data,
      UNSAFE_replayCanvas: true,
    },
  });
});
</script>

<template>
  <div></div>
</template>
