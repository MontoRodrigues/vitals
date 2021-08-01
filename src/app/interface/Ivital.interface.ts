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
    date: {seconds:number; nanoseconds:number;}
}

export interface IOxygen_input {
    SpO2:number;
    pulse:number;
    date: Date | null;
}

export interface ISugar {
    docID:string;
    sugarLevel:number;
    date: {seconds:number; nanoseconds:number;}
}

export interface ISugar_input {
    sugarLevel:number;
    date: Date | null;
}

export interface ITemperature {
    docID:string;
    temp:number;
    date: {seconds:number; nanoseconds:number;};
}

export interface ITemperature_input {
    temp:number;
    date: Date | null;
}

export interface Ivitals_error{
    error:string | null;
    show:boolean;
}