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
      <div class="quick-item">
        <van-icon name="chat-o" size="28" color="#1989fa" />
        <span class="quick-text">AI对话</span>
      </div>
      <div class="quick-item">
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
    <div class="city-grid">
      <div class="city-item">
        <div class="city-img" style="background: linear-gradient(135deg,#83a4d4,#b6fbff);">
          <van-icon name="location-o" size="32" color="#fff" />
        </div>
        <span class="city-name">北京</span>
      </div>
      <div class="city-item">
        <div class="city-img" style="background: linear-gradient(135deg,#f7971e,#ffd200);">
          <van-icon name="location-o" size="32" color="#fff" />
        </div>
        <span class="city-name">上海</span>
      </div>
      <div class="city-item">
        <div class="city-img" style="background: linear-gradient(135deg,#11998e,#38ef7d);">
          <van-icon name="location-o" size="32" color="#fff" />
        </div>
        <span class="city-name">成都</span>
      </div>
      <div class="city-item">
        <div class="city-img" style="background: linear-gradient(135deg,#f953c6,#b91d73);">
          <van-icon name="location-o" size="32" color="#fff" />
        </div>
        <span class="city-name">杭州</span>
      </div>
      <div class="city-item">
        <div class="city-img" style="background: linear-gradient(135deg,#4facfe,#00f2fe);">
          <van-icon name="location-o" size="32" color="#fff" />
        </div>
        <span class="city-name">西安</span>
      </div>
      <div class="city-item">
        <div class="city-img" style="background: linear-gradient(135deg,#fa709a,#fee140);">
          <van-icon name="location-o" size="32" color="#fff" />
        </div>
        <span class="city-name">三亚</span>
      </div>
    </div>
  </div>
  </div></div>

<van-tabbar v-model="active" route safe-area-inset-bottom>
  <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
  <van-tabbar-item icon="chat-o" to="/chat">对话</van-tabbar-item>
  <van-tabbar-item icon="user-o" to="/mine">我的</van-tabbar-item>
</van-tabbar>

<van-popup 
round="bottom"
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
const active = ref(0)
const showcity=ref(false)
const data = reactive({
  "city" : "",
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
}
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

.city-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

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

.city-name {
  font-size: 14px;
  color: #323233;
  margin-top: 6px;
}

</style>