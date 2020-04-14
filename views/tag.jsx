import fetch from './../components/async-fetch/fetch.js'

import CONST from './const.js';

class TagComponent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            list: CONST.TAG.DEFAULTS,
            isShow: false
        }
    }

    async componentDidMount() {
        await this.initList()
    }

    async initList() {
        const self = this

        await fetch.get({
            url: 'android/recordevent/tag/get/',
            query: {}
        }).then(
            ({ data: { list } }) => self.setState({ list }),
            error => { }
        )
    }

    show() {
        this.setState({ isShow: true })
        this.initList()
    }

    hide() {
        this.setState({ isShow: false })
    }

    render() {
        const { isShow, list } = this.state

        return isShow ? (
            <div className="tag">
                <div className="tag-add">
                    <div className="tag-add-container flex-center">新建分类</div>
                </div>

                <div className="tag-list">{list.map(({ tagname }, key) => (
                    <div className="list-item" key={key}>
                        <div className="list-item-container flex-center">{tagname}</div>
                    </div>
                ))}</div>
            </div>
        ) : ''
    }
}

export default TagComponent
