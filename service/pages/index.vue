<script lang="tsx" setup>
import dayjs from "dayjs";

const { data } = useFetch("/api/project");
</script>

<template>
  <header class="h-16 flex items-center p-4 shadow-md">
    <Button label="添加项目" />
  </header>
  <ScrollPanel class="h-[calc(100vh-96px)] m-4">
    <DataTable :value="data">
      <Column field="id" header="编号" sortable></Column>
      <Column field="name" header="名称" sortable></Column>
      <Column field="token" header="密钥" sortable></Column>
      <Column field="createdAt" header="创建时间" sortable>
        <template #body="{ data }">
          <Tag :value="dayjs(data.createdAt).format('YYYY-MM-DD HH:mm:ss')" />
        </template>
      </Column>
      <Column header="数据">
        <template #body="{ data }">
          <div class="flex gap-2">
            <NuxtLink :to="`/record/${data.token}`">
              <Button label="录屏" />
            </NuxtLink>
            <Button label="动作" />
            <Button label="错误" />
          </div>
        </template>
      </Column>
      <Column header="操作">
        <template #body="{ data }">
          <div class="flex gap-2">
            <Button label="编辑" />
            <Button label="删除" />
          </div>
        </template>
      </Column>
    </DataTable>
  </ScrollPanel>
</template>