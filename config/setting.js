//随机字符串
const uuid = () => {
	let idStr = Date.now().toString(36);
	return idStr += Math.random().toString(36).substr(3,8);
}

//检测crop路由提交数据
const checkData = (data) => {
	const obj = {
		width: parseInt(data.width),
		height: parseInt(data.height),
		left: parseInt(data.left),
		top: parseInt(data.top)
	}
	return obj;
}

//检测merge路由提交数据
const validate = (data) => {
	const obj = {
		userHead: '头像图片',
		userName: '王涛',
		url: 'www.baidu.com',
		lessonName: '儿童',
		introduction: '儿童阅读力'
	}
	return obj;
}


//时间戳转化 
const timetrans = {
	//全球统一时间
	UTC: (data) => {
		return new Date(data).toUTCString();
	},

	//北京时间
	GMT: (date) => {
    	var date = new Date(date);
    	var Y = date.getFullYear() + '年';
    	var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '月';
    	var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + '日 ';
    	var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    	var m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    	var s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds());
    	return Y+M+D+h+m+s;
	}
}

//内容分行算法
const rows = (data) => {
	let tmp = 0;
    let arr = [];
	for(let i = 0; i < data.length; i++) { 
        	if(data.charCodeAt(i) < 127) { 
            	tmp += 1;
            	if(tmp >= 62) {
                	arr.push(i);
                	tmp = 0;
           		}
        	} else {
        		tmp += 2;
             	if(tmp >= 62) {
                	arr.push(i);
                	tmp = 0
                }
        	}
    	} 
    return arr; 
}

module.exports = {
	checkData,
	uuid,
	validate,
	rows,
	timetrans,
}
