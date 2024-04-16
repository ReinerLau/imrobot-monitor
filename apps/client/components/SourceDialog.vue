<script setup lang="ts">
const { code, file, dialogVisible } = useSource();
</script>

<template>
  <el-dialog v-model="dialogVisible">
    <div class="bg-green-500 mb-2 text-white">{{ file }}</div>
    <div class="bg-slate-900 text-white">
      <span v-html="code"></span>
    </div>
  </el-dialog>
</template>

<style>
code.hljs .hljs-deletion {
  background-color: red !important;
}
</style>
