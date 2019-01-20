module.exports = {
    title: '郑宏振/Zheng Hong Zhen', // 设置网站标题
    description: '我的个人博客|博客主页', //描述
    dest: './dist',   // 设置输出目录
    port: 2233, //端口
    themeConfig: { //主题配置
      // 添加导航栏
      nav: [
        { text: '主页', link: '/' }, // 导航条
        { text: '前端总结', link: '/webbar/' },
        { text: '后端学习', link: '/backEnd/' },
        { text: '关于我', link: '/about/' },
        { text: 'github', link: 'https://github.com/Har-zheng' },
        {
            text: '码云',
            items: [
                { text: '码云仓', link: 'https://gitee.com/zhz-zheng/recruitment_site' }
            ]
        }
      ],
      // 为以下路由添加侧边栏
      sidebar:{
        // 侧边栏在 /foo/ 上
        '/webbar/': [
            '',
            'one.md',
            'two.md'
        ],
        // 侧边栏在 /bar/ 上
        '/backEnd/': [
            '',
            'one',
            'two'
        ]
      }
    }
  }