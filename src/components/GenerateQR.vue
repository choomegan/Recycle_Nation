<template>
  <vue-qrcode value='[{"item":"metal"}, {"points":40}]' />
</template>
<script>
import VueQrcode from 'vue-qrcode'
 
export default {
  components: {
    VueQrcode,
  },
}
</script>