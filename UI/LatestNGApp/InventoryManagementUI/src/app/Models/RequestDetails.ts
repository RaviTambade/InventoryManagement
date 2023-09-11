export class RequestDetails {
    constructor(
                public date:Date | ("yyyy/mm/dd"),
                public id:number,
                public name:string,
                public status:string,
                public userId:number,
                ){}
}

