<template>
    <div class="store-home">
        <search-bar></search-bar>
        <scroll :top="scrollTop" @onScroll="onScroll" ref="scroll">
            <div>111111111111111111111</div>
            <div>111111111111111111111</div>
            <div>111111111111111111111</div>
            <div>111111111111111111111</div>
            <div>111111111111111111111</div>
            <div>111111111111111111111</div>
            <div>111111111111111111111</div>
            <div>111111111111111111111</div>
            <div>111111111111111111111</div>
            <div>111111111111111111111</div>
            <div>111111111111111111111</div>
            <div>111111111111111111111</div>
            <div>111111111111111111111</div>
            <div>111111111111111111111</div>
            <div>111111111111111111111</div>
            <div>111111111111111111111</div>
            <div>111111111111111111111</div>
            <div>111111111111111111111</div>
            <div>111111111111111111111</div>
            <div>111111111111111111111</div>

        </scroll>
        <flap-card :data="random"></flap-card>
    </div> 
</template>
<script>
import SearchBar from '../../components/home/SearchBar'
import FlapCard from '../../components/home/FlapCard'
import Scroll from '../../components/common/Scroll'
import { storeHomeMixin } from '../../utils/mixin'
import { Home } from '../../api/store'
export default {
    mixins: [storeHomeMixin],
    data() {
        return {
            scrollTop: 94
        }
    },
    components: {
        SearchBar,
        Scroll,
        FlapCard,
        random: null
    },
    methods: {
        onScroll(offsetY) {
            this.setOffsetY(offsetY)
            if (offsetY > 0) {
                this.scrollTop = 52
            } else {
                this.scrollTop = 94
            }
            this.$refs.scroll.refresh()
        }
    },
    mounted() {
        Home().then(response => {
            if (response && response.status === 200) {
                const data = response.data
                const randomIndex = Math.floor(Math.random() * data.random.length)
                this.random = data.random[randomIndex]
            }
        })
    }
}
</script>
<style lang="scss" scoped>
 @import "../../assets/styles/global";
 .store-home{
  width: 100%;
  height: 100%;
  background: #fafafa;
}
</style>
