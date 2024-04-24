<script setup lang="ts">
const { dialogVisible, times, handleSave } = useTime();

const titles = [
  "seconds",
  "minutes",
  "hours",
  "day of month",
  "months",
  "day of week",
];

const handleInput = (val: string, index: number) => {
  times.value[index] = val;
};
</script>

<template>
  <el-dialog v-model="dialogVisible">
    <template #default>
      <div class="pr-10">
        <template v-for="(item, index) in times" :key="index">
          <div class="flex mb-2">
            <div class="w-36 text-right mr-2">{{ titles[index] }}:</div>
            <el-input
              :model-value="item"
              @input="(val: string) => handleInput(val, index)"
            ></el-input>
          </div>
        </template>
      </div>
    </template>
    <template #footer>
      <el-button type="primary" @click="handleSave">保存</el-button>
    </template>
  </el-dialog>
</template>
