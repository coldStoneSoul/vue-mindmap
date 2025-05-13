<template>
  <div class="w-full h-full">
    <Mindmap />
  </div>
</template>

<script>
import { Mindmap } from './modules/mindmap'

export default {
  name: 'App',
  components: {
    Mindmap
  }
}
</script>