const r = arr => arr[Math.floor(Math.random() * arr.length)]

const first = () => r(['Alice', 'Bob', 'Charlie', 'Dave', 'Eve'])
const last = () => r(['Blau', 'Gelb', 'Grün', 'Lila', 'Rot'])
const cl = () => {
    const g = Math.floor(Math.random() * 10) + 4
    const c = n => r('abcdefg'.slice(0, n).split(''))
    if (g > 11) return `${g}`
    if (g > 6 && g < 11) return `${g}${c(6)}`
    return `${g}${c(4)}`
}
const mail = () => `${first().toLowerCase()}.${last().toLowerCase()}@${r(['example.com', 'email'])}`

const student = () => `${last()},${first()},${cl()},${mail()}`

for (let i = 0; i < 400; i ++) console.log(student())
