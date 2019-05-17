const book = {
    state: {
        fileName: '',
        menuVisible: false,
        settingVisible:-1 //-1不显示 0：字号字体设置 1：主题 2:进度条 3:目录
    },
    mutations: {
        'SET_FILENAME': (state,fileName) => {
            state.fileName = fileName
        },
        'SET_MENUVISIBLE': (state,menuVisible) => {
            state.menuVisible = menuVisible
        },
        'SET_SETTINGVISIBLE': (state,settingVisible) => {
            state.settingVisible = settingVisible
        }
    }
}
export default book