import axios from "axios";

const behaviorStack = ref<{ type: string; content: string; time: string }[]>(
  []
);
const dialogVisible = ref(false);

export const useBehavior = () => {
  const showBehavior = async (rowData: any) => {
    if (rowData.behaviorId) {
      const res = await axios.get(
        `http://localhost:3001/behavior/${rowData.behaviorId}`
      );
      behaviorStack.value = res.data.data;
      dialogVisible.value = true;
    }
  };

  return {
    behaviorStack,
    showBehavior,
    dialogVisible,
  };
};
