<script setup>
import QQMapWX from 'qqmap-uniapp'

const qqmapsdk = new QQMapWX({
  key: 'YOUR_KEY'
})

/**
 * 这是 QQMapSDK 的示例代码，仅供参考
 * 该示例代码展示了如何使用 qqmapsdk.direction 方法获取路线，并使用 uniapp 的 map 组件显示路线
 * 示例是「中华路码头」到「武汉关码头」的路线，使用步骤：
 * 1. 初始化 QQMapWX
 * 2. 设置起点和终点
 * 3. 设置中心位置
 * 4. 设置标记点
 * 5. 获取路线
 * 6. 解析路线
 * 7. 显示路线
 */

// 起点
const fromPosition = {
  latitude: 30.550602,
  longitude: 114.294686
}
// 终点
const toPosition = {
  latitude: 30.574998,
  longitude: 114.29768
}

// 中心位置
const centerPosition = ref({
  latitude: toPosition.latitude,
  longitude: toPosition.longitude
})
// 标记点
const markers = ref([
  {
    id: 1,
    latitude: toPosition.latitude,
    longitude: toPosition.longitude,
    width: 30,
    height: 40
  }
])

// 路线
const polyline = ref([])
const setPolyline = () => {
  qqmapsdk.direction({
    // 可选值：‘driving’（驾车）、‘walking’（步行）、‘bicycling’（骑行）、‘transit’（公交），默认：‘driving’
    mode: 'transit',
    from: fromPosition,
    to: toPosition,
    success: (res) => {
      const { status } = res
      if (status === 0) {
        parsePolyline(res)
      }
    },
    fail: (err) => {
      console.log('qqmapsdk.direction fail:', err)
    }
  })
}
setPolyline()

// 解析路线
const parsePolyline = (res) => {
  const ret = res.result.routes[0]
  const count = ret.steps.length
  const pl = []
  const coors = []
  // 获取各个步骤的polyline
  for (let i = 0; i < count; i++) {
    if (ret.steps[i].mode == 'WALKING' && ret.steps[i].polyline) {
      coors.push(ret.steps[i].polyline)
    }
    if (ret.steps[i].mode == 'TRANSIT' && ret.steps[i].lines[0].polyline) {
      coors.push(ret.steps[i].lines[0].polyline)
    }
  }
  // 坐标解压（返回的点串坐标，通过前向差分进行压缩）
  const kr = 1000000
  for (let i = 0; i < coors.length; i++) {
    for (let j = 2; j < coors[i].length; j++) {
      coors[i][j] = Number(coors[i][j - 2]) + Number(coors[i][j]) / kr
    }
  }
  // 定义新数组，将coors中的数组合并为一个数组
  let coorsArr = []
  for (let i = 0; i < coors.length; i++) {
    coorsArr = coorsArr.concat(coors[i])
  }
  // 将解压后的坐标放入点串数组pl中
  for (let i = 0; i < coorsArr.length; i += 2) {
    pl.push({ latitude: coorsArr[i], longitude: coorsArr[i + 1] })
  }
  polyline.value = [
    {
      points: pl,
      color: '#2BC0BE',
      width: 4,
      dottedLine: true,
      arrowLine: true
    }
  ]
}
</script>

<template>
  <view w-750 h-100vh>
    <map
      style="width: 750rpx; height: 100vh"
      :latitude="centerPosition.latitude"
      :longitude="centerPosition.longitude"
      :markers="markers"
      :polyline="polyline"
    ></map>
  </view>
</template>
