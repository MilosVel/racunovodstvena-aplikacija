// import { Navigate, Outlet } from 'react-router';

// import { appRoutes } from '@/app/routes/config/app-routes';
// import { useTokenData } from '@/store';

// export function WithRoutePolicyGuard({
//   isPolicyValid,
// }: {
//   isPolicyValid: boolean | undefined;
// }) {
//   const { isSuperAdmin } = useTokenData();

//   if (isSuperAdmin || isPolicyValid) {
//     return <Outlet />;
//   }

//   if (typeof isPolicyValid === 'undefined' || !isPolicyValid) {
//     return <Navigate to={appRoutes.main.welcome} replace />;
//   }
// }
