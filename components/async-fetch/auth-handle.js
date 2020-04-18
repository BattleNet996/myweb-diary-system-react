import consequencer from './../../utils/consequencer.js';

import {
    succeedHandle,
    errorHandle,
    notHandleResult,
    requestUrl,
    requestConfig,
    requestContent
} from './request-handle.js';
import CONST from './const.js';
import {
    inputPopUp,
    inputPopUpDestroy
} from './../input-popup.js';
import toast from './../toast.js';
import initHeaders from './headers.js';
import config from './config.js';

/**
 * 含义: 未授权流程
 * 注意: 仅执行一次
 */
const unAuthHandle = ({
    result,
    data,
    message
}) => {
    console.log('登录未授权, 进入处理流程;', result);

    /** 未查询到数据表明没有此用户，说明token凭证是错误的 */
    if (result === CONST.RESULT_CODE.ACCESS_DENIED_SERVER.value) return reEnterPassword()

    /** 后端验证表示过期 需要前端主动刷新token */
    if (result === CONST.RESULT_CODE.ACCESS_EXPIRED.value) return reAuthPassword()
}

/**
 * 含义: 输入密码重新授权
 */
const reEnterPassword = async() => {
    console.log('本地缓存密码已经失效, 开始重新输入密码;');
    toast.destroy()

    const inputHandle = password => {
        window.fetch(`${config.origin}login/rejiejay`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            body: JSON.stringify({ password })
        }).then(
            response => response.json(),
            error => ({ result: 233, data: null, message: error })
        ).then(
            ({ data }) => {
                console.log(`密码授权成功，获得新凭证${data}；执行进入原请求流程`);

                localStorage.setItem('rejiejay-diary-system-password', password)
                localStorage.setItem('rejiejay-diary-system-token', data.token)
                localStorage.setItem('rejiejay-diary-system-token-expired', data.tokenexpired)

                inputPopUpDestroy()
                reRequestHandle()
            },
            error => console.log('账号密码授权失败，请再次尝试输入密码；原因: ', error)
        ).catch(
            error => console.log('账号密码授权失败，请再次尝试输入密码；原因: ', error)
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

/**
 * 含义: 根据密码重新登录
 */
const reAuthPassword = () => {
    console.log('根据本地密码开始再次授权流程;');

    const password = localStorage.getItem('rejiejay-diary-system-password')
    toast.destroy()

    window.fetch(`${config.origin}/login/refresh/rejiejay`, {
        method: 'POST',
        headers: initHeaders({ request: { password } }),
        body: JSON.stringify({ password })
    }).then(
        response => response.json(),
        error => ({ result: 233, data: null, message: error })
    ).then(
        ({ data }) => {
            console.log(`密码授权成功，获得新凭证${data}；执行进入原请求流程`);

            localStorage.setItem('rejiejay-diary-system-password', password)
            localStorage.setItem('rejiejay-diary-system-token', data.token)
            localStorage.setItem('rejiejay-diary-system-token-expired', data.tokenexpired)

            reRequestHandle()
        },
        error => {
            console.log(`此次账号密码授权失败${error}，授权流程执行完毕；`)
            errorHandle(consequencer.error(error))
        }
    ).catch(
        error => {
            console.log(`此次账号密码授权失败${error}，授权流程执行完毕；`)
            errorHandle(consequencer.error(error))
        }
    )
}

/**
 * 含义: 再次请求原请求
 */
const reRequestHandle = () => {
    console.log('执行开始原请求流程')
    toast.show()
    requestConfig.headers = initHeaders({ request: requestContent })

    window.fetch(requestUrl, requestConfig).then(
        response => response.json(),
        error => consequencer.error(error)
    ).then(
        response => {
            console.log(`原请求流程执行成功, 此次授权流程执行完毕!`)
            toast.destroy()

            if (notHandleResult || response.result === 1) {
                /** 含义: 不自动处理错误 */
                succeedHandle(response)
            } else {
                errorHandle(response)
            }
        },
        error => {
            console.log(`原请求流程执行完毕, 错误${error}，没救了、退出此次授权流程；`)
            toast.destroy()
            errorHandle(consequencer.error(error))
        }
    ).catch(
        error => {
            console.log(`原请求流程执行完毕, 错误${error}，没救了、退出此次授权流程；`)
            toast.destroy()
            errorHandle(consequencer.error(error))
        }
    )
}

export default unAuthHandle