// import { useTokenData } from '@/store';

// export function WithContentPolicyGuard({
//   isPolicyValid,
//   children,
// }: {
//   children: React.ReactNode;
//   isPolicyValid: boolean | undefined;
// }) {
//   const { isSuperAdmin } = useTokenData();

//   if (isSuperAdmin || isPolicyValid) {
//     return children;
//   }

//   if (typeof isPolicyValid === 'undefined' || !isPolicyValid) {
//     return null;
//   }
// }
