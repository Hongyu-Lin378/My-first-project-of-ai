import { createApp } from 'vue'

import { Button, Card, Tabbar, TabbarItem,NavBar,NoticeBar,Field, CellGroup,Picker,Popup} from 'vant'
import 'vant/lib/index.css'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app').use(Button).use(Card).use(Tabbar).use(TabbarItem)
.use(NavBar).use(NoticeBar).use(Field).use(CellGroup).use(Picker).use(Popup)
