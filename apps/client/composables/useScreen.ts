import { playScreen } from "@imrobot/monitor-screen";
import axios from "axios";
import { baseUrl } from "~/helpers";

const dialogVisible = ref(false);
const playerRef = ref<HTMLElement>();

export const useScreen = () => {
  const showScreen = async (time: number) => {
    const res = await axios.get(`${baseUrl.value}/screen/${time}`);
    if (res.data) {
      dialogVisible.value = true;
      nextTick(() => {
        playerRef.value!.innerHTML = "";
        playScreen(playerRef.value!, res.data, playerRef.value?.clientWidth);
      });
    } else {
      ElMessage.warning("无数据");
    }
  };

  return {
    dialogVisible,
    showScreen,
    playerRef,
  };
};
