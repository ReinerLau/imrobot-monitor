export default () => {
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
  };

  const update = async () => {
    await $fetch("/api/project", {
      method: "PUT",
      body: JSON.stringify(formData.value),
    });
    await refresh();
    visible.value = false;
  };

  return {
    create,
    data,
    formData,
    update,
    visible,
  };
};
