<template>
    <div class="ebook-bookmark" ref="bookmark">
        <div class="ebook-bookmark-text-wrapper">
            <div class="ebook-bookmark-down-wrapper" ref="iconDown">
                <span class="icon-down"></span>   
            </div>
            <div class="ebook-bookmark-text">
                {{text}}
            </div>
        </div>    
        <div class="ebook-bookmark-icon-wrapper" :style="fixed ? fixedStyle : {}" >
          
          <book-mark :width="15" :height="35" :color="color" ref="bookmark"></book-mark>
        </div>
    </div>
</template>
<script>
import BookMark from '../common/BookMark'
import { realPx } from '../../utils/utils'
import { ebookMixin } from '../../utils/mixin'
import { setTimeout } from 'timers';
import { getBookmark ,saveBookmark} from '../../utils/localStorage';
const BLUE = '#346cbc'
const WHITE = '#fff'
export default {
    mixins: [ebookMixin],
    data() {
      return {
        text: '',
        color: WHITE,
        fixed: false
      }  
    },
    computed: {
      height() {
        return realPx(35)
      },
      threshold() {
        return realPx(55)
      },
      fixedStyle() {
        return {
          position: 'fixed',
          right: `${(window.innerWidth - this.$refs.bookmark.clientWidth) / 2}px`,
          top: 0
        }
      }
    },
    watch: {
      offsetY(v) {
        if (!this.bookAvailable || this.menuVisible || this.settingVisible >= 0) {
          return
        }
        //未到达临界状态
        if(v >= this.height && v <= this.threshold) {
          this.beforeThresHold(v)
        } else if ( v >= this.threshold) {
          //超越临界状态
          this.afterThresHold(v)
        } else if (v > 0 && v < this.height) {
          //未超过书签高度
          this.beforeHeight()
        } else if (v === 0) {
          //归为
          this.restore()
        }
      },
      isBookmark(v) {
        this.fixed = v
        if (v) {
          this.color = BLUE
        } else {
          this.color = WHITE
        }
      }
    }, 
    methods: {
      addBookMark () {
        this.bookmark = getBookmark(this.fileName)
        if (!this.bookmark) {
          this.bookmark = []
        }
        const currentLocation = this.currentBook.rendition.currentLocation()
        const cfibase = currentLocation.start.cfi.replace(/!.*/, '').replace('epubcfi(', '')
        const cfistart = currentLocation.start.cfi.replace(/.*!/, '').replace(/\)/, '')
        const cfiend = currentLocation.end.cfi.replace(/.*!/, '').replace(/\)/, '')
        const cfiRange = `epubcfi(${cfibase}!,${cfistart},${cfiend})`
        const cfi = currentLocation.start.cfi
        this.currentBook.getRange(cfiRange).then(range => {
          let text = range.toString()
          text = text.replace(/\s\s/g, '')
          text = text.replace(/\r/g, '')
          text = text.replace(/\n/g, '')
          text = text.replace(/\t/g, '')
          text = text.replace(/\f/g, '')
          this.bookmark.push({
            cfi: cfi,
            text: text
          })
          this.setIsBookmark(true)
          saveBookmark(this.fileName, this.bookmark)
        })
      },
      removeBookMark () {
        const currentLocation = this.currentBook.rendition.currentLocation()
        const cfi = currentLocation.start.cfi
        if (this.bookmark) {
          this.bookmark = this.bookmark.filter(item => item.cfi !== cfi)
          saveBookmark(this.fileName, this.bookmark)
        }
        this.setIsBookmark(false)
      },
      restore () {
        setTimeout(() => {
          this.$refs.bookmark.style.top = `${-this.height}px`
          this.$refs.iconDown.style.transform = 'rotate(0deg)'  
        },200)    
        if (this.fixed) {
          this.setIsBookmark(true)
          this.addBookMark()
        } else {
          this.setIsBookmark(false)
          this.removeBookMark()
        }
      },
      beforeHeight () {
          if (this.isBookmark) {
            this.text = this.$t('book.pulldownDeleteMark')
            this.color = BLUE
            this.fixed = true
          } else {
            this.text = this.$t('book.pulldownAddMark')
            this.color = WHITE
            this.fixed = false
          }
      },
      beforeThresHold(v) {
          this.$refs.bookmark.style.top = `${-v}px`
          this.beforeHeight()
          const iconDown = this.$refs.iconDown
          if (iconDown.style.transform === 'rotate(180deg)') {
              iconDown.style.transform = 'rotate(0deg)'    
          }
      },
      afterThresHold(v) {
          this.$refs.bookmark.style.top = `${-v}px`
          if (this.isBookmark) {
            this.text = this.$t('book.releaseDeleteMark')
            this.color = WHITE
            this.fixed = false
          } else {
            this.text = this.$t('book.releaseAddMark')
            this.color = BLUE
            this.fixed = true
          }
          this.color = BLUE
          const iconDown = this.$refs.iconDown
          if (iconDown.style.transform === '' || iconDown.style.transform === 'rotate(0deg)') {
              iconDown.style.transform = 'rotate(180deg)'    
          }
      }
    },
    components: {
      BookMark
    }
}
</script>
<style lang="scss" scoped>
  @import "../../assets/styles/global";

  .ebook-bookmark {
    position: absolute;
    top: px2rem(-35);
    left: 0;
    z-index: 200;
    width: 100%;
    height: px2rem(35);
    .ebook-bookmark-text-wrapper {
      position: absolute;
      right: px2rem(45);
      bottom: 0;
      display: flex;
      .ebook-bookmark-down-wrapper {
        font-size: px2rem(14);
        color: white;
        transition: all .2s linear;
        @include center;
      }
      .ebook-bookmark-text {
        font-size: px2rem(14);
        color: white;
      }
    }
    .ebook-bookmark-icon-wrapper {
      position: absolute;
      right: 0;
      bottom: 0;
      margin-right: px2rem(10);
    }
  }
</style>
