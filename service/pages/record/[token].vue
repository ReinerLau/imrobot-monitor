<script lang="tsx" setup>
import dayjs from "dayjs";

const { data } = useFetch("/api/record");

function stringToSize(str: string): string {
  /**
   * 使用 Blob 对象来获取字符串的字节长度
   */
  const bytes: number = new Blob([str]).size;

  return `${(bytes / 1024).toFixed(2)} KB`;
}

const { playScreen, target: rrwebPlayer, visible } = useScreen();
</script>

<template>
  <header class="h-16 flex items-center p-4 shadow-md">
    <Button label="添加项目" />
  </header>
  <ScrollPanel class="h-[calc(100vh-96px)] m-4">
    <DataTable :value="data">
      <Column field="id" header="编号" sortable></Column>
      <Column field="createdAt" header="创建时间" sortable>
        <template #body="{ data }">
          {{ dayjs(data.createdAt).format("YYYY-MM-DD HH:mm:ss") }}
        </template>
      </Column>
      <Column field="createdAt" header="数据大小">
        <template #body="{ data }">
          {{ stringToSize(data.data) }}
        </template>
      </Column>
      <Column header="操作">
        <template #body="{ data }">
          <div class="flex gap-2">
            <Button @click="playScreen(data.data)" label="查看" />
            <Button label="删除" />
          </div>
        </template>
      </Column>
    </DataTable>
  </ScrollPanel>
  <Dialog v-model:visible="visible">
    <div ref="rrwebPlayer"></div>
  </Dialog>
</template>
