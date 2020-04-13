import fetch from './async-fetch/fetch.js';
import toast from './toast.js';
import {
    inputPopUp,
    inputPopUpDestroy
} from './input-popup.js';

const showLogInput = (resolve, reject) => {
    const inputHandle = password => {
        fetch.post({
            url: 'login/rejiejay',
            body: { password },
            hiddenError: true
        }).then(
            ({ data }) => {
                localStorage.setItem('rejiejay-diary-system-password', password)
                localStorage.setItem('rejiejay-diary-system-token', data.token)
                localStorage.setItem('rejiejay-diary-system-token-expired', data.tokenexpired)
                resolve()
                inputPopUpDestroy()
                toast.show('登录成功！')
            },
            error => reject(error)
        )
    }

    const defaultValue = localStorage.getItem('rejiejay-diary-system-password')

    inputPopUp({
        title: '请输入登录密码?',
        inputHandle,
        mustInput: true,
        defaultValue
    })
}

const init = () => new Promise((resolve, reject) => {
    let password = localStorage.getItem('rejiejay-diary-system-password')

    if (!password) return showLogInput(resolve, reject)

    fetch.post({
        url: 'login/rejiejay',
        body: { password },
        hiddenError: true
    }).then(
        ({ data }) => {
            localStorage.setItem('rejiejay-diary-system-password', password)
            localStorage.setItem('rejiejay-diary-system-token', data.token)
            localStorage.setItem('rejiejay-diary-system-token-expired', data.tokenexpired)
            resolve()
        },
        error => showLogInput(resolve, reject)
    )
})

export default init