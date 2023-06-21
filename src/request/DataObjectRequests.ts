export enum ObjectType {
    REQUEST_OBJECT = 'REQUEST_OBJECT', 
    RESPONSE_OBJECT = 'RESPONSE_OBJECT', 
    DATA_OBJECT = 'DATA_OBJECT'
}

export class CreateDataObjectRequest {
    code!: string;
    name!: string;
    description?: string;
    objectType!: ObjectType;
    keys!: CreateDataObjectKeyRequest[];
    
    
    constructor(code: string, name: string, description: string, objectType: ObjectType, keys: CreateDataObjectKeyRequest[]){
        this.code = code;
        this.name = name;
        this.description = description;
        this.keys = keys;
        this.objectType = objectType;
    }
}

export class CreateDataObjectKeyRequest {
    code!: string;
    name!: string;
    description?: string;
    isArray!: boolean;
    dataType!: string;

    constructor(code: string, name: string, description: string, isArray: boolean, dataType: string){
        this.code = code;
        this.name = name;
        this.description = description;
        this.isArray = isArray;
        this.dataType = dataType;
    }
}