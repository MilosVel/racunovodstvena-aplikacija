// import {
//   AppLinkItem,
//   initialSidebarLinks,
// } from '@/app/routes/config/navigation-links';
// import { useTokenData } from '@/store';
// import { usePermissionsData } from '@/store/permissions/permissions-store';
// import { groupBy } from '@/utils/common';

// export function useSidebar() {
//   const { permissions } = usePermissionsData();
//   const { isSuperAdmin } = useTokenData();

//   const filteredRoutes = initialSidebarLinks.reduce(
//     (initialValue: AppLinkItem[], currentValue) => {
//       const isPolicyFound = currentValue.checkPolicy(permissions);
//       if (isSuperAdmin || isPolicyFound) initialValue.push(currentValue);

//       return initialValue;
//     },
//     [],
//   );

//   const sidebarAppLinks = groupBy(filteredRoutes, 'group');

//   return { sidebarAppLinks };
// }
