export class Order{
    constructor(
        public id:number,
        public orderDate:Date,
        public status:string,
        public materialId:Number,
        public employeeId:Number,
        public name:string,
        public category:string,
        public quantity:Number,

    ){}
}
