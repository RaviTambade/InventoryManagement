export class Order{
    constructor(
        public id:number,
        public date:Date,
        public status:string,
        public userId:number,
    ){}
}
