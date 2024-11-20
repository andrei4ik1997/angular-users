import type { UserDTO } from '@shared-models';
import type { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';

type TableColumnsNames = keyof (Omit<UserDTO, 'address' | 'id'> & Pick<UserDTO['address'], 'city'>) | 'Action';

export type TableColumnConfig = {
	actionFn?(event: MouseEvent, data: UserDTO): void;
	additionalDataProperty?: keyof (UserDTO['address'] & UserDTO['company']);
	cellAlign?: 'center' | 'left' | 'right';
	dataProperty: keyof UserDTO | null;
	filterFn?: NzTableFilterFn<UserDTO> | null;
	filterMultiple?: boolean;
	icon?: string;
	isCustomFilter?: boolean;
	listOfFilter?: NzTableFilterList;
	name: Capitalize<TableColumnsNames>;
	showSort?: boolean;
	sortDirections?: NzTableSortOrder[];
	sortFn?: NzTableSortFn<UserDTO>;
	sortOrder?: NzTableSortOrder;
	sortPriority?: number | false;
	text?: string;
	type?: 'button' | 'text';
	width?: string;
};
