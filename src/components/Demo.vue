<template>
  <div class="demo">
    <img id="logo" src="https://img.tnblog.net/userdata/heads/fa8b453b99ae49658e308b0be9149e18.jpeg">

    <div class="line">
        <p>自定义分享内容</p>
        <p><input type="url" id="imgUrl" name="imgUrl" placeholder="分享图案的URL"
                  value="https://www.baidu.com/img/bd_logo1.png"></p>
        <p><input type="text" id="title" name="title" placeholder="标题" value="默认标题"></p>
        <p><input type="text" id="desc" name="desc" placeholder="描述" value="默认描述文案"></p>
        <p><input type="url" id="link" name="link" placeholder="链接" value="https://yami.h5.yscase.com/yami_share/demo.html"></p>

        <p>
            <button @click="changeShareData()">改变分享!</button>
        </p>
    </div>

    <div class="line">
        <button @click="hidenShare()">隐藏分享菜单</button>
        <button @click="showShare()">显示分享菜单</button>
    </div>

    <div class="line">
        <p>
            <button @click="scan()">扫一扫</button> 识别结果：<input type="text" id="scan_result">
        </p>
    </div>

    <div class="line">
        <button @click="getNetworkType()">获取当前网络状态</button> <span id="networkTypeText">等待中...</span>
    </div>


    <div class="line">
        <button @click="openMap()">用腾讯地图打开指定位置</button>
        <button @click="getCurLocationInfo()">获取当前地理坐标信息</button>
        <p>
            维度：<span id="lat_data"></span>
            经度：<span id="lng_data"></span>
        </p>
    </div>


    <div class="line">
        <button @click="WechatPayment()">微信支付</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Demo',
  created() {
    
  },
  methods: {

    changeShareData() {
        let datas = {
            title: document.querySelector('#title').value,
            desc: document.querySelector('#desc').value,
            link: document.querySelector('#link').value,
            imgUrl: document.querySelector('#imgUrl').value
        };

        this.$wxJssdk.share(datas);
    },

    hidenShare() {
        this.$wxJssdk.hideAllNonBaseMenuItem();
    },

    showShare() {
        this.$wxJssdk.showAllNonBaseMenuItem();
    },

    scan() {
        this.$wxJssdk.scan({
            needResult: 1, // 默认为1，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ["qrCode","barCode"], // 默认二者都有,可以指定扫二维码还是条形码
            success: function (res) {
                console.log('success', res.resultStr);
                document.querySelector('#scan_result').value = res.resultStr;

            }
        });
    },

    WechatPayment() {

        // 请注意：先要向接口生成订单生成签名等参数才能正确发起支付

        this.$wxJssdk.pay({
            timestamp: 0, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
            nonceStr: '', // 支付签名随机串，不长于 32 位
            package: '', // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
            signType: '', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
            paySign: '', // 支付签名
            success: function (res) {
                // 支付成功后的回调函数
                console.log(res);
            }
        });
    },

    getNetworkType() {
        this.$wxJssdk.getNetworkType({
            success: function (res) {
                document.querySelector('#networkTypeText').innerHTML = res.networkType;
            }
        });
    },

    openMap() {
        this.$wxJssdk.openLocation({
            latitude: 29.652852, // 纬度，浮点数，范围为90 ~ -90
            longitude: 91.118288, // 经度，浮点数，范围为180 ~ -180。
            name: '布达拉宫', // 位置名
            address: '西藏自治区拉萨市城关区北京中路35号', // 地址详情说明
            scale: 14, // 地图缩放级别,整形值,范围从1~28。默认为最大
            infoUrl: 'http://www.potalapalace.cn/' // 在查看位置界面底部显示的超链接,可点击跳转
        })
    },

    getCurLocationInfo() {
        this.$wxJssdk.getLocation({
            success: function (res) {
                console.log(res);
                document.querySelector('#lat_data').innerHTML = res.latitude;
                document.querySelector('#lng_data').innerHTML = res.longitude;
            }
        })
    }

  }
}
</script>

<style scoped>
  #logo{
      width: 100px;
      height: 100px;
  }
  .line {
      border: #464859 solid 1px;
      margin: 20px;
      padding: 20px;
  }
</style>