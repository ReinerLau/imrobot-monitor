export default () => {
  const confirm = useConfirm();
  const toast = useToast();

  const { data, refresh } = useFetch("/api/project");

  const visible = ref(false);

  const formData = ref<{
    id?: number;
    name?: string;
    token?: string;
    createdAt?: number;
  }>({});

  watchEffect(() => visible.value || (formData.value = {}));

  const create = async () => {
    await $fetch("/api/project", {
      method: "POST",
      body: JSON.stringify(formData.value),
    });
    await refresh();
    visible.value = false;
    toast.add({
      severity: "success",
      summary: "创建成功",
      detail: "这条数据记录已完成创建",
      life: 5000,
    });
  };

  const update = async () => {
    await $fetch("/api/project", {
      method: "PUT",
      body: JSON.stringify(formData.value),
    });
    await refresh();
    visible.value = false;
    toast.add({
      severity: "success",
      summary: "更新成功",
      detail: "这条数据记录已完成更新",
      life: 5000,
    });
  };

  const _delete = (id: number, event: MouseEvent) => {
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
        await useFetch(`/api/project/${id}`, {
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

  return {
    _delete,
    create,
    data,
    formData,
    update,
    visible,
  };
};
