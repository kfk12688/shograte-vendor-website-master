export const ErrorFallbackComponent = ({ error, componentStack, resetErrorBoundary }) => {
    return (
      <div>
        <h1>An error occurred</h1>
        <button onClick={resetErrorBoundary}>Try again</button>
      </div>
    );
  };