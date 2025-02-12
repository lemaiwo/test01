using {
    managed,
    Currency,
    temporal,
    Country,
    extensible,
    sap.common.CodeList
} from '@sap/cds/common';

using {
    GUID,
    Sequence,
    Connection,
} from './commonTypes';

using {
    function,
    field,
} from './commonAspects';


entity ModelTables : managed, function {
    key ID            : GUID                               @Common.Text : function.description  @Common.TextArrangement : #TextOnly;
        type          : Association to one ModelTableTypes @title       : 'Type';
        transportData : TransportData default false;
        connection    : Connection;
        fields        : Composition of many ModelTableFields
                            on fields.modelTable = $self;
}


entity ModelTableFields : managed, field {
    key ID         : GUID;
        modelTable : Association to one ModelTables;
        sourceField: SourceField;
}

type ModelTableType @(assert.range) : String(10) enum {
    Environment = 'ENV';
    HANA        = 'HANA';
    OData       = 'ODATA';
}

entity ModelTableTypes : CodeList {
    key code : ModelTableType default 'ENV';
}

type TransportData : Boolean @title : 'Transport Data';
type SourceField : String @title : 'Source field';

