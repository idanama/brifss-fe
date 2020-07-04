module.exports = {
    devServer: {
        proxy: {
            '^/graph': {
                target: 'http://feedbackend.herokuapp.com/graph',
                changeOrigin: true,
                // pathRewrite: {
                //     '^/graph': '/graph'
                // },
                logLevel: 'debug',
            }
        }
    }
}