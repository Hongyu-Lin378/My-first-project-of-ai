<template>
  <div class="page-container">
    <van-nav-bar title="智能旅游助手" />
    <div class="page-cont">
    <van-notice-bar
  left-icon="volume-o"
  text="基于AI的智能景点介绍和旅游规划系统。"
/>
  <div class="card"style="margin-top:16px">
  <div class="section-title">
    规划你的旅程
      </div>
<van-field 
@click="showcity = true"
is-link
readonly
v-model="data.city" 
label="目的地"
 placeholder="请选择城市" 
 style="background-color: #f7f7f7;border-radius: 8px;margin-bottom: 8px;"
 />
 <van-field v-model="data.budget" label="预算(元)" 
  placeholder="请输入预算" 
  style="background-color: #f7f7f7;border-radius: 8px;margin-bottom: 8px;"/>
<van-field v-model="data.days" 
  label="天数" 
  placeholder="请输入天数" 
  style="background-color: #f7f7f7;border-radius: 8px;margin-bottom: 8px;"/>
  <van-button type="primary" size="large"round @click="handleSubmit">规划旅程</van-button>
</div>
  <div class="card">
    <div class="section-title">快捷入口</div>
    <div class="quick-grid">
      <div @click="gopage('/chat')" class="quick-item">
        <van-icon name="chat-o" size="28" color="#1989fa" />
        <span class="quick-text">AI对话</span>
      </div>
      <div @click="gopage('/profile')" class="quick-item">
        <van-icon name="orders-o" size="28" color="#07c160" />
        <span class="quick-text">我的行程</span>
      </div>
      <!-- <div class="quick-item">
        <van-icon name="description" size="28" color="#ff976a" />
        <span class="quick-text">旅游攻略</span>
      </div>
      <div class="quick-item">
        <van-icon name="star-o" size="28" color="#ee0a24" />
        <span class="quick-text">我的收藏</span>
      </div> -->
    </div>
  </div>

  <div class="card">
    <div class="section-title">热门目的地</div>
  
  <van-grid :gutter="12" :column-num="4">
  <van-grid-item @click="Selectcity(value)" v-for="value in hotcity" :key="value">
  <div class="city-tag" :class="{'active': data.city === value}">
    {{value}}
  </div> 
</van-grid-item>
</van-grid>
  </div>
  </div></div>

<van-tabbar v-model="active" route safe-area-inset-bottom>
  <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
  <van-tabbar-item icon="chat-o" to="/chat">对话</van-tabbar-item>
  <van-tabbar-item icon="user-o" to="/mine">我的</van-tabbar-item>
</van-tabbar>

<van-popup 
round
v-model:show="showcity" 
position="bottom">
<van-picker
  title="标题"
  :columns="columns"
  @confirm="onConfirm"
  @cancel="onCancel"
  
/>
</van-popup>

</template>

<script setup>
import {ref,reactive}from 'vue'
import {useRouter } from 'vue-router'
import { showToast } from 'vant'
const router = useRouter()


const Selectcity = (city) => {
  data.city = city
}

const gopage = (path) => {
  router.push(path)
}

const active = ref(0)
const showcity=ref(false)
const data = reactive({
  "city" : null,
  "budget"  : null,
  "days" : null
})
const allCities = [
  '北京', '上海', '广州', '深圳', '成都', '杭州', '西安', '重庆',
  '南京', '武汉', '苏州', '长沙', '天津', '郑州', '济南', '青岛',
  '大连', '沈阳', '哈尔滨', '长春', '福州', '厦门', '南昌', '合肥',
  '昆明', '贵阳', '南宁', '桂林', '海口', '三亚', '丽江', '大理',
  '西安', '兰州', '乌鲁木齐', '拉萨', '呼和浩特', '太原', '石家庄'
]

const columns = allCities.map(city => ({ text: city, value: city }))

const onConfirm = ({ selectedOptions }) => {
  data.city = selectedOptions[0].value
  showcity.value = false
}

const onCancel = () => {
  showcity.value = false
}

const handleSubmit = () => {
  console.log(data)
  if(!data.city) {
    showToast('请选择目的地')
    return
  }
  if(!data.budget||data.budget<100) {
    showToast('预算不能低于100元')
    return
  }
  if(!data.days||data.days<1||data.days>30) {
    showToast('请输入1-30天之间的时间')
       return
  }
  router.push(
    {
    path: '/detail',
    query: {
      city: data.city,
      budget: data.budget,
      days: data.days
    }
  })
}
const hotcity = ['北京', '上海', '广州', '深圳', '成都', '杭州', '西安', '重庆']
</script>

<style scoped>
.page-container {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 70px;
}

.page-cont {
  padding:16px;
}
.card {
  background-color: #fff;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}
.section-title {
  font-size: 18px;
  font-weight: 600;
  color: #323233;
  margin-bottom: 12px;
}

.quick-grid {
  display: flex;
  justify-content: space-between;
}

.quick-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  padding: 8px 0;
}

.quick-text {
  font-size: 13px;
  color: #323233;
  margin-top: 8px;
}
/* 
.city-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
} */

.city-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.city-img {
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.city-tag {
  padding: 8px 12px;        
  border-radius: 16px;      /* 圆角，16px 会做成胶囊形状 */
  font-size: 14px;         
  color: #666;             
  background: #f7f8fa;     
  transition: all 0.3s;     
}

.city-tag.active {
  background: #1989fa;
  color: #fff;
}


.city-name {
  font-size: 14px;
  color: #323233;
  margin-top: 6px;
}

</style>