export class FeatureSpec {
    featureCode!: string;
    featureName!: string;
    preChecks?: PreCheckSpec[];
    typeOfQuery!: string;
    dataObjectCode!: string;
    dataObjectName!: string;
    requestObjectCode?: string;
    requestObjectName?: string;
    requestMethod!: string;
    attributeKeys?: string;
    staticParamters?: string;
    featureType!: string;
    featureCondition?: string;
    trueFeature?: FeatureSpec;
    falseFeature?: FeatureSpec;
    orchestration?: OrchestrationSpec;
}

export class PreCheckSpec {
    feature!: FeatureSpec;
    expected!: string;
    errorMessage!: string;
}

export class OrchestrationSpec {
    dataObjectCode!: string;
    dataObjectName!: string;
    objectAction!: string;
    sourceCondition?: string;
    requestCondition?: string;
    actions!: OrchestrationActionSpec;
}

export class OrchestrationActionSpec {
    environment!: string;
    feature!: FeatureSpec;
    payload!: string;
}