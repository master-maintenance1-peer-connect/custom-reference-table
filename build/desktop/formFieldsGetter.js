import { KintoneRestAPIClient } from '@kintone/rest-api-client';
const kintoneRestAPIClient = new KintoneRestAPIClient();
export default class formFieldsGetter {
    static getFromAllReferenceTables(referenceTables) {
        return Promise.all(referenceTables.map(this.getFromSingleReferenceTable));
    }
    static getFromSingleReferenceTable(referenceTable) {
        return kintoneRestAPIClient.app.getFormFields({
            app: referenceTable.app
        });
    }
}