module.exports = {
    entry: {
        app: ['./sass/app.scss', './js/app.js']
    },
    port: 3003,
    html: false,
    assets_url: '/assets/',
    assets_path: './assets/',
    refresh: ['index.html', './templates/**/*.html', './modals/**/*.html']
}
