/**
 * url作用: 用于过滤路由, 例如 /todo/index.html
 */
const configs = [{
    route: '/windows/index.html',
    entry: './views/windows',
    output: './build/windows'
}, {
    route: '/index.html',
    entry: './views',
    output: './build'
}, {
    output: './build/windows',
    route: '/date-selection/index.html',
    entry: './views/date-selection',
    output: './build/date-selection'
}]

export default configs