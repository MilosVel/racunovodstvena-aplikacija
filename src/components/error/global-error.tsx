// import { type FallbackProps } from 'react-error-boundary';

// import { Button } from '@/components/ui/button';
// import { checkIsNetworkError } from '@/utils/handle-error';

// export function GlobalError({ error, resetErrorBoundary }: FallbackProps) {
//   const isNetworkError = checkIsNetworkError(error);

//   return (
//     <div className="flex flex-col items-center justify-center h-screen">
//       <h1 className="text-xl font-bold mb-2 font-lexend">
//         {isNetworkError ? 'Server Connection Error' : 'Something went wrong'}
//       </h1>
//       <p className="text-foreground mb-4">
//         {isNetworkError
//           ? 'Unable to connect to the server.'
//           : 'An unexpected error occurred in the application.'}
//       </p>
//       <Button onClick={resetErrorBoundary}>Retry</Button>
//     </div>
//   );
// }
