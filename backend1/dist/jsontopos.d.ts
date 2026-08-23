declare const indexPaths: {
    readonly all: "./data/processed/positions.idx";
    readonly "under-10": "./data/processed/positions-under-10.idx";
    readonly "10-20": "./data/processed/positions-10-20.idx";
    readonly "20-plus": "./data/processed/positions-20-plus.idx";
};
export type PieceCountFilter = keyof typeof indexPaths;
export declare function getPos(filter?: PieceCountFilter): Promise<any>;
export {};
//# sourceMappingURL=jsontopos.d.ts.map