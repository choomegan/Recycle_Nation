<template>
    <div id="map" ref="map">
    </div>
</template>

<script>
import firebase from 'firebase/app'
export default {
    data() {
        return {
            map: null,
            binLoc: [
                {
                    lat: 1.2916836995954026, 
                    lng: 103.77561061127166
                },
                {
                    lat: 1.300303624823667, 
                    lng: 103.77406848613495
                },
                {
                    lat: 1.2943608820295256, 
                    lng: 103.77002309777859
                },
                {
                    lat: 1.2920572734498554, 
                    lng: 103.77462872291534
                },
                {
                    lat: 1.293119051664117, 
                    lng: 103.77155920147746
                },
                {
                    lat: 1.2950282973752518, 
                    lng: 103.77373715516606
                },
                {
                    lat: 1.2968517329733926, 
                    lng: 103.77331873056981
                },
                {
                    lat: 1.3003698873417844, 
                    lng: 103.77086182721274
                }
            ]
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
    mounted() {
        this.map = new window.google.maps.Map(this.$refs["map"], { 
            center: { lat: 1.29351044576514, lng: 103.77298601588865 },
            zoom: 17
        })
        var loc;
        for (loc of this.binLoc) {
            new window.google.maps.Marker({
                position: { lat: loc.lat, lng: loc.lng },
                map: this.map
            })
        }
    }
}
</script>

<style scoped>
#map {
    height: 700px;
    background: #E8E1CF;
}
</style>