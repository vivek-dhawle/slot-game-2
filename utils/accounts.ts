class Account{
    private balance
    constructor(){
        this.balance=10000
    }


    increaseBalance(val:number){
        this.balance+=val
    }
    decreaseBalnce(val:number){
        if(this.balance-val<0)return 'low Balance'
        this.balance-=val
    }

    getBalance(){
        return this.balance
    }
}

export default Account 