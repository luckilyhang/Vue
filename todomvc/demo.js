var vm=new Vue({
	el:'#box',
	data:{
		arr:[],
		name:'',
		toggle:true,
		// editorTodo:''记录正在编辑的数据
		editorTodo:'',
		// 记录正在编辑数据的text
		beforeText:''
	},
	created:function(){
		// 获取用户本地数据
		this.arr=localStorage.getItem('todos')?JSON.parse(localStorage.getItem('todos')):[];
	},
	update:function(){
		// 保存用户操作过的数据
		localStorage.setItem('todos',JSON.stringify(this.arr));
	},
	methods:{

		// 返回id
		getId:function(){
		var id=Math.random()*10;
			for(var i=0;i<this.arr.length;i++){
			if(id===this.arr[i].id){
				id=this.getId();
			}
			}
			return id;
		},
		// 添加num
		fn:function(){
			if(this.name===''){
				return;
			}
			this.arr.push({
				id:this.getId(),
				text:this.name,
				completed:false
			});
			this.name=''
		},
		// 删除
		del:function(id){
		for(var i=0;i<this.arr.length;i++){
			if(id===this.arr[i].id){
			this.arr.splice(i,1)
			}
		}
		},
		// 全选
		checkAll:function(){
			for(var i=0;i<this.arr.length;i++){
				this.arr[i].completed=this.toggle;
			}
			this.toggle=!this.toggle;

		},
		// 显示，隐藏
		show:function(){
			for(var i=0;i<this.arr.length;i++){
				if(this.arr[i].completed){
				return true;
				}
			}
			return false;
		},
		// 删除选中项
		delAll:function(){
			var ar=[];
			for(var i=0;i<this.arr.length;i++){
				if(!this.arr[i].completed){
					ar.push(this.arr[i])
				}
			}
			this.arr=ar;
		},
		// 编辑任务成功
		editor:function(id){
		console.log();
		this.editorTodo=id;
		// this.beforeText=id;
		},
		edtored:function(){
			this.editorTodo='';
		},
		// 取消编辑
		cancle:function(){
			console.log(123)
		// 在编辑之前保存一下text的数据，方便返回
		// text=this.beforeText;
			// 让div显示,input隐藏
			// this.editorTodo='';
	}

},
	// 自定义指令,当input框失去焦点后触发的函数
		directives:{
			"focus":{
				update:function(el,binding){
				if(binding.value){
					el.focus();
				}
				}
			}
		}

})
