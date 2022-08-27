export interface IBloodPressure {
    docID:string;
    Status: string;
    diastolic:number;
    systolic: number;
    pulse:number;
    date: {seconds:number; nanoseconds:number;}
}

export interface IBloodPressure_input {
    Status: string;
    diastolic:number;
    systolic: number;
    pulse:number;
    date: Date | null;
}

export interface IOxygen {
    docID:string;
    SpO2:number;
    pulse:number;
    status:string | null;
    date: {seconds:number; nanoseconds:number;}
}

export interface IOxygen_input {
    SpO2:number;
    pulse:number;
    date: Date | null;
    status:string;
}

export interface ISugar {
    docID:string;
    sugarLevel:number;
    date: {seconds:number; nanoseconds:number;},
    type:string | null;
    status:string;
}

export interface ISugar_input {
    sugarLevel:number;
    date: Date | null;
    type:string | null;
    status:string;
}

export interface ITemperature {
    docID:string;
    temp:number;
    status:string | null;
    date: {seconds:number; nanoseconds:number;};
}

export interface ITemperature_input {
    temp:number;
    date: Date | null;
    status:string | null;
}

export interface IWeight {
    weight:number;
    date: {seconds:number; nanoseconds:number;};
    status:string | null;
}

export interface IWeight_input {
    weight:number;
    date: Date | null;
    status:string | null;
}

export interface Ivitals_error{
    error:string | null;
    show:boolean;
}