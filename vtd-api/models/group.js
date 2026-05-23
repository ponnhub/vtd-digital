const luxon = require('luxon');
const DateTime = luxon.DateTime;

class Group {

    constructor({
            groupId,
            groupName = "",
            pictureUrl
        }) {
        this.groupId = groupId,
        this.groupName = groupName
        this.pictureUrl = pictureUrl || "assets/images/person-icon.png"

    }

    toSql() {
        return {
            groupId: this.groupId,
            groupName: this.groupName,
            pictureUrl: this.pictureUrl
          }          
    }

    selectedSqlFields() {
        
        let {
            groupId
        } = this

        return {
            groupId,
            modified: DateTime.utc().toFormat('yyyy-MM-d hh:mm:ss')
        }
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

module.exports = Group