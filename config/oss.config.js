const OSS = require('ali-oss');
let OssConfig;
let airDrop;
let oss;

if(process.env.NODE_ENV === 'production') {
	//oss发布环境上传配置
	OssConfig = new OSS({
		region: 'oss-cn-shanghai',
		accessKeyId: 'LTAIO0yAilX1fWuN',
		accessKeySecret: 'KlFKDT735vuEC4G0436HVZfgc1hs9o',
		bucket: 'od-prod-content',
		endpoint: 'oss-cn-shanghai-internal.aliyuncs.com',
	})

	airDrop = new OSS({
		region: 'oss-cn-shanghai',
		accessKeyId: 'LTAIO0yAilX1fWuN',
		accessKeySecret: 'KlFKDT735vuEC4G0436HVZfgc1hs9o',
		bucket: 'aqua-prod-content',
	})
	console.log('当前oss配置为生产环境');
} else {
	//oss测试环境上传配置
	OssConfig = new OSS({
		region: 'oss-cn-shanghai',
		accessKeyId: 'LTAIURFZK05AsqJi',
		accessKeySecret: 'r8KZ17vlkblm0YdE6UkqIM4bMSwejd',
		bucket: 'cz-dev-content',
		endpoint: 'oss-cn-shanghai-internal.aliyuncs.com',
	})

	airDrop = new OSS({
		region: 'oss-cn-shanghai',
		accessKeyId: 'LTAIURFZK05AsqJi',
		accessKeySecret: 'r8KZ17vlkblm0YdE6UkqIM4bMSwejd',
		bucket: 'cz-dev-media',
		 //endpoint: 'oss-cn-shanghai-internal.aliyuncs.com',
	})
	console.log('当前oss配置为测试');
}

if(process.env.NODE_ENV === 'production') {
	oss = {
		region: 'oss-cn-shanghai',
		accessKeyId: 'LTAIO0yAilX1fWuN',
		accessKeySecret: 'KlFKDT735vuEC4G0436HVZfgc1hs9o',
		bucket: 'od-prod-content',
		endpoint: 'oss-cn-shanghai-internal.aliyuncs.com',
	}
} else {
	oss = {
		region: 'oss-cn-shanghai',
		accessKeyId: 'LTAIURFZK05AsqJi',
		accessKeySecret: 'r8KZ17vlkblm0YdE6UkqIM4bMSwejd',
		bucket: 'cz-dev-content',
		endpoint: 'oss-cn-shanghai-internal.aliyuncs.com',
	}
}



module.exports = {
	OssConfig,
	airDrop,
	oss,
}
