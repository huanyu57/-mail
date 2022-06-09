// 在这个 JS 文件中，专门来创建 Store 的实例对象
import {
  observable,
  action
} from 'mobx-miniprogram'

export const store = observable({
  // 数据字段
  cartLength: 0,
  activeTabBarIndex: 0,

  get sum() {
    return this.cartLength
  },
 
  // actions 函数，专门来修改 store 中数据的值
  updateCartLength: action(function () {
    const cart = wx.getStorageSync("cart") || [];
    this.cartLength = cart.length
    console.log(this.cartLength)
  })  ,
  updateActiveTabBarIndex: action(function(index) {
    this.activeTabBarIndex = index
  })
 
})