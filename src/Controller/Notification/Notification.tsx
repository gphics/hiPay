




export default function showNotification(msg: string): void{
    // getting dom elements
    const notificationHolder: any = document.querySelector(".notification_component_holder ")

    const mainNotification: any = document.querySelector("#main_notification")
    
    const timeout_display:any = document.querySelector(".timeout_display")
    // removing the hide class and customizing the message
    notificationHolder.classList.remove("hide_notification")
    timeout_display.classList.add("timeout_animation")
    mainNotification.textContent = msg

    setTimeout(():void => {
        notificationHolder.classList.add("hide_notification")
        mainNotification.textContent = ""
         timeout_display.classList.remove("timeout_animation")
    },7000)
}