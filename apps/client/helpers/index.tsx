import { dayjs, type Column } from "element-plus";
import { Fragment } from "vue/jsx-runtime";

export const getColumns = (): Column[] => {
  const { showBehavior } = useBehavior();
  const { showScreen } = useScreen();

  return [
    {
      dataKey: "time",
      title: "采集时间",
      width: 500,
      align: "center",
      cellRenderer: ({ rowData }) => (
        <span>{dayjs(rowData.time).format("YYYY-MM-DDTHH:mm:ss")}</span>
      ),
    },
    {
      dataKey: "action",
      title: "操作",
      width: 500,
      align: "center",
      cellRenderer: ({ rowData }) => (
        <Fragment>
          <el-button type="primary" onClick={() => showBehavior(rowData.time)}>
            行为
          </el-button>
          <el-button type="primary" onClick={() => showScreen(rowData.time)}>
            录屏
          </el-button>
        </Fragment>
      ),
    },
  ];
};
