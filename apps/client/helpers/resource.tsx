import type { Column } from "element-plus";

export const generateResourceColumns = (): Column[] => {
  return [
    {
      dataKey: "url",
      title: "URL",
      width: 150,
      align: "center",
    },
    {
      dataKey: "source",
      title: "资源",
      width: 150,
      align: "center",
    },
    {
      dataKey: "target",
      title: "标签",
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
