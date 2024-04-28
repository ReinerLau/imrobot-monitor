import axios from "axios";
import { baseUrl } from "~/helpers";

const dialogVisible = ref(false);
const times = ref<string[]>([]);
const currentType = ref("");

export const useTime = () => {
  const showTime = (type: string) => {
    currentType.value = type;
    if (type === "report") {
      getReportTime();
    } else if (type === "clear") {
      getClearTime();
    }
    dialogVisible.value = true;
  };

  const getReportTime = async () => {
    let res = await axios.get(`${baseUrl.value}/api/getReportTime`);
    times.value = res.data;
  };

  const getClearTime = async () => {
    let res = await axios.get(`${baseUrl.value}/api/getClearTime`);
    times.value = res.data;
  };

  const handleSave = () => {
    if (currentType.value === "report") {
      axios.post(`${baseUrl.value}/api/setReportTime`, {
        time: times.value.join(" "),
      });
    } else if ((currentType.value = "clear")) {
      axios.post(`${baseUrl.value}/api/setClearTime`, {
        time: times.value.join(" "),
      });
    }
    dialogVisible.value = false;
  };

  return {
    dialogVisible,
    showTime,
    times,
    handleSave,
  };
};
