export class Task{
    constructor(
        public orderId:number,
        public taskId:number,
        public section:string,
        public department:string,
        public status:string,
        public supervisorId:number,
        public storemanagerId:number
    ){}
}