import type { Column } from "element-plus";
import { Fragment } from "vue/jsx-runtime";

export const generateResourceColumns = (): Column[] => {
  const { showBehavior } = useBehavior();

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
      width: 200,
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
