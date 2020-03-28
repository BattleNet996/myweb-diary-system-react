class MainComponent extends React.Component {

    componentDidMount() {
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
