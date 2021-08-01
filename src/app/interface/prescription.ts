import { scheduleStatus } from './../components/daily-schedule/daily-schedule.component';

export interface Iprescription {
    DoctorName: string;
    VisitDate: {seconds:number; nanoseconds:number;};
    nextVisit: {seconds:number; nanoseconds:number;};
    imageName: string;
    docID:string;
}

export interface Iprescription_input {
    DoctorName:string | null;
    VisitDate: Date | null;
    nextVisit: Date | null;
    imageName: string | null;
}


export interface IMedicine {
    MedicineName: string;
    StartDate: {seconds:number; nanoseconds:number;};
    EndDate: {seconds:number; nanoseconds:number;};
    MedicineDetail:string | null;
    instructions:string |null;
    prescriptionID: string;
    docID:string;
    Schedule:{
        Time1:string | null;
        Time2:string | null;
        Time3:string | null;
        Time4:string | null;
        Time5:string | null;
    }
}

export interface IMedicine_input {
    MedicineName:string | null;
    StartDate: Date | null;
    EndDate: Date | null;
    MedicineDetail:string | null;
    instructions:string |null;
    prescriptionID: string | null;
    Schedule:{
        Time1:string | null;
        Time2:string | null;
        Time3:string | null;
        Time4:string | null;
        Time5:string | null;
    }
}

export interface ISchedule{
    StartDate: {seconds:number; nanoseconds:number;};
    EndDate: {seconds:number; nanoseconds:number;};
    Name:string | null;
    docID:string,
    Schedule:{
        Time1:string | null;
        Time2:string | null;
        Time3:string | null;
        Time4:string | null;
        Time5:string | null;
    };
    Instruction:string | null;
    refremce:{
        uri1:string | null;
        uri2:string | null;
        uri3:string | null;
        uri4:string | null;
    }

}

export interface ISchedule_Input{
    StartDate: Date | null;
    EndDate: Date | null;
    Name:string | null;
    Schedule:{
        Time1:string | null;
        Time2:string | null;
        Time3:string | null;
        Time4:string | null;
        Time5:string | null;
    };
    Instruction:string | null;
    refremce:{
        uri1:string | null;
        uri2:string | null;
        uri3:string | null;
        uri4:string | null;
    }
}

export interface IdailySchedule{
    date:Date ;
    details: string[];
    docID:string;
    instructions:string | null;
    name:string | null;
    status:boolean | null;
    type:string | null;
}

export interface IscheduleStatusArray{
    docID:string;
    status:boolean | null;
}
export interface IscheduleStatus{
    date:string;
    status:IscheduleStatusArray[];
    docID:string | null;
}

export interface IscheduleStatus_input{
    date:string;
    status:IscheduleStatusArray[];
}