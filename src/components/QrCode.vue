<template>
  <div>
    <!-- <p class="decode-result">Last result: <b>{{ result }}</b></p> -->
    <br>
    <qrcode-stream :camera="camera" @decode="onDecode" @init="onInit">
    
      <div v-if="validationSuccess" class="validation-success">
        Success!
      </div>

      <div v-if="validationFailure" class="validation-failure">
        This is NOT a valid QR code!
      </div>

      <div v-if="validationPending" class="validation-pending">
        Validation in progress...
      </div>
    </qrcode-stream>
    
  </div>
</template>

<script>
export default {
  data () {
    return {
      isValid: undefined,
      camera: 'auto',
      result: null,
      dragover: false
    }
  },

  computed: {
    validationPending () {
      return this.isValid === undefined
        && this.camera === 'off'
    },

    validationSuccess () {
      return this.isValid === true
    },

    validationFailure () {
      return this.isValid === false
    }
  },

  methods: {

    onInit (promise) {
      promise
        .catch(console.error)
        .then(this.resetValidationState)
    },

    async onDecode (content) {
        this.result = content
        this.turnCameraOff()

        this.isValid = content.startsWith('[{')
        
        await this.timeout(2000)

        if (!this.isValid) {
            this.turnCameraOn()
            this.isValid = undefined
        } else {
            this.$router.push({name:" Login ", params:{data: this.result}});
        }
      
    },

    turnCameraOn () {
      this.camera = 'auto'
    },

    turnCameraOff () {
      this.camera = 'off'
    },

    timeout (ms) {
      return new Promise(resolve => {
        window.setTimeout(resolve, ms)
      })
    }

  }
}
</script>

<style scoped>
.validation-success,
.validation-failure,
.validation-pending {
  position: absolute;
  width: 100%;
  height: 100%;

  background-color: rgba(255, 255, 255, .8);
  text-align: center;
  font-weight: bold;
  font-size: 3rem;
  padding: 10px;

  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
}
.validation-success {
  color: green;
}
.validation-failure {
  color: red;
}
.qrcode-stream__camera {
  position: fixed;
  right: 50%;
  bottom: 50%;
  max-width: 50% !important;
  max-height: 50% !important;
}

</style>