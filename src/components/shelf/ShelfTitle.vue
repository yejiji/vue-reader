<template>
    <transition name="fade">
        <div class="shelf-title-wrapper" v-show="shelfTitleVisible" :class="{'hide-shadow': ifHideShadow}">
            <div class="shelf-title-text-wrapper">
                <span class="shelf-title-text">{{title}}</span>
                <span class="shelf-title-sub-text" v-show="isEditMode" >{{selectedText}}</span>
            </div>
            <div class="shelf-title-btn-wrapper shelf-title-left" v-if="ShowClear">
                <span class="shelf-title-btn-text" @click="clearCache">{{$t('shelf.clearCache')}}</span>
            </div>
            <div class="shelf-title-btn-wrapper shelf-title-right" @click="onEditClick" v-if="showEdit">
                <span class="shelf-title-btn-text">{{isEditMode ? $t('shelf.cancel') : $t('shelf.edit')}}</span>
            </div>
            <div class="shelf-title-btn-wrapper shelf-title-left" @click="back" v-if="ShowBack && !isEditMode">
                <span class="icon-back"></span>
            </div>
            <div class="shelf-title-btn-wrapper" :class="{'shelf-title-left':changeGroupLeft,'shelf-title-right':changeGroupRight}"
             @click="changeGroup" v-if="showChangeGroup">
                <span class="shelf-title-btn-text">{{$t('shelf.editGroup')}}</span>
            </div>
        </div>
    </transition>
</template>
<script>
import { storeShelfMixin } from '../../utils/mixin'
import { clearLocalStorage, saveBookShelf } from '../../utils/localStorage';
import { clearLocalForage } from '../../utils/localForage'
import { setTimeout } from 'timers';
export default {
    mixins: [storeShelfMixin],
    computed: {
        emptyCategory() {
            return !this.shelfCategory || this.shelfCategory.itemList ||
            this.shelfCategory.itemList.length === 0
        },
        showEdit() {
            return this.currentType === 1
        },
        ShowClear() {
            return this.currentType === 1
        },
        ShowBack() {
            return this.currentType === 2 && this.isEditMode === false
        },
        showChangeGroup() {
            return this.currentType === 2 && (this.isEditMode || this.emptyCategory )
        },
        changeGroupLeft() {
            return !this.emptyCategory
        },
        changeGroupRight() {
            return this.emptyCategory
        },
        selectedText() {
            const selectedNumber = this.shelfSelected ? this.shelfSelected.length : 0
             return selectedNumber  === 0 ? this.$t('shelf.selectBook') : (selectedNumber === 1 ? this.$t('shelf.haveSelectedBook').replace('$1', selectedNumber) : this.$t('shelf.haveSelectedBooks').replace('$1', selectedNumber))
        }
    },
    props: {
        title: String
    },
    data() {
      return {
        ifHideShadow: true,
        ifGroupDialogShow: false,
        isDeleteGroup: false
      }
    },
    methods: {
        back () {
            this.$router.go(-1)
            this.setIsEditMode(false)
        },
        onEditClick () {
            if (!this.isEditMode) {
                this.setShelfSelected([])
                this.shelfList.forEach(item => {
                    item.selected = false
                    if (item.itemList) {
                        item.itemList.forEach(subItem => {
                            subItem.selected = false
                        })
                    }
                })
            }
            this.setIsEditMode(!this.isEditMode)
        },
        clearCache() {
            clearLocalStorage()
            clearLocalForage()
            this.setShelfList([])
            this.setShelfSelected([])
            this.getShelfList()
            this.simpleToast(this.$t('shelf.clearCacheSuccess'))
        },
        changeGroupName () {
            this.hidePopup()
            this.dialog({
                showNewGroup: true,
                groupName:this.shelfCategory.title
            })
        },
        onComplete () {
            this.hidePopup()
            this.setShelfList(this.shelfList.filter(book => book.id != this.shelfCategory.id))
            .then(() => {
                saveBookShelf(this.shelfList)
            })
        },
        deleteGroup () {
            if (!this.emptyCategory) {
                this.setShelfSelected(this.shelfCategory.itemList)
                this.moveOutGroup(this.onComplete)
            } else {
                this.onComplete()
            }
        },
        showDeleteGroup () {
            this.hidePopup()
            setTimeout(() => {
                this.popupMenu = this.popup({
                title:this.$t('shelf.deleteGroupTitle'),
                btn: [
                    this.createPopupBtn(this.$t('shelf.confirm'),() => {
                       this.deleteGroup() 
                    },'danger'),
                    this.popupCancelBtn()
                ]
                }).show()
            },200)
            
        },
        popupCancelBtn () {
            this.createPopupBtn(this.$t('shelf.cancel'), () => {
                this.showDeleteGroup()
            })
        },
        hidePopup() {
            this.popupMenu.hide()
        },
        createPopupBtn(text,onClick,type= "normal" ) {
            return {
                text: text,
                type: type,
                click: onClick
            }
        },
        changeGroup () {
            this.popupMenu = this.popup({
                btn: [
                    this.createPopupBtn(this.$t('shelf.editGroupName'), () => {
                        this.changeGroupName()
                    }),
                    this.createPopupBtn(this.$t('shelf.deleteGroup'), () => {
                        this.showDeleteGroup()
                    },'danger'),
                    this.popupCancelBtn()
                ]
            }).show()
        }
    },
    watch: {
        offsetY(offsetY) {
            if (offsetY > 0) {
                this.ifHideShadow = false
            } else {
                this.ifHideShadow = true
            }
        }
    },
    mounted() {
        this.shelfSelected.length
    }
}
</script>
<style lang="scss" scoped>
 @import "../../assets/styles/global";
  .shelf-title-wrapper {
    position: relative;
    z-index: 130;
    width: 100%;
    height: px2rem(42);
    background: white;
    box-shadow: 0 px2rem(2) px2rem(2) 0 rgba(0, 0, 0, .1);
    &.hide-shadow {
      box-shadow: none;
    }
    .shelf-title-text-wrapper{
        position: absolute;
        top: 0;
        left: 0;
        z-index: 110;
        width: 100%;
        height: px2rem(42);
        @include columnCenter;
        .shelf-title-text{
            font-size: px2rem(16);
            line-height: px2rem(20);
            font-weight: bold;
            color: #333;
        }
        .shelf-title-sub-text{
            font-size: px2rem(10);
            color: #333;
        }
    }
    .shelf-title-btn-wrapper{
        position: absolute;
        top: 0;
        z-index: 115;  
        box-sizing: border-box;
        height: 100%;
        @include center;
        .shelf-title-btn-text{
            font-size: px2rem(14);
            color: #666;
        }
        .icon-back {
            font-size: px2rem(20);
            color: #666;
            }
        &.shelf-title-left{
            left: 0;
            padding-left: px2rem(16.5);
        }
        &.shelf-title-right{
            right: 0;
            padding-right: px2rem(16.5);
        }
    }
  }
</style>
