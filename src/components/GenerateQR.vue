<template>
  <vue-qrcode value='[{"item":"glass"}, {"points":40}]' />
</template>
<script>
import VueQrcode from 'vue-qrcode'
 
export default {
  components: {
    VueQrcode,
  },
}
</script>