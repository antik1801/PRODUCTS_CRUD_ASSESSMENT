import QueryBuilder from "../../builder/QueryBuilder";
import { studentSearchableFields } from "./student.const";
import { TStudent } from "./student.interface";
import { Student } from "./student.model";


const getAllStudentsFromDB = async (query: Record<string,unknown>) =>{
  

  const studentQuery = new QueryBuilder(
    Student.find().populate('admissionSemester').populate('user').populate({
      path: 'academicDepartment',
      populate:{
        path: 'academicFaculty'
      }
      }),
      query
    )
    .search(studentSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()
  
    const result = await studentQuery.modelQuery;
    return result;
 
}

const deleteStudentFromDB = async (id: string) =>{
  const result = await Student.updateOne({id}, {isDeleted: true})
  return result;
}

const getSingleStudentFromDB = async (id: string) =>{

   // findOn normal method 
  // const result = await Student.findOne({id: id});

  // findOne --> aggregation method
  const result = await Student.aggregate([{$match : {id}}]);
  return result;
}

const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) =>{
  const result = await Student.findOneAndUpdate({_id: id}, payload);
  return result;
}

export const StudentServices = {
  getAllStudentsFromDB,
  deleteStudentFromDB,
  getSingleStudentFromDB,
  updateStudentIntoDB
};
