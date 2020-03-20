// const webpack = require('./node_modules/webpack')
module.exports = {
    lintOnSave: false,
    publicPath: process.env.NODE_ENV === 'production' ? './' : '',
    devServer: {
        host: 'localhost',
        port: '80',
        hot: true,
        open: true,
        overlay: {
            warning: false,
            error: true
        },
        disableHostCheck: true
        // proxy: {
        //   [process.env.VUE_APP_BASE_API]: {
        //     target: process.env.VUE_APP_BASE_API,
        //     changeOrigin: true,
        //     secure: false,
        //     pathRewrite: {
        //       ["^" + process.env.VUE_APP_BASE_API]: ""
        //     }
        //   }
        // }
    },
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        extract: true,
        // 开启 CSS source maps?
        sourceMap: false,
        // css预设器配置项
        loaderOptions: {},
        // 启用 CSS modules for all css / pre-processor files.
        modules: false
    },
    configureWebpack: webackConfig => {
        const config = webackConfig
        const optimization = {}

        if (process.env.NODE_ENV === 'production') {
            // dop console
            config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true

            // 抽離公共代碼
            optimization.splitChunks = {
                cacheGroups: {
                    vendor: {
                        chunks: 'all',
                        test: /node_modules/,
                        name: 'vendor',
                        minChunks: 1,
                        maxInitialRequests: 5,
                        minSize: 0,
                        priority: 100
                    },
                    common: {
                        chunks: 'all',
                        test: /[\\/]src[\\/]js[\\/]/,
                        name: 'common',
                        minChunks: 2,
                        maxInitialRequests: 5,
                        minSize: 0,
                        priority: 60
                    },
                    styles: {
                        name: 'styles',
                        test: /\.(sa|sc|c)ss$/,
                        chunks: 'all',
                        enforce: true
                    },
                    runtimeChunk: {
                        // name: 'manifest'
                    }
                }
            }
        }
        return {
            optimization
        }
    },
    productionSourceMap: false
}
