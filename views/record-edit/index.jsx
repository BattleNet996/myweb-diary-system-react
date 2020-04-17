import fetch from './../../components/async-fetch/fetch.js'
import toast from './../../components/toast.js'
import timeTransformers from './../../utils/time-transformers.js';

import CONST from './const.js';

class MainComponent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            title: '',
            material: '',
            record: '',
            tag: ''
        }

        this.status = CONST.PAGE_STATUS.DEFAULTS
        this.id = null
    }

    async componentDidMount() { }

    saveHandle() {
        const self = this
        let {
            title,
            material,
            record,
            tag
        } = this.state

        if (!title) title = timeTransformers.dateToYYYYmmDDhhMM(new Date())
        if (!record) return toast.show('内容不能为空');

        const nowDate = new Date()

        const timestamp = nowDate.getTime()
        const fullyear = nowDate.getFullYear()
        const month = nowDate.getMonth() + 1
        const week = timeTransformers.getWeekInMonth(nowDate)

        fetch.post({
            url: 'android/record/add',
            body: {
                recordtitle: title,
                recordmaterial: material,
                recordcontent: record,
                tag,
                timestamp,
                fullyear,
                month,
                week
            }
        }).then(
            () => window.location.replace('./../index.html'),
            error => { }
        )
    }

    editHandle() { }

    deleteHandle() { }

    cancelHandle() { }

    render() {
        const self = this
        const { title, material, record } = this.state

        const status = this.status

        return [
            <div class="edit">
                <div class="edit-title edit-required">*简单描述/提问:</div>
                <div class="edit-input flex-start-center">
                    <input type="text" placeholder="标题"
                        value={title}
                        onChange={({ target: { value } }) => this.setState({ title: value })}
                    />
                </div>

                <div class="edit-title">灵感是什么?</div>
                <div class="edit-input flex-start-center">
                    <textarea rows="5" type="text" placeholder="灵感"
                        value={material}
                        onChange={({ target: { value } }) => this.setState({ material: value })}
                    ></textarea>
                </div>

                <div class="edit-title">详细描述与记录</div>
                <div class="edit-input flex-start-center">
                    <textarea rows="10" type="text" placeholder="结论"
                        value={record}
                        onChange={({ target: { value } }) => this.setState({ record: value })}
                    ></textarea>
                </div>
            </div>,

            <div class="operation">
                <div class="operation-container flex-start-center">
                    {status === CONST.PAGE_STATUS.ADD && [
                        <div class="vertical-line"></div>,
                        <div class="operation-button flex-center flex-rest"
                            onClick={this.saveHandle.bind(this)}
                        >保存</div>
                    ]}
                    {status === CONST.PAGE_STATUS.EDIT && [
                        <div class="vertical-line"></div>,
                        <div class="operation-button flex-center flex-rest"
                            onClick={this.editHandle.bind(this)}
                        >修改</div>
                    ]}
                    {status === CONST.PAGE_STATUS.EDIT && [
                        <div class="vertical-line"></div>,
                        <div class="operation-button flex-center flex-rest"
                            onClick={this.deleteHandle.bind(this)}
                        >删除</div>
                    ]}
                    <div class="vertical-line"></div>
                    <div class="operation-button flex-center flex-rest"
                        onClick={this.cancelHandle.bind(this)}
                    >取消</div>
                </div>
            </div>
        ]
    }
}

window.onload = () => ReactDOM.render(<MainComponent />, document.body);
