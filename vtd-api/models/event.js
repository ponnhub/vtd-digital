const luxon = require('luxon');
const DateTime = luxon.DateTime;

const now = DateTime.utc().toFormat('yyyy-MM-d hh:mm:ss')

class Event {
    
    constructor({
            eventId,
            eventName,
            eventDate,
            userId,
            displayName,
            confirmed
        }) {

            this.eventId = eventId
            this.eventName = eventName
            this.eventDate = eventDate
            this.userId = userId
            this.displayName = displayName
            this.confirmed = confirmed
    }

    toSql() {
        return {
            eventId: this.eventId,
            eventName: this.eventName,
            eventDate: this.eventDate,
            userId: this.userId,
            displayName: this.displayName,
            confirmed : this.confirmed,
            modified: now
          }          
    }

    selectedSqlFields() {
        
        let {id, ...others } = this
        return others
    }

    toSqlFields() {
        return Object.keys(this.selectedSqlFields()).join(', ')
    }

    toSqlParamsAll() {
        return Object.entries(this.selectedSqlFields()).map(([key, value]) => `${key}='${value}'`).join(",")
    }

    toSqlValues() {
        return Object.values(this.selectedSqlFields())
    }

    toSqlPlaceholders() {
        return Array(Object.keys(this.selectedSqlFields()).length).fill("?").join(",")
    }
}

module.exports = Event