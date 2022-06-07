export default class DateHelper{
    // UTC time in JSON format, otherwise JSON.stringify does not convert date correctly
    static dateFormatUTCJsonCompatible(property: Date): any {
         const formattedDate = new Date(property.getTime() - (property.getTimezoneOffset() * 60000));
         return formattedDate;
    }
}
