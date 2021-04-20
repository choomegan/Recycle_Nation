<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal">
        <header class="modal-header" id="modalTitle" >
          <slot name="header">
            Delete reward
          </slot>
        </header>

        <section class="modal-body" id="modalDescription" >
          <slot name="body">
                <div>
                    <img id="icon" :src="this.item.image"/>
                </div>  
                {{this.item.name}}<br>
                {{this.item.code}}
          </slot>
        </section>

        <footer class="modal-footer">
          <slot name="footer">
            
          </slot>
          <button @click="close">Cancel</button>
          <button @click="confirmDelete">Delete</button>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'Deletion',
    data() {
        return {
            points: 0,
        }
    },
    props: {
        item: Object,
    },
    methods: {
      close() {
        this.$emit('close');
      },
      confirmDelete() {
          console.log("clicked on delete")
          this.$emit('deleted')
      }
    }
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
    width: 50%;
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