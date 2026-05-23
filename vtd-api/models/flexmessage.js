import { DateTime } from "luxon"

class FlexMessae {
    constructor({
            message,
            creator,
            creatorId,
            created,
            alltexts='',
            sharedCounts=0
        }) {

        this.message = message
        this.creator = creator
        this.creatorId = creatorId
        this.created = created
        this.alltexts = alltexts
        this.sharedCounts = sharedCounts

    }


    toSql() {
        return {
            message: this.message,
            creator: this.creator,
            creatorId: this.creatorId,
            created : this.created || DateTime.utc().toFormat('yyyy-MM-d hh:mm:ss'),
            sharedCounts: this.sharedCounts,
            alltexts:  this.alltexts
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