import axios from "axios";

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
    let res = await axios.get("http://localhost:3001/api/getReportTime");
    times.value = res.data;
  };

  const getClearTime = async () => {
    let res = await axios.get("http://localhost:3001/api/getClearTime");
    times.value = res.data;
  };

  const handleSave = () => {
    if (currentType.value === "report") {
      axios.post("http://localhost:3001/api/setReportTime", {
        time: times.value.join(" "),
      });
    } else if ((currentType.value = "clear")) {
      axios.post("http://localhost:3001/api/setClearTime", {
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
