module.exports = {
  proxy: {
    '/apis': { //将www.exaple.com印射为/apis
      target: 'https://alisite.m.taobao.com', // 接口域名
      secure: true, // 如果是https接口，需要配置这个参数
      changeOrigin: true, //是否跨域
      pathRewrite: {
        '^/apis': '' //需要rewrite的,
      },
      onProxyReq(proxyReq, req, res) {
        proxyReq.setHeader('cookie', 't=2935d67c19ea3ac1ecd366f3ece6fff1; ucn=center; enc=n7rV6OZoS%2BH3HVgekBxkJDt1J4QQ01%2BDFiWsWgSvRTI4us2WdWd%2FMq1ChUDOacNpQiUX8rb1dsPCxOhdpLXqHw%3D%3D; thw=cn; hng=CN%7Czh-CN%7CCNY%7C156; cna=2LVpGYCYQUMCAbSohrRz2286; lgc=victoriassecret%5Cu5B98%5Cu65B9%5Cu65D7%5Cu8230%5Cu5E97; tracknick=victoriassecret%5Cu5B98%5Cu65B9%5Cu65D7%5Cu8230%5Cu5E97; miid=291794793173551290; cookie2=162f59b49f43c503c9c2d67acfff06b9; _tb_token_=573e130be7330; _samesite_flag_=true; cancelledSubSites=empty; dnk=victoriassecret%5Cu5B98%5Cu65B9%5Cu65D7%5Cu8230%5Cu5E97; v=0; _utk=VocP@qJyn^AtWdm; XSRF-TOKEN=1a2eb1b6-1561-4cc3-9195-507b4654bd50; _cc_=V32FPkk%2Fhw%3D%3D; _m_h5_tk=2acd3edb268e3edcf7d38223e9d44dd6_1629464518383; _m_h5_tk_enc=4e7d5aa88281c044988d60ceccf4b384; xlly_s=1; unb=3265150369; uc1=cookie16=W5iHLLyFPlMGbLDwA%2BdvAGZqLg%3D%3D&cookie21=URm48syIZJwTkNGk7eanmw%3D%3D&tmb=1&cookie14=Uoe2xMVMwbabfg%3D%3D&existShop=true&cookie15=U%2BGCWk%2F75gdr5Q%3D%3D&pas=0; uc3=id2=UNJXw5Nj2KrAIg%3D%3D&nk2=Fb76GdtHDDckDrAwpVK5XhjmbQBv%2BEZTwQ%3D%3D&vt3=F8dCujHuI9SEgycFj3o%3D&lg2=VT5L2FSpMGV7TQ%3D%3D; csg=d5e03af1; cookie17=UNJXw5Nj2KrAIg%3D%3D; skt=68d0622c6dbd357c; existShop=MTYyOTY4MTgwMQ%3D%3D; uc4=id4=0%40UgXQyd2Vywuq2hL1EmR7OUe7FUc%2B&nk4=0%40Fw%2BoE4cciBqSEWxnax1ZdjGrkUIwTJnHQ8%2F0nYMImlf03l2A; _l_g_=Ug%3D%3D; sg=%E5%BA%9799; _nk_=victoriassecret%5Cu5B98%5Cu65B9%5Cu65D7%5Cu8230%5Cu5E97; cookie1=BqQhuWH15zr%2BHONH5VqktzgYSYJcEzUh5tN2BKntLz0%3D; sgcookie=E1000AajHCqpe9c2XWv%2B1MGqAGIYRFkYtriKVNnot%2B1c5mblBi8MFBrVuljifyrtseI7NnKebHm4aTAU4jRl%2Fk919sZvZHpsIQdpGWDdZwrlWQ8%3D; isg=BP7-BSoGE4t86EZ6SYPh3XRZTxRAP8K57NVRBagHasE8S54lEM8SySQpwx-H6LrR; l=eBNsP3cIjvZGzGMBBOfanurza77OSIRYYuPzaNbMiOCPOBfB5vvfW6n2QY86C3GNhs1wR3RSn5QMBeYBqQAonxvtVSNxxDDmn; tfstk=cazOBd0jg9XGgfcLalIhhSsshYXlweBxdCMDk1cdnfK7wv1DHz48qzIsGd3d9');
      }

    },
    '/apic': { //将www.exaple.com印射为/apis
      target: 'https://sycm.taobao.com', // 接口域名
      secure: true, // 如果是https接口，需要配置这个参数
      changeOrigin: true, //是否跨域
      pathRewrite: {
        '^/apic': '' //需要rewrite的,
      },
      onProxyReq(proxyReq, req, res) {
        proxyReq.setHeader('cookie', 't=2935d67c19ea3ac1ecd366f3ece6fff1; enc=n7rV6OZoS%2BH3HVgekBxkJDt1J4QQ01%2BDFiWsWgSvRTI4us2WdWd%2FMq1ChUDOacNpQiUX8rb1dsPCxOhdpLXqHw%3D%3D; thw=cn; hng=CN%7Czh-CN%7CCNY%7C156; cna=2LVpGYCYQUMCAbSohrRz2286; lgc=victoriassecret%5Cu5B98%5Cu65B9%5Cu65D7%5Cu8230%5Cu5E97; tracknick=victoriassecret%5Cu5B98%5Cu65B9%5Cu65D7%5Cu8230%5Cu5E97; miid=291794793173551290; cookie2=162f59b49f43c503c9c2d67acfff06b9; _tb_token_=573e130be7330; _samesite_flag_=true; cancelledSubSites=empty; dnk=victoriassecret%5Cu5B98%5Cu65B9%5Cu65D7%5Cu8230%5Cu5E97; v=0; _utk=VocP@qJyn^AtWdm; XSRF-TOKEN=41b39f48-a601-4744-9cde-e983bdeee825; _cc_=V32FPkk%2Fhw%3D%3D; _m_h5_tk=2acd3edb268e3edcf7d38223e9d44dd6_1629464518383; _m_h5_tk_enc=4e7d5aa88281c044988d60ceccf4b384; xlly_s=1; unb=3265150369; uc1=cookie16=W5iHLLyFPlMGbLDwA%2BdvAGZqLg%3D%3D&cookie21=URm48syIZJwTkNGk7eanmw%3D%3D&tmb=1&cookie14=Uoe2xMVMwbabfg%3D%3D&existShop=true&cookie15=U%2BGCWk%2F75gdr5Q%3D%3D&pas=0; uc3=id2=UNJXw5Nj2KrAIg%3D%3D&nk2=Fb76GdtHDDckDrAwpVK5XhjmbQBv%2BEZTwQ%3D%3D&vt3=F8dCujHuI9SEgycFj3o%3D&lg2=VT5L2FSpMGV7TQ%3D%3D; csg=d5e03af1; cookie17=UNJXw5Nj2KrAIg%3D%3D; skt=68d0622c6dbd357c; existShop=MTYyOTY4MTgwMQ%3D%3D; uc4=id4=0%40UgXQyd2Vywuq2hL1EmR7OUe7FUc%2B&nk4=0%40Fw%2BoE4cciBqSEWxnax1ZdjGrkUIwTJnHQ8%2F0nYMImlf03l2A; _l_g_=Ug%3D%3D; sg=%E5%BA%9799; _nk_=victoriassecret%5Cu5B98%5Cu65B9%5Cu65D7%5Cu8230%5Cu5E97; cookie1=BqQhuWH15zr%2BHONH5VqktzgYSYJcEzUh5tN2BKntLz0%3D; sgcookie=E1000AajHCqpe9c2XWv%2B1MGqAGIYRFkYtriKVNnot%2B1c5mblBi8MFBrVuljifyrtseI7NnKebHm4aTAU4jRl%2Fk919sZvZHpsIQdpGWDdZwrlWQ8%3D; _euacm_ac_l_uid_=3265150369; 3265150369_euacm_ac_c_uid_=3265150369; 3265150369_euacm_ac_rs_uid_=3265150369; __is_gray_sycm__=true; __is_gray_sycm___value=3265150369; _euacm_ac_rs_sid_=288498688; isg=BP7-BSoGE4t86EZ6SYPh3XRZTxRAP8K57NVRBagHasE8S54lEM8SySQpwx-H6LrR; l=eBNsP3cIjvZGzGMBBOfanurza77OSIRYYuPzaNbMiOCPOBfB5vvfW6n2QY86C3GNhs1wR3RSn5QMBeYBqQAonxvtVSNxxDDmn; tfstk=cazOBd0jg9XGgfcLalIhhSsshYXlweBxdCMDk1cdnfK7wv1DHz48qzIsGd3d9; JSESSIONID=1F4FFEEAD4F4736A38E0D5DA0D733DF2');
      }

    }

  },

}


