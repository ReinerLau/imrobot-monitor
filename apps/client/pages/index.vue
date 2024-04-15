<script lang="tsx" setup>
import axios from "axios";
import type { CardInstance, Column } from "element-plus";

const columns: Column[] = [
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
const data = ref<any[]>([]);

const tableWidth = ref(0);
const tableHeight = ref(0);

const tableContainerRef = ref<CardInstance>();

async function getErrors() {
  const res = await axios.get("http://localhost:3001/error/code");
  data.value = res.data;
}

onMounted(() => {
  tableWidth.value = tableContainerRef.value!.$el.clientWidth;
  tableHeight.value = tableContainerRef.value!.$el.clientHeight;
  getErrors();
});

const loading = ref(false);

function handleUploadProgress() {
  loading.value = true;
}

function handleUploadSuccess(res: any) {
  loading.value = false;
}

function handleUploadError(error: Error) {
  loading.value = false;
}

interface Data {
  url: string;
  lineNumber: number;
  columnNumber: number;
  fileName: string;
}

const handleFileName = (str: string) => {
  const reg = /\/([^/]+)$/;
  const match = str.match(reg);
  return match ? match[1] : "";
};

const code = ref<string>("");
const file = ref<string>("");

async function showSource(rowData: Data) {
  const res = await axios.get("http://localhost:3001/error/getMap", {
    params: {
      fileName: rowData.fileName,
    },
  });
  dialogVisible.value = true;
  if (process.env.NODE_ENV === "development") {
    file.value = rowData.fileName;
    code.value = renderCode({ code: res.data, line: rowData.lineNumber - 1 });
  } else {
    const result = await parseSourceMap({
      sourceMap: res.data,
      lineNumber: rowData.lineNumber,
      columnNumber: rowData.columnNumber,
    });
    file.value = result.file;
    code.value = result.code;
  }
}

async function clearMap() {
  const res = await axios.delete("http://localhost:3001/error/clearMap");
  if (res.status === 200) {
    ElMessage.success({
      message: "清空成功",
    });
  }
}

async function exportFile() {
  const res = await axios.get("http://localhost:3001/error/export", {
    responseType: "arraybuffer",
  });
  const content = new Blob([res.data], { type: res.headers["content-type"] });
  const url = URL.createObjectURL(content);
  const link = document.createElement("a");
  link.href = url;
  link.download = "data.zip";
  link.click();
}

const dialogVisible = ref(false);
const activeTab = ref("code");
</script>

<template>
  <div class="flex flex-col h-screen p-2">
    <div class="flex justify-between p-1">
      <div class="flex">
        <el-upload
          action="http://localhost:3001/error/uploadSourceMap"
          name="files"
          accept=".map"
          :multiple="true"
          :show-file-list="false"
          @progress="handleUploadProgress"
          @success="handleUploadSuccess"
          @error="handleUploadError"
        >
          <el-button class="mr-2" type="primary" :loading="loading"
            >上传 sourcemap</el-button
          >
        </el-upload>
        <el-button type="primary" @click="clearMap">清空 sourcemap</el-button>
      </div>
      <div>
        <el-button type="primary">上传</el-button>
        <el-button type="primary" @click="exportFile">导出</el-button>
      </div>
    </div>
    <el-tabs v-model="activeTab">
      <el-tab-pane label="运行错误" name="code"></el-tab-pane>
      <el-tab-pane label="资源加载错误" name="resource"></el-tab-pane>
      <el-tab-pane label="异步错误" name="async"></el-tab-pane>
      <el-tab-pane label="promise 错误" name="promise"></el-tab-pane>
      <el-tab-pane label="请求错误" name="request"></el-tab-pane>
    </el-tabs>
    <el-card v-if="activeTab === 'code'" ref="tableContainerRef" class="flex-1">
      <el-table-v2
        :columns="columns"
        :data="data"
        :width="tableWidth"
        :height="tableHeight"
        fixed
      />
    </el-card>
    <el-dialog v-model="dialogVisible">
      <div class="bg-green-500 mb-2 text-white">{{ file }}</div>
      <div class="bg-slate-900 text-white">
        <span v-html="code"></span>
      </div>
    </el-dialog>
  </div>
</template>

<style>
code.hljs .hljs-deletion {
  background-color: red !important;
}
</style>
