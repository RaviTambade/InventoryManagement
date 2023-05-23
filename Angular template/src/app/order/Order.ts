export class Order{
    constructor(
        public orderId:number,
        public employeeFirstName:string,
        public employeeLastName:string,
        public orderDate:Date,
        public status:string,
        public materialId:Number,
        public materialName:string,
        public materialType:string,
        public quantity:Number,

    ){}
}
