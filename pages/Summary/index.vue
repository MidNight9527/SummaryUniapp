<template>
  <view class="summary-container">
    自动简报:用户{{userInfo.username}}
  </view>
</template>

<script>
  export default {
    data() {
      return {
				userInfo:this.$store.getters.userInfo,
      }
    },
    methods: {
      
    },
		onLoad() {
			console.log(this.$store.state.userInfo)
		}
  }
</script>

<style lang="scss">
  page {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    background-color: #fff;
    min-height: 100%;
    height: auto;
  }
</style>
