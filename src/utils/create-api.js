import Vue from 'vue'
import Toast from '../components/common/Toast'
import Popup from '../components/common/Popup'
import CreateAPI from 'vue-create-api';

Vue.use(CreateAPI)
Vue.createAPI(Toast,true)
Vue.createAPI(Popup,true)
Vue.mixin({
    methods: {
        toast(settings) {
            return this.$createToast({
                $props: settings
              })
        },
        popup(settings) {
            return this.$createPopup({
                $props: settings
            })
        },
        simpleToast(text) {
            this.toast({
                text: text
            }).show()
        }
    }
})