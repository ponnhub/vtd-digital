const luxon = require('luxon');
const DateTime = luxon.DateTime;


class User {

    constructor({
            userId,
            displayName = "",
            pictureUrl,
            groupId = "",
            lastLoggedIn = JSON.stringify({})
        }) {
        this.userId = userId,
        this.groupId = groupId,
        this.displayName = displayName
        this.pictureUrl = pictureUrl || "assets/images/person-icon.png",
        this.lastLoggedIn = JSON.stringify(lastLoggedIn)
    }

    toSql() {
        return {
            userId: this.userId,
            displayName: this.displayName,
            pictureUrl: this.pictureUrl,
            groupId : this.groupId,
            lastLoggedIn: this.lastLoggedIn
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

module.exports = User