import { dayjs, type Column } from "element-plus";

export const generateRequestColumns = (): Column[] => {
  const { showBehavior } = useBehavior();
  const { showScreen } = useScreen();

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
      cellRenderer: ({ rowData }) => (
        <span>{dayjs(rowData.time).format("YYYY-MM-DDTHH:mm:ss")}</span>
      ),
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
  ];
};
