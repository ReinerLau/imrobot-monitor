<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { addUserAction, domToJson } from './utlis'

const onClick = () => {
  // @ts-ignore
  noFunc()
}

const imgUrl = ref('https://img.la/200x200')

const onResources = () => {
  const random = Math.floor(Math.random() * 100) + 1
  imgUrl.value = `http://locslhost/${random}x${random}`
}

const onAsync = () => {
  setTimeout(() => {
    // @ts-ignore
    noFunc()
  }, 0)
}

const onPromise = () => {
  new Promise((resolve) => {
    // @ts-ignore
    noFunc()
    resolve(true)
  })
}

onMounted(() => {
  document.addEventListener('click', function (event) {
    /**
     * 被点击的最内层元素
     */
    const target = event.target as HTMLElement | null

    /**
     * 过滤掉 html 和 body 层
     */
    if (target === document.documentElement || target === document.body) {
      return
    }

    if (target && target.textContent !== null) {
      /**
       * 如果元素不包含文本内容，则不执行后续操作
       */
      if (!(target.textContent.trim() !== '')) {
        return
      }

      /**
       * 如果目标元素是按钮，则不限制子元素数量
       * 如果目标元素不是按钮，则限制子元素数量不超过 1
       */
      if (target.tagName === 'BUTTON' || target.children.length <= 1) {
        const json = domToJson(target)
        console.log(JSON.stringify(json, null, 2))

        addUserAction({
          type: 'click',
          time: Date.now(),
          value: json,
        })

        // 读取 localStorage 中的 monitorLog 数组
        let monitorLog = JSON.parse(localStorage.getItem('imrobotMonitorUserAction') || '[]')

        // 向数组添加新的数据
        monitorLog.push(json)

        // 检查数组长度是否超过限制
        if (monitorLog.length > 10) {
          // 移除数组的第一条数据
          monitorLog.shift()
        }

        // 将更新后的数组存储回 localStorage
        localStorage.setItem('monitorLog', JSON.stringify(monitorLog))
      }
    }
  })
})
</script>

<template>
  <div class="flex flex-col gap-4 p-4">
    <div class="flex gap-4">
      <NButton @click="onClick">运行错误</NButton>
      <NButton @click="onResources">资源加载错误</NButton>
      <NButton @click="onAsync">异步错误</NButton>
      <NButton @click="onPromise">promise 错误</NButton>
    </div>
    <NImage :src="imgUrl" fallback-src="https://img.la/200x200" />
  </div>
</template>
