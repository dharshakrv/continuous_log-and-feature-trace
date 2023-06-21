export enum FeatureQueryType {
    CREATE = 'CREATE',
    DELETE = 'DELETE',
    UPDATE = 'UPDATE',
    UPSERT = 'UPSERT',
    SELECT = 'SELECT',
    SELECTONE = 'SELECTONE',
    DISTINCT = 'DISTINCT',
    COUNT = 'COUNT',
    SUM = 'SUM',
    AVG = 'AVG',
    MIN = 'MIN',
    MAX = 'MAX',
    AGGREGATE = 'AGGREGATE'
}

export enum FeatureType {
    NORMAL = 'NORMAL',
    CONDITIONAL = 'CONDITIONAL',
    ITERATIVE = 'ITERATIVE',
    EXTERNAL_API_CALL = 'EXTERNAL_API_CALL',
    HLF_CC_FUNCTION = 'HLF_CC_FUNCTION'
}