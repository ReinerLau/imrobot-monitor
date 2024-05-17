<script lang="ts" setup>
import dayjs from "dayjs";

const route = useRoute();

const { data, refresh } = useFetch("/api/error", {
  params: {
    token: route.params.token,
  },
});

const { renderCode } = useErrorCode();
</script>

<template>
  <header class="h-16 flex items-center p-4 shadow-md">
    <NuxtLink to="/">
      <i class="pi pi-arrow-left text-2xl text-[#00af9d]"></i>
    </NuxtLink>
  </header>
  <ScrollPanel class="h-[calc(100vh-96px)] m-4">
    <DataTable :value="data">
      <Column field="id" header="编号" sortable></Column>
      <Column field="type" header="类型" sortable></Column>
      <Column field="data" header="数据" sortable>
        <template #body="{ data }">
          <template v-if="data.type === 1">
            <div
              v-html="
                renderCode(
                  JSON.parse(data.data).code,
                  JSON.parse(data.data).lineNumber
                )
              "
            ></div>
          </template>
          <template v-else>
            {{ data.data }}
          </template>
        </template>
      </Column>
      <Column field="timestamp" header="创建时间" sortable>
        <template #body="{ data }">
          {{ dayjs(data.createdAt).format("YYYY-MM-DD HH:mm:ss") }}
        </template>
      </Column>
      <Column header="操作">
        <template #body="{ data }">
          <div class="flex gap-2">
            <Button label="查看" />
          </div>
        </template>
      </Column>
    </DataTable>
  </ScrollPanel>
</template>
