import axios from "axios";
import { baseUrl } from "~/helpers";

const behaviorStack = ref<{ type: string; content: string; time: string }[]>(
  []
);
const dialogVisible = ref(false);

export const useBehavior = () => {
  const showBehavior = async (time: number) => {
    const res = await axios.get(`${baseUrl.value}/behavior/${time}`);
    if (res.data?.data) {
      behaviorStack.value = res.data.data;
      dialogVisible.value = true;
    } else {
      ElMessage.warning("无数据");
    }
  };

  return {
    behaviorStack,
    showBehavior,
    dialogVisible,
  };
};
