import fetch from './async-fetch/fetch.js';
import toast from './toast.js';
import {
    inputPopUp,
    inputPopUpDestroy
} from './input-popup.js';

const showLogInput = () => new Promise((resolve, reject) => {
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
})

const init = async() => {
    let password = localStorage.getItem('rejiejay-diary-system-password')

    if (!password) return showLogInput()

    await fetch.post({
        url: 'login/rejiejay',
        body: { password },
        hiddenError: true
    }).then(
        ({ data }) => {
            localStorage.setItem('rejiejay-diary-system-password', password)
            localStorage.setItem('rejiejay-diary-system-token', data.token)
            localStorage.setItem('rejiejay-diary-system-token-expired', data.tokenexpired)
        },
        error => showLogInput()
    )
}

export default init