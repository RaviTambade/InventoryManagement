export class UserDetails {
    constructor(public id:number,
        public aadharId:string,
        public firstName:string,
        public lastName:string,
        public birthDate:Date,
        public gender:string,
        public email:string,
        public contactNumber:string,
        public imageUrl:string){}
}