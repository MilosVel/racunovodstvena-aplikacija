// import { useEffect } from 'react';
// import { useNavigate } from 'react-router';

// import { appRoutes } from '@/app/routes/config/app-routes';
// import { AppLogo } from '@/components/theme/app-logo';
// import { AppLink } from '@/components/ui/link';
// import { useAuthData } from '@/store';

// export function AuthLayout({
//   children,
//   title,
// }: {
//   children: React.ReactNode;
//   title?: string;
// }) {
//   const navigate = useNavigate();
//   const { agentId } = useAuthData();

//   useEffect(() => {
//     if (agentId) {
//       navigate(appRoutes.main.welcome, {
//         replace: true,
//       });
//     }
//   }, [agentId, navigate]);

//   return (
//     <div className="flex min-h-screen flex-col justify-center py-12">
//       <div className="sm:mx-auto sm:w-full sm:max-w-xl">
//         <div
//           className="flex flex-col gap-y-8 bg-card px-10 py-16 shadow sm:rounded-sm lg:px-24 dark:shadow-md
//         dark:bg-sidebar-background/15"
//         >
//           <AppLink
//             className="flex items-center justify-center"
//             to={appRoutes.auth.signin}
//           >
//             <AppLogo />
//           </AppLink>
//           <h2 className="whitespace-pre-line text-center text-2xl">{title}</h2>
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// }
