<script setup>
import { onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { getTravelRecommend } from '../api/travel'

const route = useRoute()
const data = reactive({
  city: '',
  budget: '',
  days: '',
  result: null,
})

const fetchRecommend = async () => {
  try {
    const res = await getTravelRecommend({
      city: data.city,
      budget: Number(data.budget),
      days: Number(data.days),
    })
    data.result = res
    console.log('推荐结果：', res)
  } catch (err) {
    console.error('请求失败：', err)
  }
}

onMounted(() => {
  data.city = route.query.city
  data.budget = route.query.budget
  data.days = route.query.days
  fetchRecommend()
})
</script>

<template>
  <div>
    <van-button type="primary" block>详情页面</van-button>
  </div>
</template>
