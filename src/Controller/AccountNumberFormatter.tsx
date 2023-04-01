export default function AccountNumberFormatter(variable:number) {
    const first = variable.toString().split("")
  const second = first.length / 4
  const third = Number.isInteger(second) ? second : second + 1
  const result =  []
  for (let x = 0; x <=third; x++){
    let A = first.splice(0, 4).join("")
    if(A !== "") result.push(A)
    }
    return result
}