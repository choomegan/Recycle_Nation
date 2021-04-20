<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal">
        <header class="modal-header" id="modalTitle" >
          <slot name="header">
            {{this.item.name}}
          </slot>
          <div v-if="this.points < this.item.points">
          <button id="cross" v-on:click="close">
            x
          </button>
          </div>
          <div v-if="success">
          <button id="cross" v-on:click="successfullyRedeemed">
            x
          </button>
          </div>
        </header>

        <section class="modal-body" id="modalDescription" >
          <slot name="body">
              <div v-if="!success">
                <div>
                    <img id="icon" :src="this.item.image"/>
                </div>  
            
                <div v-if="this.points < this.item.points">
                    You do not have enough points to redeem this reward. Recycle more to earn more points!
                </div>
                <div v-if="this.points >= this.item.points">
                    Current Points: {{this.points}} <br>
                    Points required to redeem reward: {{this.item.points}} <br>
                    Points left after redemption: {{this.points - this.item.points}} <br>
                </div>
            </div>
            <div v-if="success">
                <div v-if="this.item.title == 'tree'">
                    Congratulations you have planted a tree!
                </div>
                <div v-if="this.item.title == 'GrabFood'">
                    Congratulations you have redeemed a GrabFood Voucher! 
                    <br> You can now view the voucher and redemption code at [My Rewards]
                </div>
                <div v-if="this.item.title == 'GrabGifts'">
                    Congratulations you have redeemed a GrabGifts Voucher! 
                    <br> You can now view the voucher and redemption code at [My Rewards]
                </div>
                <div v-if="this.item.title == 'Donate'">
                    Congratulations you have donated $1!
                </div>
            </div>
            
          </slot>
        </section>

        <footer class="modal-footer">
          <slot name="footer">
            
          </slot>
          <div v-if="!success">
          <button @click="close" v-if="this.points > this.item.points" >Cancel</button>
          </div>
          <div v-if="!success">
          <button @click="redeem" v-if="this.points > this.item.points">Redeem</button>
          </div>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
import db from '../firebase.js'

  export default {
    name: 'Modal',
    data() {
        return {
            points: 0,
            success:false,
        }
    },
    props: {
        item: Object,
        email: String,
    },
    methods: {
      close() {
        this.$emit('close');
      },
      successfullyRedeemed() {
          this.success = false;
          this.$emit('success')
      },
      getPoints() {
        db.collection(this.email).doc("Profile").get().then((doc) => {
            this.points = doc.data().points;
            console.log("getPoints")
            console.log(this.email, this.points, this.item.title)
            console.log(this.points > this.item.points)
        })
        console.log(this.points > this.item.points)
      },
      redeem() {
            this.points -= this.item.points;
            db.collection(this.email).doc("Profile").update({
                points: this.points
            }).then(() => console.log("Successfully updated points")).catch((error) => {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
            this.success = true;

      },
    },
    watch: {
        email: function() {
            this.getPoints()
        }
    },
  };
</script>

<style>
#cross {
    padding: 0px;
    width: 30px;
    height: 30px;
}
#icon {
    height: 110px;
    max-width: 250px;
}
  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    
  }

  .modal {
    background: #FFFFFF;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    padding: 10px;
    width: 60%;
  }

  .modal-header,
  .modal-footer {
    padding: 15px;
    display: flex;
    flex-direction: row;
  }

  .modal-header {
    position: relative;
    border-bottom: 1px solid #eeeeee;
    color: #4AAE9B;
    justify-content: space-between;
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
   
  }

  .modal-body {
    position: relative;
    padding: 20px 10px;
    flex-direction: row;
    
  }

  .modal-fade-enter,
  .modal-fade-leave-to {
    opacity: 0;
  }

  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: opacity .5s ease;
  }
</style>