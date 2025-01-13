import { academicSemesterNameCodeMapper } from "./academicSemester.constant";
import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  if (academicSemesterNameCodeMapper[payload.name] != payload.code) {
    throw new Error("Academic Semester code is not correct!");
  }

  const result = await AcademicSemester.create(payload);
  return result;
};

// const updateAcademicSemesterValidationSchema = async (id: string, payload: Partial<TAcademicSemester>) =>{

// }


const getAllAcademicSemesterFromDB = async () =>{
   
    const result = await AcademicSemester.find();
    return result;
}

const getSingleAcademicSemesterFromDB = async (id: string) =>{
    const result = await AcademicSemester.findById(id);
    return result;
}

const updateSingleAcademicSemesterFromDB = async (id: string , payload: Partial<TAcademicSemester>) =>{
    if(payload.name && payload.code && academicSemesterNameCodeMapper[payload.name] != payload.code)
    {
        throw new Error("Invalid semester code");
    }
    const result = await AcademicSemester.findOneAndUpdate({_id: id}, payload, {
        new: true,
    })
    return result;
}

const deleteSingleAcademicSemesterFromDB = async(id: string) =>{
    const result = await AcademicSemester.findOneAndUpdate({_id: id}, {isDeleted: true})
    return result;
}


export const academicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemesterFromDB,
  getSingleAcademicSemesterFromDB,
  updateSingleAcademicSemesterFromDB,
  deleteSingleAcademicSemesterFromDB
};
