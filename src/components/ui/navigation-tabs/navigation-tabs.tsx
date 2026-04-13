// import { NavLink } from 'react-router';

// import { cn } from '@/utils/theme';

// type NavigationTab = {
//   link: string;
//   name: string;
// };

// type NavigationTabsProps = {
//   tabs: NavigationTab[];
//   getTabPath: (tab: NavigationTab) => string;
//   className?: string;
// };

// export function NavigationTabs({
//   tabs,
//   getTabPath,
//   className,
// }: NavigationTabsProps) {
//   return (
//     <nav
//       className={cn(
//         'border-b border-muted bg-popover dark:bg-sidebar-background/15 px-4 py-0 font-medium sm:-mt-2 md:px-5 lg:mt-0 lg:px-8 xl:px-6',
//         className,
//       )}
//     >
//       <div className="relative flex items-center overflow-hidden">
//         <div className="flex h-[52px] items-start overflow-hidden">
//           <div className="-mb-7 flex w-full gap-3 overflow-x-auto pb-7 md:gap-5 lg:gap-8 scroll-smooth">
//             {tabs.map((tab, index) => (
//               <NavLink
//                 to={getTabPath(tab)}
//                 key={`menu-${index}`}
//                 className={({ isActive }) =>
//                   cn(
//                     'group relative cursor-pointer whitespace-nowrap py-2.5 font-medium before:absolute before:bottom-0 before:left-0 before:z-[1] before:h-0.5 before:bg-primary before:transition-all hover:text-foreground',
//                     {
//                       'before:visible before:w-full before:opacity-100':
//                         isActive,
//                       'before:invisible before:w-0 before:opacity-0': !isActive,
//                     },
//                   )
//                 }
//               >
//                 <p className="inline-flex rounded-md px-2.5 py-1.5 transition-all duration-200 group-hover:bg-accent/50">
//                   {tab.name}
//                 </p>
//               </NavLink>
//             ))}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }
