const PORT = '3070'

module.exports = {
  // 服务监听端口
  port: PORT,
  host: `http://localhost:${PORT}`,
  // jwt 加密私钥
  secret:
    'ewo05s67fUCHzB47aBLgEoPy9MPr9prgIyf4zBSkvBLFgIHEsOBOpPqKpOC69YRdLUqEiIzX4e56M0OW1WYkoo3Fzp56p6pvlYHN4F5daQsAfLCaIweN0WH9gx2LZUxLOpBkBeKgSVh9pCFuPufKlu9tLXTr3rgiiY7zpkJcYVPmYaHl2vq8xyNgiiWCXOTAu3ohYMFU93O3Z0DIFJDPyLQB6uxLtRDmHcFDXYe3cuttbVVYJAqj0CHamZJvgzpk',
  // token 失效时间 moment参数
  exp: [2, 'hours'],
  // 授权应用id与key
  adminToken: 'iEFevupDNjErw7kaexb7ckqFXEkLQcGR',
  // 是否启用资源缓存(同样的url不重新绘制)
  // cache: false,
  cache: process.env.NODE_ENV === 'production',
  //  资源缓存时间
  ttl: 7200,
  // sentry_dsn:
  //   'https://294cef10aa2d406a8c7eae47cde21699:c0554d69ffff45fa881d5327ab7b5671@ats.styd.cn/16',
  users: [
    {
      id: 'mina',
      key: 'XcQ3NEuaBgINUKgZjIrRcH1hULCCwn8z'
    }
  ]
}
