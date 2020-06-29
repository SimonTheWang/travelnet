import { tripModel } from './../components/tabs/mytrip/trip.model';
export class userModel {
    email: String
    username: String
    password: String
    firstname: String
    lastname: String
    birthdate: Date
    gender: String
    profilepicture: String
    encounters: Array<string>
    rooms:  Array<any>
    socketIds: Array<any>
    isActive:  Boolean
    log: { 
        in: Array<any>,
        out: Array<any>
    }
    trips: Array<tripModel>
}