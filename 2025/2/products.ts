export const isValid = (productId: string, version: number) => {
  if (productId.startsWith("0")) {
    return false;
  }
  if (version === 1) {
    if (productId.length % 2 === 0) {
      const a = productId.slice(0, productId.length / 2);
      const b = productId.slice(productId.length / 2);
      return a !== b;
    }
    return true;
  }
  return !/^(\d+)\1{1,}$/.test(productId);
};
