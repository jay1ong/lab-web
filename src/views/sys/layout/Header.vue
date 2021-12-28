<template>
  <div class="float-right text-xl p-6 flex items-center">
    <div class="mr-4 flex items-center">
      <span class="iconify mr-2" data-icon="ant-design:user-outlined"></span>
      <span class="text-sm">header</span>
    </div>
    <div class="flex items-center" @click="handleLogout">
      <span class="iconify mr-2" data-icon="ant-design:logout-outlined"></span>
      <span class="text-sm">注销</span>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "Header",
};
</script>
<script lang="ts" setup>
const handleLogout = () => {};
</script>
