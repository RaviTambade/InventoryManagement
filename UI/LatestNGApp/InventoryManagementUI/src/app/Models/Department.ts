export class Department {
    constructor(
                public id:number,
                public department:string,
                public firstSupervisor:number,
                public secondSupervisor:number,
                public firstSupervisorName:string,
                public secondSupervisorName:string
                ){}
}