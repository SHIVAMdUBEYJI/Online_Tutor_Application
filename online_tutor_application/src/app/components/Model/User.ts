
import { Course } from './Course';

export type User = {
    email?: String |null
    password?: String | null;
    firstName?: String | null;
    lastName?: String | null;
    phoneNo?: String | null;
    qualification?: String | null;
    role?: String | null;
    appliedCourses?:Course[];
};
