import { KintoneRestAPIClient } from '@kintone/rest-api-client';
const kintoneRestAPIClient = new KintoneRestAPIClient();
export default class appGetter {
    static getFromAllReferenceTables(referenceTables) {
        return Promise.all(referenceTables.map(this.getFromSingleReferenceTable));
    }
    static getFromSingleReferenceTable(referenceTable) {
        return kintoneRestAPIClient.app.getApp({
            id: referenceTable.app
        });
    }
}
