<script lang="ts" setup>
const generateColumns = (length = 10, prefix = "column-", props?: any) =>
  Array.from({ length }).map((_, columnIndex) => ({
    ...props,
    key: `${prefix}${columnIndex}`,
    dataKey: `${prefix}${columnIndex}`,
    title: `Column ${columnIndex}`,
    width: 150,
  }));

const generateData = (
  columns: ReturnType<typeof generateColumns>,
  length = 200,
  prefix = "row-"
) =>
  Array.from({ length }).map((_, rowIndex) => {
    return columns.reduce(
      (rowData, column, columnIndex) => {
        rowData[column.dataKey] = `Row ${rowIndex} - Col ${columnIndex}`;
        return rowData;
      },
      {
        id: `${prefix}${rowIndex}`,
        parentId: null,
      }
    );
  });

const columns = generateColumns(10);
const data = generateData(columns, 100);
</script>

<template>
  <ElHeader class="border-b border-gray-200"></ElHeader>
  <ElMain class="h-[calc(100vh-60px)] !p-4">
    <ElAutoResizer>
      <template #default="{ height, width }">
        <ElTableV2 :columns="columns" :data="data" :width :height fixed>
        </ElTableV2>
      </template>
    </ElAutoResizer>
  </ElMain>
</template>
