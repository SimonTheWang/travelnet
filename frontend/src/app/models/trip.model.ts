import { selectedVenueModel } from './selectedVenue.model';
import { venueModel } from 'src/app/models/venue.model';
import * as moment from 'moment'

export class tripModel {
    tripName: String
    dateRange: {
        [key: string]: any
        start: Date
        end: Date
        length: Number
    }
    schedule?: Array<{
        day?: Date,
        venues: Array<{
            hour?: any
            name: String
            venueCity?: String
            venueAddress?: String
            price?: Number
            url? : URL
        } | venueModel | selectedVenueModel>
    }>
    isPrivate: boolean

    constructor(start: Date, end: Date, name: string, isPrivate?: boolean) {
        let final = moment(end)
       
        this.tripName = name
        this.dateRange = {
            start: start,
            end: end,
            length: final.diff(start, 'days') + 1
        }
        this.schedule = []
        for (let x = 0; x < this.dateRange.length; x++) {
            this.schedule.push({
                day: moment(start).add(x, 'days').toDate(),
                venues: []
            })
        }
        this.isPrivate = isPrivate? isPrivate : false
    }
}