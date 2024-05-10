<script lang="tsx" setup>
import dayjs from "dayjs";

const { data, refresh } = useFetch("/api/record");

function stringToSize(str: string): string {
  /**
   * 使用 Blob 对象来获取字符串的字节长度
   */
  const bytes: number = new Blob([str]).size;

  return `${(bytes / 1024).toFixed(2)} KB`;
}

const { playScreen, target: rrwebPlayer, visible } = useScreen();

const confirm = useConfirm();
const toast = useToast();

const deleteConfirm = (id: number, event: MouseEvent) => {
  confirm.require({
    target: event.currentTarget as HTMLElement,
    message: "您想要删除这条记录吗？",
    icon: "pi pi-info-circle",
    rejectClass: "p-button-secondary p-button-outlined p-button-sm",
    acceptClass: "p-button-danger p-button-sm",
    rejectLabel: "取消",
    acceptLabel: "删除",
    position: "top",
    accept: async () => {
      await useFetch(`/api/record/${id}`, {
        method: "DELETE",
      });
      await refresh();
      toast.add({
        severity: "success",
        summary: "删除成功",
        detail: "这条数据记录已完成删除",
        life: 5000,
      });
    },
  });
};
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
            <Button
              @click="deleteConfirm(data.id, $event)"
              label="删除"
              severity="danger"
            />
          </div>
        </template>
      </Column>
    </DataTable>
  </ScrollPanel>
  <Dialog v-model:visible="visible" modal header="录屏数据回放">
    <div ref="rrwebPlayer" class=""></div>
  </Dialog>
  <Toast />
  <ConfirmPopup />
</template>

<style>
.rr-player {
  float: none;
  border: 1px solid #0002;
  box-sizing: content-box;
}
</style>
