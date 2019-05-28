import axios from 'axios'

export function Home() {
    return axios ({
        method:'get',
        url:`${process.env.VUE_APP_BASE_UR}/book/home`
    })
}