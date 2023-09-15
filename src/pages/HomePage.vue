<template>
  Hello there
</template>

<script>
import { defineComponent, onMounted } from 'vue'
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'HomePage',
  setup() {
    onMounted(() => {
      useRouter().push('/all')
    })
  }
})
</script>
