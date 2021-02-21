const path = require('path');
const IS_PROD = ['production', 'test'].includes(process.env.NODE_ENV);
function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    /* 部署应用包的基本URL */
    /* baseUrl 从 Vue CLI 3.3 起已弃用 ，请使用publicPath */
    //  baseUrl: process.env.NODE_ENV === "production" ? "./" : "./",
    publicPath: process.env.NODE_ENV === "production" ? "./" : "./",
    /* 生产环境构建文件的目录 defalut: dist */
    outputDir: "dist",
    /* 放置生成的静态文件目录（js css img） */
    assetsDir: "assets",
    /* 指定生成的index.html 输出路径 相对 default: index.html */
    indexPath: "index.html",
    /* 指定生成文件名中包含hash default: true */
    filenameHashing: true,

    /* 是否保存时 lint 代码 */
    lintOnSave: process.env.NODE_ENV === "production",
    /* 是否使用编译器 default: false */
    runtimeCompiler: false,

    /* 生产环境的source map */
    productionSourceMap: true,
    integrity: false,

    configureWebpack: {
        resolve: {
            // extensions:['.js','json','.vue'],
            alias: {
                '@': resolve('/src'),
                '@c':resolve('/src/components')
            }
        }
    },

    // css相关配置
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        extract: IS_PROD,
        // 开启 CSS source maps?
        sourceMap: false,
        // css预设器配置项
        loaderOptions: {
            sass: {
                prependData: `@import "@/assets/scss/reset.scss";`
            }
        },
        requireModuleExtension: true
    },

    devServer: {
        port: 8080,
        https: false,
        open:true,
        proxy: {
            "/dev-api": {
                target: "http://localhost:8081",
                // 将主机标头的原点更改为目标URL
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    "^/dev-api": ""
                },
                secure: false, // 使用的是http协议则设置为false，https协议则设置为true
                changOrigin: true,
            }
        }
    }
};