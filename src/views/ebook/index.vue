<template>
    <div class="ebook" ref="ebookView">
        <ebook-header></ebook-header>
        <ebook-title></ebook-title>
        <ebook-reader></ebook-reader>   
        <ebook-menu></ebook-menu>
        <ebook-book-mark></ebook-book-mark>
        <ebook-footer></ebook-footer>
    </div>
</template>
<script>
import EbookReader from '../../components/ebook/EbookReader'
import EbookTitle from '../../components/ebook/EbookTitle'
import EbookMenu from '../../components/ebook/EbookMenu'
import EbookBookMark from '../../components/ebook/EbookBookMark'
import EbookHeader from '../../components/ebook/EbookHeader'
import EbookFooter from '../../components/ebook/EbookFooter'
import { getReadTime, saveReadTime } from '../../utils/localStorage'
import { setInterval, clearInterval } from 'timers'
import { ebookMixin } from '../../utils/mixin'
export default {
    mixins: [ebookMixin],
    components: {
        EbookReader,
        EbookTitle,
        EbookMenu,
        EbookBookMark,
        EbookHeader,
        EbookFooter
    },

    watch: {
         offsetY(v) {
             if (!this.menuVisible && this.bookAvailable) {
                 if(v > 0) {
                this.move(v)
                }else if (v === 0) {
                    this.restore()
                }
             }          
         }
    },
    methods: {
        move (v) {
            this.$refs.ebookView.style.top = v + 'px'
        },
        restore() {
            this.$refs.ebookView.style.top = 0
            this.$refs.ebookView.style.transition = 'all .2s linear'
            setTimeout(() => {
            this.$refs.ebookView.style.transition = ''
            }, 200)
      },
        startLoopReadTime () {
            let readTime = getReadTime(this.fileName)
            if (!readTime) {
               readTime = 0
            }
            this.task = setInterval(() => {
                readTime++
                if (readTime % 30 === 0) {
                    saveReadTime(this.fileName, readTime)
                }
            }, 1000)
        }
    },
    mounted () {
        this.startLoopReadTime()
        
    },
    beforeDestroy () {
        if (this.task) {
            clearInterval()
        }
    }
}
</script>
<style lang="scss" scoped>
 @import "../../assets/styles/global";
  .ebook {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
  }
</style>
