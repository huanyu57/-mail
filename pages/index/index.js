import {
  request
} from "../../request/index.js"

Page({
  data: {
    // 轮播图数组
    swiperList: [],
    // 导航 数组
    catesList: [],
    // 楼层数组
    floorList: []
  },

  onLoad: function (options) {
 
    this.getSwiperList();
    this.getCateList();
    this.getFloorList();
  },

  // 获取分类导航数据
  async getCateList() {
    const result = await request({
      url: '/home/catitems'
    })
    this.setData({
      catesList: result
    })
  },

  // 获取分类导航数据
  async getSwiperList() {
    const result = await request({
      url: '/home/swiperdata'
    })

    for (const key in result) {
      result[key].navigator_url = 
      result[key].navigator_url.replace(/main/, "index")
    }

    this.setData({
      swiperList: result
    })
  },

  // 获取楼层数据
  async getFloorList() {
    const result = await request({
      url: '/home/floordata'
    })
    for (const key in result) {
      // console.log(key)
      for (const key2 in result[key].product_list) {
        // console.log(key2)
        result[key].product_list[key2].navigator_url = 
        result[key].product_list[key2].navigator_url.replace(/\?/, "/index?")
      }
    }


    this.setData({
      floorList: result
    })
  },

})