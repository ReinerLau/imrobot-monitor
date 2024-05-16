<script lang="ts" setup>
import dayjs from "dayjs";

const visible = defineModel({
  default: false,
});

const props = defineProps<{
  behaviorData: any[];
}>();

const timelineData = computed(() => {
  return props.behaviorData;
});

function jsonToHtml(json: any): HTMLElement {
  const element = document.createElement(json.tagName);

  // for (const attr in json.attributes) {
  //   element.setAttribute(attr, json.attributes[attr]);
  // }

  json.children.forEach((child: []) => {
    if (typeof child === "object") {
      const childElement = jsonToHtml(child);
      element.appendChild(childElement);
    } else if (typeof child === "string") {
      const textNode = document.createTextNode(child);
      element.appendChild(textNode);
    }
  });

  return element;
}
</script>

<template>
  <Dialog v-model:visible="visible">
    <Timeline :value="timelineData" align="right">
      <template #opposite="slotProps">
        <small class="p-text-secondary">{{
          dayjs(slotProps.item.timestamp).format("YYYY-MM-DD HH:mm:ss")
        }}</small>
      </template>
      <template #content="slotProps">
        {{
          slotProps.item.type === 1
            ? jsonToHtml(JSON.parse(slotProps.item.data)).outerHTML
            : ""
        }}
      </template>
    </Timeline>
  </Dialog>
</template>
