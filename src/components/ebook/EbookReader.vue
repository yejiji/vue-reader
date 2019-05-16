<template>
    <div class="ebook">
        <div id="read"></div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Epub from 'epubjs'
global.ePub = Epub
export default {
    computed: {
        ...mapGetters([
            'fileName',
            'menuVisible'
            ])
    },
    methods: {
        prevPage() {
            if (this.rendition) {
                this.rendition.prev()
            }
        },
        nextPage() {
            if (this.rendition) {
                this.rendition.next()
            }
        },
        toggleTitleAndMenu() {
            this.$store.dispatch('setMenuVisible',!this.menuVisible)
        },
        initEpub() {
            const url = 'http://localhost:8089/epub/'+ this.fileName + '.epub'
            this.book = new Epub(url)
            this.rendition = this.book.renderTo('read',{
                width: innerWidth,
                height: innerHeight,
                methods: 'default'
            })
            this.rendition.display()
            this.rendition.on('touchstart',event => {
                this.touchStartX = event.changedTouches[0].clientX
                this.touchStartTime = event.timeStamp
            })
            this.rendition.on('touchend',event => {
                const offsetX = event.changedTouches[0].clientX - this.touchStartX
                const time = event.timeStamp - this.touchStartTime
                if (time < 500 && offsetX > 40) {
                    this.prevPage()
                } else if (time <500 && offsetX < -40) {
                    this.nextPage()
                } else {
                    this.toggleTitleAndMenu()
                }
                event.preventDefault()
                event.stopPropagation()
            })
        }
    },
    mounted() {     

        this.$store.dispatch('setFileName',this.$route.params.fileName.split('|').join('/')).then(() => {
            this.initEpub()
        })    
    }
}
</script>
<style lang="scss" scoped>
 @import "../../assets/styles/global";
</style>
