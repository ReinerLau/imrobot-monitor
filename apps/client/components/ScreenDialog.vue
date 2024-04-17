<script setup lang="ts">
const { dialogVisible, playerRef } = useScreen();
</script>

<template>
  <el-dialog v-model="dialogVisible">
    <div ref="playerRef" class="overflow-hidden"></div>
  </el-dialog>
</template>
