import { Types } from "mongoose"

export type TStatus = 'UPCOMING' | 'ONGOING' | 'ENDED'

export type TSemesterRegistration = {
    academicSemester: Types.ObjectId;
    status: TStatus;
    startDate: string;
    endDate: string;
    minCredit: number;
    maxCredit: number;
}