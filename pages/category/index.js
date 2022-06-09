// pages/category/index.js
import {
  request
} from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {

    // 左侧菜单数组
    leftMenuList: [],
    // 右侧商品数组
    rightContent: [],
    // 选择菜单索引
    currentIndex: 0,
    // 右侧内容的滚动条
    scrollToTop: 0
  },
  // 定义变量接受server返回整体数据
  Cates: [],

  /**
   * 生命周期函数--监听页面加载
   */
  // onLoad: function (options) {
  //   this.getCates();
  // },
  onLoad: function (options) {
    // 获取本地存储数据
    const localCates = wx.getStorageSync("cates");
    if (!localCates) {
      // 本地没有，网络请求
      this.getCates();

    } else {
      // 本地有数据，判断是否过期 此处为60秒
      //   
      if (Date.now() - localCates.time > 1000 * 10 * 6) {
        // 数据过期
        this.getCates();
      } else {
        // 本地数据有效
        this.Cates = localCates.data;
        this.updateUI();
      }
    }
  },
  async getCates() {
    const res = await request({ url: "/categories" });
    this.Cates = res;
    // 本地存储数据
    wx.setStorageSync("cates", { time: Date.now(), data: this.Cates });
    this.updateUI();
  },
  
  /* 更新UI */
  updateUI() {
    // 构造左侧大菜单数据
    let leftMenuList = this.Cates.map(v => v.cat_name);
    // 构造右侧商品数据
    let rightContent = this.Cates[0].children;
    this.setData({
      leftMenuList,
      rightContent
    })
  },
  // 菜单点击事件
  handItemTab(e) {
    console.log(e);
    // 获取索引
    const {
      index
    } = e.currentTarget.dataset;
    // 更新右侧商品数据
    let rightContent = this.Cates[index].children;
    this.setData({
      currentIndex: index,
      rightContent,
      scrollToTop: 0
    })
  },
})