export default () => {
  const visible = ref(false);

  const behaviorData = ref<any>([]);

  const getData = async (query: {
    token?: string;
    startTime?: number;
    endTime?: number;
  }) => {
    try {
      const result = await $fetch("/api/action", {
        method: "get",
        query,
      });
      behaviorData.value = result;
    } catch (error) {
      behaviorData.value = [];
    }
  };

  return {
    behaviorData,
    visible,
    getData,
  };
};
