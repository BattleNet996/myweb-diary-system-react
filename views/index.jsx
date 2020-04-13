import fetch from './../components/async-fetch/fetch.js'
import login from './../components/login.js';

import CONST from './const.js';

class MainComponent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            pageNo: 1,
            dataTotal: 0,
            sort: CONST.SORT.DEFAULTS,
            dataType: CONST.DATA_TYPE.DEFAULTS,
            tag: 'all',
            list: CONST.DATA.DEMO
        }

        this.minTimestamp = 0
        this.maxTimestamp = 0
    }

    async componentDidMount() {
        await login()
        await this.initList({ isRefresh: true })
    }

    async initList({ isRefresh }) {
        const self = this
        const { list, sort, pageNo } = this.state
        const query = { sort, pageNo }

        await fetch.get({
            url: 'android/recordevent/list',
            query
        }).then(
            ({ data }) => self.setState({
                list: isRefresh ? data.list : list.concat(data.list),
                dataTotal: data.total
            }),
            error => { }
        )
    }

    render() {
        return [
            // 操作区域
            <div className="operating">
                <div className="operating-container">

                    <div className="operating-filter flex-start-center">
                        <div className="filter-btn flex-center flex-rest">日期</div>
                        <div className="dividing-line"></div>
                        <div className="filter-btn flex-center flex-rest">标签</div>
                        <div className="dividing-line"></div>
                        <div className="filter-btn flex-center flex-rest">数据类型</div>
                        <div className="dividing-line"></div>
                        <div className="filter-btn flex-center flex-rest">时间排序</div>
                    </div>

                    <div className="operating-add flex-start-center">
                        <div className="add-btn flex-center flex-rest">日记</div>
                        <div className="dividing-line"></div>
                        <div className="add-btn flex-center flex-rest">记录</div>
                    </div>
                </div>
            </div>,

            // 列表页
            <div className="list">
            </div>
        ]
    }
}

window.onload = () => ReactDOM.render(<MainComponent />, document.body);
