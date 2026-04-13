// import companyPlaceholder from '@/assets/placeholder.webp';
// import profileSilhouette from '@/assets/profile-silhouette.webp';
// import { cn } from '@/utils/theme';

// type AvatarProps = {
//   photo: string;
//   placeholderFallback?: 'user' | 'company';
//   className?: string;
//   alt?: string;
// };

// export function Avatar({
//   photo,
//   placeholderFallback = 'user',
//   className,
//   alt,
// }: AvatarProps) {
//   const fallbackPhoto =
//     placeholderFallback === 'company' ? companyPlaceholder : profileSilhouette;

//   return (
//     <img
//       alt={alt || 'avatar'}
//       src={photo || fallbackPhoto}
//       loading="lazy"
//       className={cn(
//         'object-cover rounded-md bg-white shadow backdrop-blur-md relative flex size-10 shrink-0 overflow-hidden',
//         className,
//       )}
//       onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
//         e.currentTarget.onerror = null;
//         e.currentTarget.src = fallbackPhoto;
//       }}
//     />
//   );
// }
