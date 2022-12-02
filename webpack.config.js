const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: 'production',
    entry: {
        scripts: './src/scripts/app.ts',
        styles: './src/public/styles/styles.scss',
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: './src/public/assets', to: "assets" },
                { from: './src/public/pages', to: "pages" }
            ]
        })
    ],
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                include: [ path.resolve(__dirname, 'src') ],
                exclude: [
                    /\.png$/,
                    /\.glb$/,
                    /\.svg$/
                ]
            },
            {
                test: /\.scss$/i,
                use: [ 'style-loader', 'css-loader', 'sass-loader' ],
            }
        ]
    },
    resolve: {
        extensions: [ '.ts', '.js', '.scss' ],
        alias: {
            three$: path.resolve(__dirname, './src/scripts/utils/aethree.ts'),
            "@utils": path.resolve(__dirname, './src/scripts/utils/'),
        }
    },
    output: {
        publicPath: 'dist/public',
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist', 'public')
    }
};
