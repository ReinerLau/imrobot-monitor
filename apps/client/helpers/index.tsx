import { dayjs, type Column } from "element-plus";
import { Fragment } from "vue/jsx-runtime";

export const getColumns = (): Column[] => {
  const { showBehavior } = useBehavior();
  const { showScreen } = useScreen();
  const router = useRouter();

  const showError = (startTime: number, endTime: number) => {
    router.push({ name: "error", query: { startTime, endTime } });
  };

  return [
    {
      dataKey: "time",
      title: "采集时间",
      width: 500,
      align: "center",
      cellRenderer: ({ rowData }) => (
        <Fragment>
          <span>{dayjs(rowData.startTime).format("YYYY-MM-DDTHH:mm:ss")}</span>
          <span>-</span>
          <span>{dayjs(rowData.endTime).format("YYYY-MM-DDTHH:mm:ss")}</span>
        </Fragment>
      ),
    },
    {
      dataKey: "action",
      title: "操作",
      width: 500,
      align: "center",
      cellRenderer: ({ rowData }) => (
        <Fragment>
          <el-button
            type="primary"
            onClick={() => showError(rowData.startTime, rowData.endTime)}
          >
            错误
          </el-button>
          <el-button
            type="primary"
            onClick={() => showBehavior(rowData.endTime)}
          >
            行为
          </el-button>
          <el-button
            type="primary"
            onClick={() => showScreen(rowData.startTime, rowData.endTime)}
          >
            录屏
          </el-button>
        </Fragment>
      ),
    },
  ];
};

export const baseUrl = ref("http://localhost:3001");
