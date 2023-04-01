

export default function showLinks(elem:string, removalClass:string):void{
    const item = document.querySelector(`.${elem}`)
    item?.classList.toggle(removalClass)
}