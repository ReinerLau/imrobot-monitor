<script lang="ts" setup>
import { playScreen } from "@imrobot/monitor-screen";

const props = defineProps<{ name: string; token: string }>();

const visible = defineModel<boolean>("visible", { required: true });

const dates = ref<[Date, Date] | undefined>();

const minDate = ref<Date | undefined>();

const maxDate = ref<Date | undefined>();

const toast = useToast();

watch(
  () => props.token,
  async (value) => {
    const { data } = await useFetch("/api/events/range", {
      params: {
        token: value,
      },
    });

    init();

    if (data.value) {
      dates.value = [
        new Date(data.value.startTime || Date.now()),
        new Date(data.value.endTime || Date.now()),
      ];
      minDate.value = dates.value[0];
      maxDate.value = dates.value[1];
    }
  }
);

const init = () => {
  minDate.value = undefined;
  maxDate.value = undefined;
  dates.value = undefined;
};

const handleHide = () => {
  visible.value = false;
};

const playerRef = ref<HTMLElement>();

const handlePlay = async () => {
  const { data } = await useFetch("/api/events", {
    params: {
      token: props.token,
      startTime: dates.value![0].getTime(),
      endTime: dates.value![1].getTime(),
    },
  });
  if (data.value && data.value.length > 0) {
    playerRef.value!.innerHTML = "";
    playScreen(playerRef.value!, data.value, playerRef.value?.clientWidth);
  } else {
    toast.add({
      severity: "warn",
      life: 3000,
      summary: "提示",
      detail: "无数据",
    });
  }
};
</script>

<template>
  <Dialog
    class="w-1/2"
    :visible="visible"
    @update:visible="handleHide"
    :header="name"
  >
    <div class="flex mb-2">
      <Calendar
        class="flex-1 mr-2"
        v-model="dates"
        selectionMode="range"
        :manualInput="false"
        showTime
        showSeconds
        :minDate="minDate"
        :maxDate="maxDate"
      />
      <Button @click="handlePlay">
        <i class="pi pi-play-circle"></i>
      </Button>
    </div>
    <div ref="playerRef"></div>
  </Dialog>
</template>
