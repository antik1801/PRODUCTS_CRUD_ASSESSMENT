
export type TUser = {
    id: string;
    password: string;
    needsPasswordChange: boolean; // setting true by default
    role: 'student' | 'admin' | 'faculty';
    status: 'in-progress' | 'blocked'; // setting 'in-progress' by default
    isDeleted: boolean; // setting true by default
}

// We don't need to make TNewuser because we can Partial<TUser> and reuse TUser pertial values to define type

// export type TNewUser ={
//     password: string;
//     role: string;
//     id: string;
// }