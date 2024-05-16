<script lang="ts" setup>
defineProps<{ visible: boolean }>();

const emit = defineEmits(["update:visible"]);

const handleHide = () => {
  emit("update:visible", false);
};
</script>

<template>
  <Dialog
    :visible="visible"
    @update:visible="handleHide"
    header="录屏回放"
  ></Dialog>
</template>
