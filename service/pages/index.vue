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

const toggleBehavior = async (token: string) => {
  await getData({
    endTime: Date.now(),
    startTime: Date.now() - 1000 * 60 * 60 * 24 * 30,
    token,
  });
  behaviorVisible.value = true;
};
</script>

<template>
  <header class="h-16 flex items-center p-4 shadow-md">
    <Button @click="projectVisible = true" label="添加项目" />
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
            <NuxtLink :to="`/record/${data.token}`">
              <Button label="录屏" />
            </NuxtLink>
            <Button @click="toggleBehavior(data.token)" label="动作" />
            <Button label="错误" />
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
  <BehaviorDialog v-model="behaviorVisible" :behavior-data="behaviorData" />
</template>
