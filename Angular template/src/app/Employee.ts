export class Employee{
    constructor(
        public employeeId:number,
        public employeeFirstName:string,
        public employeeLastName:string,
        public birthdate:string,
        public hiredate:Date,
        public contactNumber:string,
        public email:string,
        public password:string,
        public imgUrl:string,
        public gender:string,
        public department:string,
        public role:string,
    ){}
}

