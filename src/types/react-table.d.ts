import '@tanstack/react-table';

import { IOutletMemberPosition } from '@/api/crm/dto/outlet-dto';
import { PermissionMode } from '@/store/permissions/initial-state';

declare module '@tanstack/react-table' {
  interface TableMeta {
    currentAgentId?: number;
    permissions?: PermissionMode;
    outletTimezone?: string;
    outletId?: string;
    customPositionsIds?: Set<number>;
    handleToggleOutletMemberPosition?: (
      position: IOutletMemberPosition,
      memberId: number,
    ) => void;
  }
}

declare module '@tanstack/react-table' {
  interface ColumnMeta {
    headerClassName?: string;
    cellClassName?: string;
  }
}
