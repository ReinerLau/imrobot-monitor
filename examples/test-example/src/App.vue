<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { parseSourceMap } from '@imrobot/source'
import { play } from '@imrobot/screen'

const onClick = () => {
  getErrorList()
  test1()
}

const visible = ref(false)

const onAsync = () => {
  setTimeout(() => {
    test1()
  }, 0)
}

const onPromise = () => {
  new Promise((resolve) => {
    test1()
    resolve('test')
  })
}

const onXHR = () => {
  const xhr = new XMLHttpRequest()
  xhr.open('GET', 'http://localhost:5173/test', true)
  xhr.send(JSON.stringify({ name: 'test' }))
}

const onAxios = () => {
  axios.get('/test', {
    params: {
      name: 'test'
    },
    data: {
      name: 'test'
    }
  })
}

const showSource = async (fileName: string, lineNumber: number, columnNumber: number) => {
  const res = await axios.get('/getMap', {
    params: {
      fileName: handleFileName(fileName)
    }
  })
  const result = await parseSourceMap(res.data, lineNumber, columnNumber)

  sourceCodeRef.value!.innerHTML = result
}

const handleFileName = (str: string) => {
  const reg = /\/assets\/.*/
  const res = str.match(reg)
  if (res && Array.isArray(res)) {
    return res[0]
  }
}

const sourceCodeRef = ref<HTMLElement>()

const errorList = ref<
  { time: number; fileName: string; lineNumber: number; columnNumber: number }[]
>([])

const getErrorList = () => {
  setTimeout(async () => {
    const res = await axios.get('/getErrorList')
    errorList.value = res.data.data
  }, 500)
}

const onScreen = () => {
  play(sourceCodeRef.value!)
}

onMounted(getErrorList)
</script>

<template>
  <button @click="onClick">运行错误</button>
  <button @click="visible = true">资源加载错误</button>
  <button @click="onAsync">异步错误</button>
  <button @click="onPromise">promise 错误</button>
  <button @click="onXHR">xhr 请求错误</button>
  <button @click="onAxios">axios 请求错误</button>
  <button @click="onScreen">查看录屏</button>
  <div v-for="item in errorList" :key="item.time">
    <div>
      {{ item.fileName }}
    </div>
    <button @click="() => showSource(item.fileName, item.lineNumber, item.columnNumber)">
      查看源码
    </button>
  </div>
  <img v-if="visible" src="http://www.abc.com/test.png" />
  <div ref="sourceCodeRef"></div>
</template>

<style scoped></style>
