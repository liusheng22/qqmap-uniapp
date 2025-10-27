<script setup>
import QQMapWX from 'qqmap-uniapp'

const keyword = ref('')
const results = ref([])

const qqmapsdk = new QQMapWX({
  key: 'YOUR_KEY'
})

/**
 * 这是 QQMapSDK 的示例代码，仅供参考
 * 该示例代码展示了如何使用 qqmapsdk.search 方法搜索地点，并使用 uniapp 的 view 组件显示搜索结果
 * 示例是搜索 "武汉"，使用步骤：
 * 1. 初始化 QQMapWX
 * 2. 输出搜索关键词 "武汉"
 * 3. 调用 qqmapsdk.search 方法搜索地点
 * 4. 输出搜索结果
 */

const search = () => {
  qqmapsdk.search({
    keyword: keyword.value,
    success: (res) => {
      results.value = res.data || []
    }
  })
}
</script>

<template>
  <view px-24 py-32 bg-white min-h-100vh>
    <view mb-20>
      <input
        v-model="keyword"
        placeholder="搜索地点"
        bg="#F5F6FA"
        rounded-16
        px-28
        h-80
        w-full
        text-30
        placeholder-style="{ color: '#8F99A8' }"
        border-1
        box-border
        border-solid
        outline-none
        @confirm="search"
      />
      <button
        mt-20
        w-full
        h-80
        px-0
        rounded-16
        bg-brand
        color-white
        text-30
        font-500
        btn-shadow
        button-active
        @tap="search"
      >
        搜索
      </button>
    </view>
    <view
      v-if="results.length === 0 && keyword"
      f-c-c
      color="#8F99A8"
      mt-40
      text-26
    >
      暂无搜索结果
    </view>
    <view>
      <view
        v-for="item in results"
        :key="item.id"
        py-24
        px-16
        bg="#F5F6FA"
        rounded-12
        mb-16
        f-s-c
        card-shadow
        pointer-select
      >
        <view flex-1>
          <view font-500 text-30 color="#000">{{ item.title }}</view>
          <view text-24 color="#8F9AA8" mt-6>
            {{ item.address }}
          </view>
        </view>
        <uni-icons type="location" size="24" color="#2BC0BE" ml-12 />
      </view>
    </view>
  </view>
</template>
