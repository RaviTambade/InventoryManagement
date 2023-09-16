export class OrderDetails{

    constructor(

        public id:number,
        public orderDate:Date,
        public status:string,
        public firstName:Number,
        public lastName:Number,
        public materialId:number,
        public name:string,
        public category:string,
        public quantity:number,
        public availableQuantity:number,
        public department:string,
        public imageUrl:string,
        public itemStatus:boolean

    ){}

}