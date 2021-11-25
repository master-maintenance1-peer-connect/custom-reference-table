// @ts-ignore
import React from 'react';
import { Table, Dropdown } from '@kintone/kintone-ui-component';
import fieldsFilter from './fieldsFilter';
import selectItemManager from './selectItemManager';
import conditionOperatorsManager from './conditionOperatorsManager';
// @ts-ignore
import { DispatchParams } from "@kintone/kintone-ui-component/esm/react/Table";
import {OneOf} from "@kintone/rest-api-client/lib/KintoneFields/types/property";


interface IConditionsCellProp {
  value: { targetField: string, operator: string, selfField: string }[],
  targetFields: OneOf[] | null,
  selfFields: OneOf[],
  onChange: (newState: DispatchParams) => void,
}

const ConditionsCell = (props: IConditionsCellProp) => {
  const value = props.value || [{}];
  const columns = [{
    header: 'target field',
    cell: ({ rowIndex, onCellChange }: DispatchParams) =>
      <Dropdown
        items={selectItemManager.createItemsForFields(fieldsFilter.conditionTarget(props.targetFields))}
        value={selectItemManager.getValueForFields(fieldsFilter.conditionTarget(props.targetFields), value[rowIndex].targetField)}
        onChange={newValue => onCellChange(newValue, value, rowIndex, 'targetField')}
      />
  }, {
    header: 'operator',
    cell: ({ rowIndex, onCellChange }: DispatchParams) =>
      <Dropdown
        items={selectItemManager.createItems(conditionOperatorsManager.get(props.targetFields, value, rowIndex))}
        value={selectItemManager.getValue({ unFormattedItems: conditionOperatorsManager.get(props.targetFields, value, rowIndex), value: value[rowIndex].operator })}
        onChange={newValue => onCellChange(newValue, value, rowIndex, 'operator')}
      />
  }, {
    header: 'self field',
    cell: ({ rowIndex, onCellChange }: DispatchParams) =>
      <Dropdown
        items={selectItemManager.createItemsForFields(fieldsFilter.conditionSelf(props.selfFields))}
        value={selectItemManager.getValueForFields(fieldsFilter.conditionSelf(props.selfFields), value[rowIndex].selfField)}
        onChange={newValue => onCellChange(newValue, value, rowIndex, 'selfField')}
      />
  }];
  return (
    <Table
      columns={columns}
      data={value}
      defaultRowData={{}}
      onRowAdd={({ data }) => props.onChange(data)}
      onRowRemove={({ data }) => props.onChange(data)}
      onCellChange={({ data }) => props.onChange(data)}
    />
  );
};
export default ConditionsCell;
