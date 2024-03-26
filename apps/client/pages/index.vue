<script lang="tsx" setup>
import type { Column } from "element-plus";

const columns: Column[] = [
  {
    dataKey: "message",
    title: "报错信息",
    width: 150,
    align: "center",
  },
  {
    dataKey: "url",
    title: "报错页面",
    width: 150,
    align: "center",
  },
  {
    dataKey: "time",
    title: "报错时间",
    width: 150,
    align: "center",
  },
  {
    dataKey: "user",
    title: "用户",
    width: 150,
    align: "center",
  },
  {
    dataKey: "sdkVersion",
    title: "SDK版本",
    width: 150,
    align: "center",
  },
  {
    dataKey: "system",
    title: "操作系统",
    width: 150,
    align: "center",
  },
  {
    dataKey: "source",
    title: "源码",
    width: 150,
    align: "center",
    cellRenderer: ({ rowData }) => (
      <el-button type="primary">{rowData.message}</el-button>
    ),
  },
  {
    dataKey: "behavior",
    title: "行为",
    width: 150,
    align: "center",
  },
  {
    dataKey: "screen",
    title: "录屏",
    width: 150,
    align: "center",
  },
];
const data: any[] = [
  {
    message: "test",
  },
];

const tableWidth = ref(0);
const tableHeight = ref(0);

const tableContainerRef = ref<HTMLElement>();

onMounted(() => {
  tableWidth.value = tableContainerRef.value!.clientWidth;
  tableHeight.value = tableContainerRef.value!.clientHeight;
});
</script>

<template>
  <div class="flex flex-col h-screen">
    <div class="flex justify-end p-1">
      <el-button type="primary">上传</el-button>
      <el-button type="primary">导出</el-button>
    </div>
    <div ref="tableContainerRef" class="flex-1 h-full">
      <el-table-v2
        :columns="columns"
        :data="data"
        :width="tableWidth"
        :height="tableHeight"
        fixed
      />
    </div>
  </div>
</template>
