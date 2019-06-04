<template>
    <div class="shelf-footer" v-show="isEditMode">
        <div class="shelf-footer-tab-wrappper" v-for="item in tabs" :key="item.index" @click="onTabClick(item)">
            <div class="shelf-footer-tab">
                <div class="icon-private tab-icon" v-if="item.index === 1" :class="{'is-selected': isSelected}" ></div>
                <div class="icon-download tab-icon" v-if="item.index === 2" :class="{'is-selected': isSelected}"></div>
                <div class="icon-move tab-icon" v-if="item.index === 3" :class="{'is-selected': isSelected}"></div>
                <div class="icon-shelf tab-icon" v-if="item.index === 4" :class="{'is-selected': isSelected}"></div>
                <div class="tab-text">{{item.label}}</div>
            </div>
        </div>
    </div>
</template>
<script>
import { storeShelfMixin } from '../../utils/mixin'
export default {
    mixins: [storeShelfMixin],    
    computed: {
        isSelected() {
            if (this.data) {
                return this.data.some(item => item.selected)
            } else {
                return false
            }
        },
        tabs() {
            return [
                {
                    label: this.$t('shelf.private'),
                    label2: this.$t('shelf.noPrivate'),
                    index: 1
                },
                {
                    label: this.$t('shelf.download'),
                    label2: this.$t('shelf.delete'),
                    index: 2
                },
                {
                    label: this.$t('shelf.move'),
                    index: 3
                },
                {
                    label: this.$t('shelf.remove'),
                    index: 4
                }
                
            ]
        }
    },
    methods: {
        onTabClick(item) {

        }
    }
}
</script>
<style lang="scss" scoped>
@import "../../assets/styles/global";
.shelf-footer {
    position: fixed;
    display: flex;
    bottom: 0;
    left: 0;
    z-index: 120;
    width: 100%;
    height: px2rem(48);
    background: white;
    box-shadow: 0 px2rem(-2) px2rem(4) 0 rgba(0, 0, 0, .1);
    .shelf-footer-tab-wrappper {
      flex: 1;
      width: 25%;
      height: 100%;
      .shelf-footer-tab {
        width: 100%;
        height: 100%;
        @include columnCenter;
        .tab-icon {
          font-size: px2rem(20);
          color: #666;
          opacity: .5;
          &.icon-shelf {
            color: $color-pink;
          }
          &.icon-download {
            font-size: px2rem(22);
          }
          &.is-selected {
            opacity: 1;
          }
        }
        .tab-text {
          margin-top: px2rem(5);
          font-size: px2rem(12);
          color: #666;
          opacity: .5;
          &.remove-text {
            color: $color-pink;
          }
          &.is-selected {
            opacity: 1;
          }
        }
      }
    }
}
</style>
