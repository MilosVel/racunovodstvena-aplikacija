

    export interface IzvrsenjeGrouped  {
        jbkjs: string
        konto: string;
        ukupno: number;
        [izvor: string]: string | number;
    };

    export interface PlanGrouped {
        konto: string;
        plan: number;
    };

    export interface MergedRow {
        konto: string;
        ukupno: number;
        plan: number;
        [izvor: string]: string | number | undefined;
    };

    export interface GroupAndMergeResult {
        planIIzvrsenje: MergedRow[];
        header: string[];
    };
