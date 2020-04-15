/**
 * url作用: 用于过滤路由, 例如 /todo/index.html
 */
const configs = [{
    output: './build/windows',
    route: '/windows/index.html',
    entry: './views/windows',
    output: './build/windows'
}, {
    route: '/index.html',
    entry: './views',
    output: './build'
}, {
    output: './build/date-selection',
    route: '/date-selection/index.html',
    entry: './views/date-selection',
    output: './build/date-selection'
}, {
    output: './build/diary-edit',
    route: '/diary-edit/index.html',
    entry: './views/diary-edit',
    output: './build/diary-edit'
}, {
    output: './build/record-edit',
    route: '/record-edit/index.html',
    entry: './views/record-edit',
    output: './build/record-edit'
}]

export default configs