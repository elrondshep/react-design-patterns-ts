const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?]).{8,}$/
export const validateEmail = (email: string): boolean => {
  if (email.trim().length === 0) {
    return false
  } else if (!emailRegex.test(email)) {
    return false
  } else {
    return true
  }
}
export const validatePhone = (phone: string): boolean => {
  if (phone.trim().length === 0) {
    return false
  } else if (phone.replace(/\D/g, '').trim().length < 10) {
    return false
  } else {
    return true
  }
}
export const validateFieldLength = (fieldValue: string): boolean => {
  if (fieldValue.trim().length === 0) {
    return false
  } else {
    return true
  }
}
export const validatePasswordReqs = (password: string): boolean => {
  if (passwordRegex.test(password)) {
    return true
  } else {
    return false
  }
}
export const compareFieldValues = (valueOne: string, valueTwo: string): boolean => {
  if (valueOne.trim() === valueTwo.trim()) {
    return true
  } else {
    return false
  }
}
export default {
  validateEmail,
  validatePhone,
  validateFieldLength,
  validatePasswordReqs,
  compareFieldValues,
}
