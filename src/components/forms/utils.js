export const addErrorIntoField = (errors) => errors ? { error: true } : { error: false };
export const phoneNumberPattern =/^9\d{9}$/;
export const positiveIntegerPattern = /^\d+$/;
export const pawdRegExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;


