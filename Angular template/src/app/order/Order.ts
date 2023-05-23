export class Order{
    constructor(
        public OrderId:number,
        public EmployeeFirstName:string,
        public EmployeeLastName:string,
        public OrderDate:Date,
        public status:string,
        public MaterialId:Number,
        public MaterialName:string,
        public MaterialType:string,
        public Quantity:Number,

    ){}
}
