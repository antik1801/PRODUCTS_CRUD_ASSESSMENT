import { TAcademicSemesterCode, TAcademicSemesterName, TAcademicSemesterNameCodeMapper, TMonth } from "./academicSemester.interface";

export const academicSemesterNames : TAcademicSemesterName[] = ["Autumn", "Fall", "Summer"];
export const months : TMonth[] = ["January", "February","March","April","May","June","July","August","September","October","November","December"];
export const academicSemesterCodes : TAcademicSemesterCode[] = ["01", "02", "03"];

export const academicSemesterNameCodeMapper : TAcademicSemesterNameCodeMapper = {
    Autumn: '01',
    Summer: '02',
    Fall : '03'
}
