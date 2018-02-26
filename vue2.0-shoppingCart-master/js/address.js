var vm = new Vue({
	el: '.container',
	data: {
		name1: '',
		site: '',
		phone: '',
		limitNum: 3,
		addressList: [],
		currentIndex: 0,
		shippingMethod: 1,
		delFlag: false,
		curProduct:'',
		delFlag1: '',
		mes:''
	},
	mounted: function() {
		this.$nextTick(function() {
			this.getAddressList();
		});
	},
	computed: {
		filterAddress: function() {
			return this.addressList.slice(0, this.limitNum);
		}
	},
	methods: {
		getAddressList: function() {
			var _this = this;
			this.$http.get("data/address.json").then(function(response) {
				var res = response.data;
				if(res.status == "0") {
					_this.addressList = res.result;

				}
			});
		},
		// // 展开所有的功能也可以写成方法，然后调用
		// loadMore:function(){
		// 	this.limitNum = this.addressList.length;
		// }
		setDefault: function(addressId) {
			this.addressList.forEach(function(address, index) {
				if(address.addressId == addressId) {
					address.isDefault = true;
				} else {
					address.isDefault = false;
				}
			});
		},
		//删除地址
		del: function(item) {
			this.delFlag = true;
			this.curProduct = item;
			/*	alert(123);*/
		},
		delProduct: function() {
			var index = this.addressList.indexOf(this.curProduct);
			this.addressList.splice(index, 1);
			this.delFlag = false;
		},
		add: function() {
			this.delFlag1 = true;
			alert(this.addressList)
		},
	
		addInfo: function() {
			 mes = {
				"addressId": "100009",
				"userName":this.name1,
				"streetName": this.site,
				"postCode": "100008",
				"tel":this.phone,
				"isDefault":false
			};
			if(this.name1==''&&this.name1==''&&this.name1==''){
			  	alert("不能weikong");
			}else{
			  this.addressList.push(this.mes);
			}
			alert(this.phone+';'+this.site+';'+this.name1);
			//上传后隐藏模态框，清空登录
			this.delFlag1 = false;
			this.name1='';
			this.site= '';
			this.phone= ''
		}
	},

});