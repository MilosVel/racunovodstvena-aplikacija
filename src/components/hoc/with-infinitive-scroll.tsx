// import { useInView } from 'react-intersection-observer';

// interface WithInfinitiveScrollProps {
//   children: React.ReactNode;
//   onBottomReached: VoidFunction;
//   className?: string;
// }

// export function WithInfinitiveScroll({
//   children,
//   onBottomReached,
//   className,
// }: WithInfinitiveScrollProps) {
//   const { ref } = useInView({
//     rootMargin: '50px',
//     onChange(inView) {
//       if (inView) {
//         onBottomReached();
//       }
//     },
//   });

//   return (
//     <div className={className}>
//       {children}
//       <div ref={ref} className="h-4" />
//     </div>
//   );
// }
