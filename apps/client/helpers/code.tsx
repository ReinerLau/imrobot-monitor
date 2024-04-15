import type { Column } from "element-plus";

export const generateCodeColumns = (): Column[] => {
  const { showSource } = useSource();

  return [
    {
      dataKey: "url",
      title: "URL",
      width: 150,
      align: "center",
    },
    {
      dataKey: "fileName",
      title: "文件",
      width: 150,
      align: "center",
    },
    {
      dataKey: "message",
      title: "信息",
      width: 150,
      align: "center",
    },
    {
      dataKey: "time",
      title: "时间",
      width: 150,
      align: "center",
    },
    {
      dataKey: "lineNumber",
      title: "行",
      width: 150,
      align: "center",
    },
    {
      dataKey: "columnNumber",
      title: "列",
      width: 150,
      align: "center",
    },
    {
      dataKey: "source",
      title: "源码",
      width: 150,
      align: "center",
      cellRenderer: ({ rowData }) => (
        <el-button type="primary" onClick={() => showSource(rowData)}>
          查看
        </el-button>
      ),
    },
    {
      dataKey: "behavior",
      title: "行为",
      width: 150,
      align: "center",
    },
    {
      dataKey: "screen",
      title: "录屏",
      width: 150,
      align: "center",
    },
  ];
};
