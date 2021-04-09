<template>
    <div id="map" ref="map">
        <iframe width="100%" height="100%" src="https://data.gov.sg/dataset/e-waste-recycling/resource/95b95773-8c29-4a32-a9e1-461e622bf092/view/30a9e8b2-fd0e-4083-ba87-8aa51a4f0200" frameBorder="0"> </iframe>
    </div>
</template>

<script>
import firebase from 'firebase/app'
export default {
    data() {
        return {
            
        }
    },
    methods: {
        checkUser: function() {
            var user = firebase.auth().currentUser;
            if (user) {
                //user signed in
            }
            else {
                alert("Please log in to continue.")
                this.$router.push('/Login');
            }
        }
    },
    created() {
        this.checkUser();
    },
}
</script>

<style scoped>
#map {
    height: 700px;
    background: #E8E1CF;
}
</style>