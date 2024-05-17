<script lang="tsx" setup>
import dayjs from "dayjs";

const toast = useToast();

const {
  data: projectData,
  visible: projectVisible,
  formData,
  create,
  update,
  _delete,
} = useProject();

const { visible: behaviorVisible, getData, behaviorData } = useBehavior();

const copyTip = ref("点击复制");

const copyToken = async (token: string) => {
  await navigator.clipboard.writeText(token);
  toast.add({
    detail: token,
    life: 3000,
    severity: "success",
    summary: "复制成功",
  });
};

const { screenDialogVisible, showScreenDialog, currentScreenInfo } =
  useScreen();

const toggleBehavior = async (token: string) => {
  await getData({
    endTime: Date.now(),
    startTime: Date.now() - 1000 * 60 * 60 * 24 * 30,
    token,
  });
  behaviorVisible.value = true;
};

const handleExport = async () => {
  const res = await useFetch("/api/file/export");
  const jsonStr = JSON.stringify(res.data.value);
  const a = document.createElement("a");
  const file = new Blob([jsonStr], { type: "application/json" });
  a.href = URL.createObjectURL(file);
  a.download = Date.now() + ".json";
  a.click();
};
</script>

<template>
  <header class="h-16 gap-2 flex items-center p-4 shadow-md">
    <Button @click="projectVisible = true" label="添加项目" />
    <Button @click="handleExport" label="导出" />
    <FileUpload
      mode="basic"
      name="file"
      url="/api/file/import"
      :auto="true"
      chooseLabel="导入"
    />
  </header>
  <ScrollPanel class="h-[calc(100vh-96px)] m-4">
    <DataTable :value="projectData">
      <Column field="id" header="编号" sortable></Column>
      <Column field="name" header="名称" sortable></Column>
      <Column field="token" header="密钥" sortable>
        <template #body="{ data }">
          <code
            v-tooltip="copyTip"
            class="p-2 bg-slate-500 text-white rounded-md cursor-pointer"
            @click="copyToken(data.token)"
          >
            {{ data.token }}
          </code>
        </template>
      </Column>
      <Column field="createdAt" header="创建时间" sortable>
        <template #body="{ data }">
          <Tag :value="dayjs(data.createdAt).format('YYYY-MM-DD HH:mm:ss')" />
        </template>
      </Column>
      <Column header="数据">
        <template #body="{ data }">
          <div class="flex gap-2">
            <Button label="录屏" @click="() => showScreenDialog(data)" />
            <Button @click="toggleBehavior(data.token)" label="动作" />
            <NuxtLink :to="`/error/${data.token}`">
              <Button label="错误" />
            </NuxtLink>
          </div>
        </template>
      </Column>
      <Column header="操作">
        <template #body="{ data }">
          <div class="flex gap-2">
            <Button
              @click="
                (formData = Object.assign({}, data)) && (projectVisible = true)
              "
              label="编辑"
            />
            <Button @click="_delete(data.id, $event)" label="删除" />
            <FileUpload
              mode="basic"
              name="file"
              :url="`/api/file/resource/?token=${data.token}`"
              chooseLabel="导入资源"
              :auto="true"
            />
          </div>
        </template>
      </Column>
    </DataTable>
  </ScrollPanel>
  <Dialog
    v-model:visible="projectVisible"
    modal
    :header="`${!formData.id ? '新增' : '编辑'}项目`"
    @hide="formData = {}"
  >
    <div class="flex items-center gap-4 mb-4">
      <label for="username" class="font-semibold">名称</label>
      <InputText v-model:model-value="formData.name" />
    </div>
    <div class="flex justify-end gap-2">
      <Button
        label="取消"
        severity="secondary"
        @click="projectVisible = false"
      ></Button>
      <Button label="确认" @click="!formData.id ? create() : update()"></Button>
    </div>
  </Dialog>
  <Toast />
  <ConfirmPopup />
  <ScreenDialog
    v-model:visible="screenDialogVisible"
    v-bind="currentScreenInfo"
  />
  <BehaviorDialog v-model="behaviorVisible" :behavior-data="behaviorData" />
</template>
