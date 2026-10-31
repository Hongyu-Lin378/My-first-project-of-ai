import { createApp } from 'vue'

import { Button, Card, Tabbar, TabbarItem,NavBar,NoticeBar,Field, CellGroup,Picker,Popup,Grid, GridItem,Icon} from 'vant'
import 'vant/lib/index.css'
import './style.css'
import App from './App.vue'
import router from './router'


const app = createApp(App)

app.use(router)
app.use(Button)
app.use(Card)
app.use(Tabbar)
app.use(TabbarItem)
app.use(NavBar)
app.use(NoticeBar)
app.use(Field)
app.use(CellGroup)
app.use(Picker)
app.use(Popup)
app.use(Grid)
app.use(GridItem)
app.use(Icon)



app.mount('#app')