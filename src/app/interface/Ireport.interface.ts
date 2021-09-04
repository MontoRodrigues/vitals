

export interface Ireport {
    docID:string;
    reprtName: string | null;
    imageName: string[] | null;
    description:string | null;
  
    Prescription_ID:string | null;
    date: {seconds:number; nanoseconds:number;}
}

export interface Ireport_input {
    reprtName: string | null;
    imageName: string[] | null;
    description:string | null;
    Prescription_ID:string | null;
    date: Date |null;
}

export interface IFileList{
    name:string,
    file:File,
    imgURL:any | null
}