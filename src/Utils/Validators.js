export const required = value =>{
    if(value) return undefined
    return 'Это поле обязательно'
}

export const minLength = value =>{
    if(value.length >= 6) return undefined
    return 'Минимальная длинна 6 символов'
}

export const maxLength = value =>{
    if(value.length <= 30) return undefined
    return 'Максимальная длинна 30 символов'
}