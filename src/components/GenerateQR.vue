<template>
  <vue-qrcode value='localhost:8080/Login/[{"item":"glass"}, {"points":40}]' />
</template>
<script>
import VueQrcode from 'vue-qrcode'
 
export default {
  components: {
    VueQrcode,
  },
}
</script>