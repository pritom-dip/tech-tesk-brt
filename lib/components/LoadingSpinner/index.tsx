const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div
        data-testid="loading"
        className="w-16 h-16 border-4 border-blue-500 border-dotted rounded-full animate-spin"
      ></div>
    </div>
  )
}

export default LoadingSpinner
