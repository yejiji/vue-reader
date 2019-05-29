import axios from 'axios'
export function Home() {
    return axios ({
        method:'get',
        url:`${process.env.VUE_APP_BASE_UR}/book/home`
    })
}

export function detail(book) {
    return axios ({
        method:'get',
        url:`${process.env.VUE_APP_BOOK_URL}/book/detail`,
        params: {
            fileName:book.fileName
        }
    })
}

export function list() {
    return axios({
      method: 'get',
      url: `${process.env.VUE_APP_BASE_URL}/book/list`
    })
  }

export function flatList() {
    return axios({
      method: 'get',
      url: `${process.env.VUE_APP_BOOK_URL}/book/flat-list`
    })
  }
  