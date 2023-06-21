export class ExcelInputConfig {
    /**
     * Used to differentiate records based on this key value
     */
    uniqueKey: string = '';
    /**
     * Used to assign the values of nested object to this key
     */
    objectKey: string = '';
    /**
     * Fields that needs to be required in that level
     */
    fieldKeys: string[] = [];

    /**
     * Nested objects for the current object
     */
    subSet: ExcelInputConfig[] = [];
}