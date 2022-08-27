export interface IPatient {
    docID:string;
    FirstName: string;
    LastName: string;
    Gender: string;
    Mobile:string;
    Address:string;
    DateOfBirth: {seconds:number; nanoseconds:number;};
    height:number | null;
}

export interface IPatient_input {
    FirstName: string;
    LastName: string;
    Gender: string | null;
    Mobile:string;
    Address:string;
    DateOfBirth: Date | null;
    height:number | null;
}

export interface IDoctor{
    docID:string; 
    FirstName:string;
    LastName:string;
    Mobile:string;
    Department:string;
    Address:string;
    MapLocation:string;
}

export interface IApointment{
    docID:string;	 
    PatientID:string;	 
    DoctorID:string;	 
    DateOfApointment:{seconds:number; nanoseconds:number;}	  
}

export interface IVisits{
    docID:string;	 	 
    ApointmentID:string;	 
    DateofVisit:{seconds:number; nanoseconds:number;}	 
    Symptoms:string;	 
    Analysis:string;	 
    PrescreptionImage:string;	 
    FollowUpDate:{seconds:number; nanoseconds:number;}	 
    DoctorID:string;	          
}


export interface IPrescription{
    docID:string;	 
    visitID:string;	 
    MedicineName:string;	 
    MedicineType:string;	 
    Quantity:number;	 
    Days:string;	 
    Time:string;	 
    StartDate:{seconds:number; nanoseconds:number;}	 
    Instructions:string;	 
    MedicineDescURL:string;	 
}

export interface ITestResults{
    docID:string;	 
    visitID:string;	 
    DoctorID:string;	 
    TestName:string;	 
    TestType:string;	 
    TestResultImage:string;	 
    TestResultSummary:string;	 
    PatientID:string;	
}

export interface IDiet{
    docID:string;	 
    DoctorID:string;	 
    Time:string;	 
    Description:string;	 
    Instructions:string;	 
    DiteName:string;	 
    StartDate:{seconds:number; nanoseconds:number;}	 
    EndDate:{seconds:number; nanoseconds:number;}	 
}

export interface IActivity{
    docID:string;	 
    ActivityType:string;	 
    ActivityName:string;	 
    Description:string;	 
    Time:string;	 
    StartDate:{seconds:number; nanoseconds:number;}	 
    EndDate:{seconds:number; nanoseconds:number;}	 
}

export interface IPatientUserMap {
    docID:string;
    PatientID: string;
    Name: string;
    UserId:string;
}