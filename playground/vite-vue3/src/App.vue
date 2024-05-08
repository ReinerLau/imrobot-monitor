<script setup lang="ts">
import { record, type EventType } from "rrweb";

window.onload = async function () {
  let recordData: EventType[] = [];

  record({
    async emit(event, isCheckout) {
      if (isCheckout) {
        await fetch("http://localhost:3000/api/record", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(recordData),
        });
        recordData = [];
        record.takeFullSnapshot();
      } else {
        recordData.push(event);
      }
    },
    checkoutEveryNms: 5 * 1000,
  });
};
</script>

<template>
  <div>
    <NButton>点击按钮</NButton>
  </div>
</template>
