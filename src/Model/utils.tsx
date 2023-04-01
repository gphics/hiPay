

interface registerInterface{
    firstname: string,
    lastname: string,
    email: string,
    contact: string,
    password:string
 
}
interface loginInterface{
    email: string;
    password:string
}
export interface userSliceInterface{
    register: registerInterface,
    isLoading: boolean,
    login: loginInterface,
    user: {},
    isAuthenticated: boolean,
    transaction: {
        accountName: string,
        accountNumber: string|number,
        pin: string|number,
        amount: number | string,
        remarks: string,
        id:string,
    },
    transactionList: {id:string, sender:number, receiver:number, amount:number, remarks:string, created_at:string}[]
}