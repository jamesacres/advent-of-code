export const isValid = (productId: string) => {
  if (productId.startsWith("0")) {
    return false;
  }
  if (productId.length % 2 === 0) {
    const a = productId.slice(0, productId.length / 2);
    const b = productId.slice(productId.length / 2);
    return a !== b;
  }
  return true;
};
