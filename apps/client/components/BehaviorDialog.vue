<script setup lang="ts">
const { behaviorStack, dialogVisible } = useBehavior();
</script>

<template>
  <el-dialog v-model="dialogVisible">
    <el-timeline>
      <el-timeline-item
        v-for="item in behaviorStack"
        :key="item.time"
        :timestamp="item.time"
        type="primary"
        :hollow="true"
      >
        <div>{{ item.type }}</div>
        <div>{{ item.content }}</div>
      </el-timeline-item>
    </el-timeline>
  </el-dialog>
</template>
