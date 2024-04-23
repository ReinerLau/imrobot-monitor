import { playScreen } from "@imrobot/screen";
import axios from "axios";

const dialogVisible = ref(false);
const playerRef = ref<HTMLElement>();

export const useScreen = () => {
  const showScreen = async (time: number) => {
    const res = await axios.get(`http://localhost:3001/screen/${time}`);
    if (res.data?.data) {
      dialogVisible.value = true;
      nextTick(() => {
        playerRef.value!.innerHTML = "";
        playScreen(
          playerRef.value!,
          res.data.data,
          playerRef.value?.clientWidth
        );
      });
    } else {
      ElMessage.warning("没有关联");
    }
  };

  return {
    dialogVisible,
    showScreen,
    playerRef,
  };
};
