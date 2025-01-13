/* eslint-disable @typescript-eslint/no-explicit-any */
import QueryBuilder from "../../builder/QueryBuilder"
import { FacultySearchableFields } from "./faculty.constant"
import { TFaculty } from "./faculty.interface"
import { Faculty } from "./faculty.model"


const getAllFacultyFromDB = async (query: Record<string , unknown >) =>{
    const facultyQuery = new QueryBuilder(
        Faculty.find().populate('user').populate({
            path: 'academicDepartment',
            populate:{
                path: 'academicFaculty'
            }
        }),
        query
    ).search(FacultySearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()

    const result = await facultyQuery.modelQuery;
    return result
}
const getSingleFacultyFromDB = async (id: string) =>{
    
    const result = await Faculty.findById(id);
    console.log(result);
    return result;
}

const updateSingleFacultyFromDB = async (id: string, payload: Partial<TFaculty>) =>{
      // Destructure the name field separately
      const { name, ...otherFields } = payload;

      let updateObj: Partial<TFaculty> = { ...otherFields };

      // If name is provided, manually construct the nested update
      if (name) {
          updateObj = {
              ...updateObj,
              "name.firstName": name.firstName,
              "name.middleName": name.middleName,
              "name.lastName": name.lastName
          } as any; // Type assertion to allow the dynamic keys
      }
    const result = await Faculty.findByIdAndUpdate(id, { $set: updateObj }, {
        new: true,
        runValidators: true
    },
)
    return result;
}


const deleteSingleFacultyFromDB = async (id: string) =>{
    const result = await Faculty.findByIdAndUpdate(id, {
        isDeleted: true
    },
    {
        new: true
    }
    )
    return result;
}
export const FacultyServices = {
    getAllFacultyFromDB,
    getSingleFacultyFromDB,
    updateSingleFacultyFromDB,
    deleteSingleFacultyFromDB
}