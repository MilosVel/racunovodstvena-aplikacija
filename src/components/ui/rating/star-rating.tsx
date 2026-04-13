// import { Star } from 'lucide-react';
// import React, { useState } from 'react';

// import { cn } from '@/utils/theme';

// interface StarRatingProps extends React.HTMLAttributes<HTMLDivElement> {
//   rating: number;
//   size?: number;
//   isDisabled?: boolean;
//   isTextVisible?: boolean;
//   onRatingChange?: (rating: number) => void;
// }

// const Icon = <Star strokeWidth={1.5} />;
// const TOTAL_STARS = 5;

// export const StarRating = ({
//   rating: initialRating,
//   size = 20,
//   onRatingChange,
//   isTextVisible = false,
//   isDisabled = false,
//   ...props
// }: StarRatingProps) => {
//   const [hoverRating, setHoverRating] = useState<number | null>(null);
//   const [currentRating, setCurrentRating] = useState(initialRating);

//   const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
//     if (!isDisabled) {
//       const starIndex = parseInt(
//         (event.currentTarget as HTMLDivElement).dataset.starIndex || '0',
//       );
//       setHoverRating(starIndex);
//     }
//   };

//   const handleMouseLeave = () => {
//     setHoverRating(null);
//   };

//   const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
//     if (!isDisabled) {
//       const starIndex = parseInt(
//         (event.currentTarget as HTMLDivElement).dataset.starIndex || '0',
//       );
//       setCurrentRating(starIndex);
//       setHoverRating(null);
//       if (onRatingChange) {
//         onRatingChange(starIndex);
//       }
//     }
//   };

//   const displayRating = isDisabled
//     ? initialRating
//     : (hoverRating ?? currentRating);

//   const fullStars = Math.floor(displayRating);

//   const partialStar =
//     displayRating % 1 > 0 ? (
//       <PartialStar
//         fillPercentage={displayRating % 1}
//         size={size}
//         Icon={Icon}
//         className={cn('text-warning')}
//         onValueChange={() => onRatingChange && onRatingChange(fullStars + 1)}
//         isDisabled={isDisabled}
//       />
//     ) : null;

//   return (
//     <div
//       className={cn('flex w-fit flex-col gap-2', {
//         'pointer-events-none': isDisabled,
//       })}
//       onMouseLeave={handleMouseLeave}
//       {...props}
//     >
//       <div className="flex items-center" onMouseEnter={handleMouseEnter}>
//         {[...Array(fullStars)].map((_, i) =>
//           React.cloneElement(Icon, {
//             key: i,
//             size,
//             className: cn(
//               'fill-current stroke-1',
//               'text-warning',
//               !isDisabled ? 'cursor-pointer' : 'initial',
//             ),
//             onClick: handleClick,
//             onMouseEnter: handleMouseEnter,
//             'data-star-index': i + 1,
//           }),
//         )}
//         {partialStar}
//         {[
//           ...Array(
//             Math.max(0, TOTAL_STARS - fullStars - (partialStar ? 1 : 0)),
//           ),
//         ].map((_, i) =>
//           React.cloneElement(Icon, {
//             key: i + fullStars + 1,
//             size,
//             className: cn(
//               'stroke-1',
//               'text-warning', //empty star
//               !isDisabled ? 'cursor-pointer' : 'initial',
//             ),
//             onClick: handleClick,
//             onMouseEnter: handleMouseEnter,
//             'data-star-index': i + fullStars + 1,
//           }),
//         )}
//       </div>
//       {isTextVisible && (
//         <span className="text-xs text-muted-foreground font-semibold text-center">
//           Current Rating: {currentRating}
//         </span>
//       )}
//     </div>
//   );
// };

// type PartialStarProps = {
//   fillPercentage: number;
//   size: number;
//   className?: string;
//   Icon: React.ReactElement;
//   onValueChange?: VoidFunction;
//   isDisabled?: boolean;
// };

// const PartialStar = ({
//   fillPercentage,
//   size,
//   className,
//   Icon,
//   onValueChange,
//   isDisabled,
// }: PartialStarProps) => {
//   return (
//     <div
//       className={cn('relative inline-block', !isDisabled && 'cursor-pointer')}
//       onClick={() => onValueChange && onValueChange()}
//     >
//       {React.cloneElement(Icon, {
//         size,
//         className: cn('fill-transparent', className),
//       })}
//       <div
//         className="absolute top-0 overflow-hidden"
//         style={{
//           width: `${fillPercentage * 100}%`,
//         }}
//       >
//         {React.cloneElement(Icon, {
//           size,
//           className: cn('fill-current', className),
//         })}
//       </div>
//     </div>
//   );
// };
