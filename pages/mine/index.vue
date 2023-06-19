<template>
  <view class="mine-container" :style="{height: `${windowHeight}px`}">
    <!--顶部个人信息栏-->
    <view class="header-section">
      <view class="flex padding justify-between">
        <view class="flex align-center">
          <view v-if="!avatar" class="cu-avatar xl round bg-white">
            <view class="iconfont icon-people text-gray icon"></view>
          </view>
          </image>
          <view v-if="!userInfo.username" @click="handleToLogin" class="login-tip">
            点击登录
          </view>
          <view v-if="userInfo.username" @click="handleToInfo" class="user-info">
            <view class="u_title">
              用户名：{{ userInfo.username }}
            </view>
          </view>
        </view>
        <view @click="handleLogout" class="flex align-center">
          <text>切换用户</text>
          <view class="iconfont icon-right"></view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import storage from '@/utils/storage'
  
  export default {
    data() {
      return {
        userInfo: this.$store.state.userInfo,
        version: getApp().globalData.config.appInfo.version
      }
    },
    computed: {
      avatar() {
        
      },
      windowHeight() {
        return uni.getSystemInfoSync().windowHeight - 50
      }
    },
    methods: {
      handleToLogin() {
        this.$tab.reLaunch('/pages/login')
      },
      handleLogout(){
				this.$store.dispatch('resetToken')
				this.$tab.reLaunch('/pages/login')
			}
    }
  }
</script>

<style lang="scss">
  page {
    background-color: #f5f6f7;
  }

  .mine-container {
    width: 100%;
    height: 100%;


    .header-section {
      padding: 15px 15px 45px 15px;
      background-color: #3c96f3;
      color: white;

      .login-tip {
        font-size: 18px;
        margin-left: 10px;
      }

      .cu-avatar {
        border: 2px solid #eaeaea;

        .icon {
          font-size: 40px;
        }
      }

      .user-info {
        margin-left: 15px;

        .u_title {
          font-size: 18px;
          line-height: 30px;
        }
      }
    }

    .content-section {
      position: relative;
      top: -50px;

      .mine-actions {
        margin: 15px 15px;
        padding: 20px 0px;
        border-radius: 8px;
        background-color: white;

        .action-item {
          .icon {
            font-size: 28px;
          }

          .text {
            display: block;
            font-size: 13px;
            margin: 8px 0px;
          }
        }
      }
    }
  }
</style>
