const DEFAULT_ERROR = (message?: string) => {
  return {
    statusCode: 500,
    body: JSON.stringify({
      message: message ?? 'Server error',
    })
  }
};

export default DEFAULT_ERROR;