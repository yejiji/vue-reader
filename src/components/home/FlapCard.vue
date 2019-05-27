<template>
    <div class="flap-card-wrapper" v-show="flapCardVisible">
        <div class="flap-card-bg">
            <div class="flap-card">
                <div class="flap-card-circle">
                    <div class="flap-card-semi-circle flap-card-semi-circle-left"></div>
                    <div class="flap-card-semi-circle flap-card-semi-circle-right"></div>
                </div>
            </div>
        </div>
        <div class="close-btn-wrapper" @click="close">
            <div class="icon-close"></div >
        </div>
    </div>
</template>
<script>
import { storeHomeMixin } from '../../utils/mixin'
export default {
    mixins: [storeHomeMixin],    
    methods: {
        close () {
            this.setFlapCardVisible(false)
        }
    }
}
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";
  .flap-card-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1000;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,.6);
      .close-btn-wrapper{
          position: absolute;
          left: 0;
          bottom: px2rem(30);
          z-index: 1100;
          width: 100%;
          @include center;
          .icon-close{
              width: px2rem(45);
              height: px2rem(45);
              font-size:px2rem(25) ;
              border-radius: 50%;
              background: #333;
              color: white;
              @include center;
          }
      }
  }
</style>
