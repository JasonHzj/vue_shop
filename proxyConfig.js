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
        proxyReq.setHeader('cookie', 't=2935d67c19ea3ac1ecd366f3ece6fff1; ucn=center; enc=n7rV6OZoS%2BH3HVgekBxkJDt1J4QQ01%2BDFiWsWgSvRTI4us2WdWd%2FMq1ChUDOacNpQiUX8rb1dsPCxOhdpLXqHw%3D%3D; thw=cn; cna=2LVpGYCYQUMCAbSohrRz2286; lgc=victoriassecret%5Cu5B98%5Cu65B9%5Cu65D7%5Cu8230%5Cu5E97; tracknick=victoriassecret%5Cu5B98%5Cu65B9%5Cu65D7%5Cu8230%5Cu5E97; mt=ci=0_1; cookie2=1ef1e3141196e989428f3dcd32c05c3c; v=0; _tb_token_=33b5173beb77e; _samesite_flag_=true; cancelledSubSites=empty; dnk=victoriassecret%5Cu5B98%5Cu65B9%5Cu65D7%5Cu8230%5Cu5E97; XSRF-TOKEN=e56fe6fd-20b6-40bd-b106-eb7066539905; _utk=VocP@qJyn^AtWdm; xlly_s=1; unb=3265150369; cookie17=UNJXw5Nj2KrAIg%3D%3D; _l_g_=Ug%3D%3D; sg=%E5%BA%9799; _nk_=victoriassecret%5Cu5B98%5Cu65B9%5Cu65D7%5Cu8230%5Cu5E97; cookie1=BqQhuWH15zr%2BHONH5VqktzgYSYJcEzUh5tN2BKntLz0%3D; uc1=tmb=1&pas=0&existShop=true&cookie14=Uoe2ytwIYd7Ryg%3D%3D&cookie15=UIHiLt3xD8xYTw%3D%3D&cookie16=U%2BGCWk%2F74Mx5tgzv3dWpnhjPaQ%3D%3D&cookie21=VT5L2FSpdeCsOSyjpvKO0Q%3D%3D; uc3=nk2=Fb76GdtHDDckDrAwpVK5XhjmbQBv%2BEZTwQ%3D%3D&vt3=F8dCujPx14QaxKq0FG4%3D&id2=UNJXw5Nj2KrAIg%3D%3D&lg2=UtASsssmOIJ0bQ%3D%3D; csg=3965a77a; skt=5fb141d8bf9e8933; existShop=MTYyNzk1NjQwNA%3D%3D; uc4=nk4=0%40Fw%2BoE4cciBqSEWxnax1ZdjGrkUIwTJnHQ8%2F0nYMGJe1XgwE1&id4=0%40UgXQyd2Vywuq2hL1EmR1U85kTsDh; _cc_=UtASsssmfA%3D%3D; sgcookie=E100cCyiPzQ%2FhsSefCwumqxwfhKSzZ6%2FGrOvPNyFrWdBe5mQgzYCPFMNV2KPN18kFk2vmh%2FxT8LAO1lXgAQ7GPBm1nqk7K4Q5lqsxO1ktFv6W08%3D; _m_h5_tk=84e9d87066c600aaf8f280fd84b1a133_1627965776046; _m_h5_tk_enc=e0d9a17cddbd5809679cb978d9f8b0bf; tfstk=cz15BFxKK0m7YZwEaaaq4TtMfW8RaJu6R8tlPOlWamz8L8syDsYS_hTRa9mKMdLf.; l=fBNsP3cIjvZGzpl9BOfwourza77OJIRAguPzaNbMi95P91_J5fEOW6hOAPOvCnGNFs1DR3RSn5QMBeYBqfYVZCBWtQrS0mkmnmOk-Wf..; isg=BE5OLBJpo7Hx9xZqOfORrSSpnyQQzxLJnEXhNXiXitE82-414F392oNRFw-3Qwrh');
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
        proxyReq.setHeader('cookie', 't=2935d67c19ea3ac1ecd366f3ece6fff1; enc=n7rV6OZoS%2BH3HVgekBxkJDt1J4QQ01%2BDFiWsWgSvRTI4us2WdWd%2FMq1ChUDOacNpQiUX8rb1dsPCxOhdpLXqHw%3D%3D; thw=cn; cna=2LVpGYCYQUMCAbSohrRz2286; lgc=victoriassecret%5Cu5B98%5Cu65B9%5Cu65D7%5Cu8230%5Cu5E97; tracknick=victoriassecret%5Cu5B98%5Cu65B9%5Cu65D7%5Cu8230%5Cu5E97; mt=ci=0_1; cookie2=1ef1e3141196e989428f3dcd32c05c3c; v=0; _tb_token_=33b5173beb77e; _samesite_flag_=true; cancelledSubSites=empty; dnk=victoriassecret%5Cu5B98%5Cu65B9%5Cu65D7%5Cu8230%5Cu5E97; _euacm_ac_l_uid_=3265150369; 3265150369_euacm_ac_c_uid_=3265150369; 3265150369_euacm_ac_rs_uid_=3265150369; XSRF-TOKEN=751dde74-ad52-4683-9ff6-d615f4d2fd01; _utk=VocP@qJyn^AtWdm; __is_gray_sycm__=true; __is_gray_sycm___value=3265150369; xlly_s=1; unb=3265150369; cookie17=UNJXw5Nj2KrAIg%3D%3D; _l_g_=Ug%3D%3D; sg=%E5%BA%9799; _nk_=victoriassecret%5Cu5B98%5Cu65B9%5Cu65D7%5Cu8230%5Cu5E97; cookie1=BqQhuWH15zr%2BHONH5VqktzgYSYJcEzUh5tN2BKntLz0%3D; uc1=tmb=1&pas=0&existShop=true&cookie14=Uoe2ytwIYd7Ryg%3D%3D&cookie15=UIHiLt3xD8xYTw%3D%3D&cookie16=U%2BGCWk%2F74Mx5tgzv3dWpnhjPaQ%3D%3D&cookie21=VT5L2FSpdeCsOSyjpvKO0Q%3D%3D; uc3=nk2=Fb76GdtHDDckDrAwpVK5XhjmbQBv%2BEZTwQ%3D%3D&vt3=F8dCujPx14QaxKq0FG4%3D&id2=UNJXw5Nj2KrAIg%3D%3D&lg2=UtASsssmOIJ0bQ%3D%3D; csg=3965a77a; skt=5fb141d8bf9e8933; existShop=MTYyNzk1NjQwNA%3D%3D; uc4=nk4=0%40Fw%2BoE4cciBqSEWxnax1ZdjGrkUIwTJnHQ8%2F0nYMGJe1XgwE1&id4=0%40UgXQyd2Vywuq2hL1EmR1U85kTsDh; _cc_=UtASsssmfA%3D%3D; sgcookie=E100cCyiPzQ%2FhsSefCwumqxwfhKSzZ6%2FGrOvPNyFrWdBe5mQgzYCPFMNV2KPN18kFk2vmh%2FxT8LAO1lXgAQ7GPBm1nqk7K4Q5lqsxO1ktFv6W08%3D; _portal_version_=new; cc_gray=1; _euacm_ac_rs_sid_=288498688; _m_h5_tk=84e9d87066c600aaf8f280fd84b1a133_1627965776046; _m_h5_tk_enc=e0d9a17cddbd5809679cb978d9f8b0bf; tfstk=cz15BFxKK0m7YZwEaaaq4TtMfW8RaJu6R8tlPOlWamz8L8syDsYS_hTRa9mKMdLf.; l=fBNsP3cIjvZGzpl9BOfwourza77OJIRAguPzaNbMi95P91_J5fEOW6hOAPOvCnGNFs1DR3RSn5QMBeYBqfYVZCBWtQrS0mkmnmOk-Wf..; isg=BE5OLBJpo7Hx9xZqOfORrSSpnyQQzxLJnEXhNXiXitE82-414F392oNRFw-3Qwrh; JSESSIONID=46EA532B16FCAC6EF9799A25D80FF6E1');
      }

    }

  },

}


