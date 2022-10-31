const NOT_FOUND_ERROR = (message?: string) => {
  return {
    statusCode: 404,
    body: JSON.stringify({
      message: message ?? 'Not found',
    })
  }
};

export default NOT_FOUND_ERROR;