var webpack       = require('webpack');
var merge         = require('webpack-merge');
var BundleTracker = require('webpack-bundle-tracker');
var autoprefixer  = require('autoprefixer');

var TARGET = process.env.npm_lifecycle_event;
process.env.BABEL_ENV = TARGET;

var target = __dirname + '/../static/js/bundles';

var common = {
    entry: __dirname + '/app/index.jsx',

    output: {
        path: target,
        filename: '[name]-[hash].js'
    },

    resolve: {
        extensions: ['', '.js', '.jsx', '.json', '.scss'],
        modulesDirectories: ['node_modules']
    },

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015', 'stage-0', 'stage-1', 'stage-2'],
                    plugins: ['add-module-exports']
                },
                include: [
                    __dirname + '/app',
                    __dirname + '/node_modules/react-icons',
                    __dirname + '/node_modules/react-icon-base',
                ],
            },

            {
                test: /\.json$/,
                loader: 'json',
            },

            {
                test: /\.scss$/,
                loader: 'style!css!postcss!sass',
                include: __dirname + '/app'
            },

            {
                test: /\.css$/,
                loader: 'style!css!postcss'
            }
        ]
    },

    sassLoader: {
        includePaths: [__dirname + '/node_modules']
    },

    postcss: function() {
        return {
            defaults: [autoprefixer],
            cleaner: [autoprefixer({ browsers: [
                'Chrome >= 35',
                'Firefox >= 31',
                'Edge >= 12',
                'Explorer >= 9',
                'iOS >= 8',
                'Safari >= 8',
                'Android 2.3',
                'Android >= 4',
                'Opera >= 12'
            ]})]
        }
    },

    plugins: [
        new BundleTracker({
            path: target,
            filename: './webpack-stats.json'
        })
    ]
};

if (TARGET === 'build') {
    module.exports = merge(common, {
        plugins: [
            new webpack.DefinePlugin({
                'process.env': { 'NODE_ENV': JSON.stringify('production') }
            })
        ]
    });
}

if (TARGET === 'start') {
    module.exports = merge(common, {
        devtool: 'eval-source-map',
        devServer: {
            contentBase: target,
            progress: true,
        }
    });
}
