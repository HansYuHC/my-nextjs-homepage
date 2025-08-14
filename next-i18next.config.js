// next-i18next.config.js
module.exports = {
  i18n: {
    defaultLocale: 'en', // 默认语言
    locales: ['en', 'de', 'zh'], // 支持的语言
  },
  reloadOnPrerender: process.env.NODE_ENV === 'development', // 开发模式下热重载
};