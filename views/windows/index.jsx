import CONST from './const.js';

class MainComponent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {}
    }

    async componentDidMount() {}


    render() {
        return []
    }
}

window.onload = () => ReactDOM.render(<MainComponent />, document.body);
