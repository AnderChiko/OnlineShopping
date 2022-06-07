import DateHelper from './date-helper';

export default class MappingHelper{
    static mapProperties<T>(data: T): any {
        const mappedData = { data: Object.assign({}, data) };
        Object.assign(mappedData, data);
        Object.entries(mappedData).forEach((key, value) => {
            if (key[1] instanceof Date) {
                const formattedDate = DateHelper.dateFormatUTCJsonCompatible(key[1]);
                Object.assign(mappedData[key[0]], formattedDate);
            }
            else{
                mappedData[key[0]] = key[1];
            }
        });

        return mappedData;
    }
}
