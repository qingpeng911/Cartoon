import axios from 'axios'
import qs from 'qs'


// axios 配置
axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL = '/';

//POST传参序列化
axios.interceptors.request.use((config) => {
    if(config.method  === 'post'){
        config.data = qs.stringify(config.data);
    }
    return config;
},(error) =>{
    layer.msg('错误的传参!');
    return Promise.reject(error);
});

//返回状态判断
axios.interceptors.response.use((res) =>{
    if(!res.data.success){
        layer.msg(res.data.msg);
        return Promise.reject(res);
    }
    return res;
}, (error) => {
    layer.msg('对不起，服务器开小差了，请稍后再试!');
    return Promise.reject(error);
});

export function fetch(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err);
            })
            .catch((error) => {
               reject(error)
            })
    })
}

export default {
    /**
     * 首页内容加载
     */
    ApiHome() {
        return fetch('/api/v2/home')
    },

    /**
     * 加载标签库tags
     */
    getTags() {
        return fetch('/api/v2/tags')
    },

    /**
     * banner内容加载
     */
    getBanner() {
        return fetch('/api/v2/getBanner')
    },
    
    /**
     * 分类查询
     */
    getTypeshow(params) {
        return fetch('/api/v2/typeshow', params)
    },
    
    /**
     * 获取漫画详情
     */
    getDetail(params) {
        return fetch('/api/v2/cartoons/detail/', params)
    },
        
    /**
     * 收藏/取消收藏
     */
    collect(params) {
        return fetch('/api/v2/collections', params)
    },

    /**
     * 点赞
     */
    zan(params) {
        return fetch('/api/v2/cartoon/like', params)
    },
            
    /**
     * 查看更多
     */
    pageitems(params) {
        return fetch('/api/v2/pageitems', params)
    },
                
    /**
     * 新作榜
     */
    getRankNew(params) {
        return fetch('/api/v2/rank/new', params)
    },

    /**
     * 完结榜
     */
    getFinished(params) {
        return fetch('/api/v2/rank/finished', params)
    },

    /**
     * 免费专区
     */
    getFree(params) {
        return fetch('/api/v2/free/list', params)
    },
    
    /**
     * 抢先-热门
     */
    getHot(params) {
        return fetch('/api/v2/collections/hot', params)
    },
        
    /**
     * 抢先-关注
     */
    getFollow(params) {
        return fetch('/api/v2/collections/focus', params)
    },
            
    /**
     * 章节内容
     */
    getChapters(params) {
        return fetch('/api/v2/cartoon/chapters/'+params.chapterId)
    },
                
    /**
     * 更新阅读记录
     */
    updateReadRecords(params) {
        return fetch('/api/v2/readRecords', params)
    },

    /**
     * 阅读历史记录
     */
    getReadRecordsList(params) {
        return fetch('/api/v2/readRecordList', params)
    },
           
    /**
     * 热门搜索列表
     */
    getHotkeys() {
        return fetch('/api/v2/hotkeys')
    },
               
    /**
     * 关键字搜索
     */
    doSearch(params) {
        return fetch('/api/v2/cartoons/search',params)
    },
                   
    /**
     * 删除阅读记录
     */
    deleteReadRecords(cartoonId) {
        return fetch('/api/v2/readRecords/delete/'+cartoonId)
    },
                       
    /**
     * 获取收藏列表
     */
    getCollections(params) {
        return fetch('/api/v2/getCollections',params)
    },

    /**
     * 删除收藏记录
     */
    deleteCollection(cartoonId) {
        return fetch('/api/v2/collections/delete/'+cartoonId)
    },

    /**
     * 个人中心
     */
    getUserInfo() {
        return fetch('/api/v2/usercenter')
    },
    
    /**
     * 签到记录
     */
    getSignList() {
        return fetch('/api/v2/sign/list')
    },
        
    /**
     * 签到
     */
    doSign() {
        return fetch('/api/v2/sign/record')
    },
            
    /**
     * 签到配置信息
     */
    getSignConfig() {
        return fetch('/api/v2/sign/config')
    },
        
    /**
     * 用户账户
     */
    getUserMoney() {
        return fetch('/api/v2/user/money')
    },
            
    /**
     * 商品列表
     */
    getProductList() {
        return fetch('/api/v2/product/list')
    },

    /**
     * 购买记录
     */
    getBuyRecordList(params) {
        return fetch('/api/v2/buyRecord/list',params)
    },
    
    /**
     * 购买章节
     */
    payCost(params) {
        return fetch('/api/v2/payCost',params)
    },
}