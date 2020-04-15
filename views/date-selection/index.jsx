import fetch from '../../components/async-fetch/fetch.js'

import CONST from './const.js';

class DateSelection extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            list: CONST.DATA.DEFAULTS
        }
    }

    async componentDidMount() {
        await this.initList()
    }

    async initList() {
        const self = this

        await fetch.get({
            url: 'android/recordevent/date/get',
            query: {}
        }).then(
            ({ data: { statistic } }) => self.setState({ list: statistic }),
            error => { }
        )
    }

    closeHandle() {

    }

    render() {
        const self = this
        const { list } = this.state

        return [
            <div className="close">
                <div className="close-container flex-center"
                    onClick={this.closeHandle.bind(this)}
                >关闭</div>
            </div>,

            <div className="date">1
            </div>
        ]
    }
}

window.onload = () => ReactDOM.render(<DateSelection />, document.body);
