import type { Column } from "element-plus";
import { Fragment } from "vue/jsx-runtime";

export const generateRequestColumns = (): Column[] => {
  const { showBehavior } = useBehavior();

  return [
    {
      dataKey: "url",
      title: "URL",
      width: 150,
      align: "center",
    },
    {
      dataKey: "requestURL",
      title: "请求",
      width: 150,
      align: "center",
    },
    {
      dataKey: "time",
      title: "发起时间",
      width: 150,
      align: "center",
    },
    {
      dataKey: "elapsedTime",
      title: "花费时间",
      width: 150,
      align: "center",
    },
    {
      dataKey: "response",
      title: "响应",
      width: 150,
      align: "center",
    },
    {
      dataKey: "status",
      title: "状态码",
      width: 150,
      align: "center",
    },
    {
      dataKey: "method",
      title: "请求方法",
      width: 150,
      align: "center",
    },
    {
      dataKey: "requestData",
      title: "请求数据",
      width: 150,
      align: "center",
    },
    {
      dataKey: "action",
      title: "操作",
      width: 200,
      align: "center",
      cellRenderer: ({ rowData }) => (
        <Fragment>
          <el-button type="primary" onClick={() => showBehavior(rowData)}>
            行为
          </el-button>
          <el-button type="primary" onClick={() => showBehavior(rowData)}>
            录屏
          </el-button>
        </Fragment>
      ),
    },
  ];
};
