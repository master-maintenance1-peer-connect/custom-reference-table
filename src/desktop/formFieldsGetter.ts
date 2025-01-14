// import {Connection, App} from '@kintone/kintone-js-sdk';
// const kintoneApp = new App(new Connection);
import type { Revision, Properties } from "@kintone/rest-api-client/lib/client/types";
import { KintoneRestAPIClient } from '@kintone/rest-api-client';
import type { IReferenceTable } from "../../type/ReferenceTable";

const kintoneRestAPIClient = new KintoneRestAPIClient();

export default class formFieldsGetter {
  static getFromAllReferenceTables(referenceTables: IReferenceTable[]): Promise<{ properties: Properties, revision: Revision }[]> {
    return Promise.all(referenceTables.map(this.getFromSingleReferenceTable));
  }
  static getFromSingleReferenceTable(referenceTable: IReferenceTable) {
    return kintoneRestAPIClient.app.getFormFields({
      app: referenceTable.app
    });
  }
}