<script lang="ts" setup>
import rrwebData from "@/public/rrweb.json";
import rrwebPlayer from "rrweb-player";

let player: rrwebPlayer;

const playerDom = ref<HTMLElement>();

const playData = ref(JSON.stringify(rrwebData, null, 2));

onMounted(() => {
  player = new rrwebPlayer({
    target: playerDom.value!,
    props: {
      width: playerDom.value?.clientWidth,
      height: playerDom.value?.clientHeight! - 81,
      events: JSON.parse(playData.value),
      UNSAFE_replayCanvas: true,
    },
  });
});

const replay = () => {
  document.getElementsByClassName("rr-player").item(0)?.remove();
  player.pause();

  player = new rrwebPlayer({
    target: playerDom.value!,
    props: {
      width: playerDom.value?.clientWidth,
      height: playerDom.value?.clientHeight! - 81,
      events: JSON.parse(playData.value),
      UNSAFE_replayCanvas: true,
    },
  });
};
</script>

<template>
  <div class="h-screen w-screen overflow-hidden flex">
    <div class="h-full basis-1/2 p-4 flex flex-col gap-2">
      <div class="flex gap-2">
        <Button @click="replay">重新播放</Button>
      </div>
      <Textarea
        v-model="playData"
        variant="filled"
        class="h-full w-full text-nowrap resize-none font-mono"
      />
    </div>
    <div class="h-full basis-1/2 p-4 pl-0">
      <div
        class="h-full w-full border border-[#cbd5e1] border-solid rounded-md"
        ref="playerDom"
      ></div>
    </div>
  </div>
</template>
