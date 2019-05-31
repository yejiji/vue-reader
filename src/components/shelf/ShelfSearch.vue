<template>
    <div class="shelf-search-wrapper">
        <div class="shelf-search">
            <div class="search-wrapper">
                <div class="icon-search-wrapper">
                    <span class="icon-search icon"></span>
                </div>
                <div class="search-input-wrapper">
                    <input class="search-input"
                           type="text"
                           :placeholder="$t('shelf.search')"
                           @click="onSearchClick" 
                    >
                </div>
                <div class="icon-clear-wrapper">
                    <span class="icon-close-circle-fill"></span>
                </div>
            </div>
            <div class="icon-clock-wrapper" v-if="!ifInputClicked" @click="switchLocale">
                <span class="icon-cn icon" v-if="lang === 'cn'"></span>
                <span class="icon-en icon"></span>
            </div>
            <div class="cancel-btn-wrapper" @click="onCancelClick" v-else>
                <span class="cancel-text">{{$t('shelf.cancel')}}</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            ifInputClicked:false
        }
    },
    computed: {
        lang() {
            return this.$i18n.locale
        }
    },
    methods : {
        onSearchClick () {
            this.ifInputClicked = true
        },
        onCancelClick () {
            this.ifInputClicked = false
        },
        switchLocale () {
          if(this.lang === 'en') {
              this.$i18n.locale = 'cn'
          } else {
              this.$i18n.locale = 'en'
          }
        }
    }
}
</script>
<style lang="scss" scoped>
 @import "../../assets/styles/global";
 .shelf-search-wrapper {
     position: relative;
    z-index: 105;
    width: 100%;
    height: px2rem(94);
    font-size: px2rem(16);
    background: white;
    box-shadow: 0 px2rem(2) px2rem(2) 0 rgba(0, 0, 0, .1);
    &.search-top {
      position: fixed;
      top: 0;
      left: 0;
    }
    &.hide-shadow {
      box-shadow: none;
    }
     .shelf-search {
      position: absolute;
      top: px2rem(42);
      left: 0;
      z-index: 101;
      width: 100%;
      height: px2rem(52);
      display: flex;
      transition: all $homeAnimationTime linear;
      &.search-top {
        top: 0;
      }
      .search-wrapper {
        display: flex;
        flex: 1;
        margin: px2rem(8) 0 px2rem(8) px2rem(10);
        border: px2rem(1) solid #ccc;
        border-radius: px2rem(3);
        .icon-search-wrapper {
          flex: 0 0 px2rem(22);
          @include right;
          .icon-search {
            font-size: px2rem(12);
          }
        }
        .search-input-wrapper {
          flex: 1;
          padding: 0 px2rem(10);
          box-sizing: border-box;
          @include center;
          .search-input {
            width: 100%;
            // height: 100%;
            font-size: px2rem(14);
            border: none;
            color: #333;
            &:focus {
              outline: none;
            }
            &::-webkit-input-placeholder {
              font-size: px2rem(14);
              color: #ccc;
            }
          }
        }
        .icon-clear-wrapper {
          flex: 0 0 px2rem(24);
          @include left;
          .icon-close-circle-fill {
            font-size: px2rem(14);
            color: #ccc;
          }
        }
      }
      .icon-clock-wrapper {
        flex: 0 0 px2rem(55);
        @include center;
        .icon-cn, .icon-en {
          font-size: px2rem(22);
          color: #666;
        }
      }
      .cancel-btn-wrapper {
        flex: 0 0 px2rem(55);
        @include center;
        .cancel-btn {
          font-size: px2rem(14);
          color: $color-blue;
        }
      }
    }
 }
</style>
