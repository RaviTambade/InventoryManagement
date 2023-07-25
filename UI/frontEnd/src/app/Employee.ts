export class Employee{
    constructor(
        public userId:number,
        public employeeFirstName:string,
        public employeeLastName:string,
        public birthDate:Date,
        public hireDate:Date,
        public contactNumber:string,
        public email:string,
        public password:string,
        public imgUrl:string,
        public gender:string,
        public department:string,
        public role:string,
    ){}
}

