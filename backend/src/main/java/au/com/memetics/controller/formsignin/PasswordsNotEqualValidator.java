package au.com.memetics.controller.formsignin;


import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class PasswordsNotEqualValidator implements ConstraintValidator<PasswordsNotEqual, Object> {
    private String passwordFieldName;
    private String passwordVerificationFieldName;

    @Override
    public void initialize(final PasswordsNotEqual constraintAnnotation) {
        this.passwordFieldName = constraintAnnotation.passwordFieldName();
        this.passwordVerificationFieldName = constraintAnnotation.passwordVerificationFieldName();
    }

    @Override
    public boolean isValid(final Object value, final ConstraintValidatorContext context) {
        context.disableDefaultConstraintViolation();
        try {
            String password = (String) ValidatorUtil.getFieldValue(value, passwordFieldName);
            String passwordVerification = (String) ValidatorUtil.getFieldValue(value, passwordVerificationFieldName);

            if (passwordsAreNotEqual(password, passwordVerification)) {
                ValidatorUtil.addValidationError(passwordFieldName, context);
                ValidatorUtil.addValidationError(passwordVerificationFieldName, context);

                return false;
            }
        } catch (Exception ex) {
            throw new RuntimeException("Exception occurred during validation", ex);
        }

        return true;
    }

    private boolean passwordsAreNotEqual(final String password, final String passwordVerification) {
        if (password == null) return !(passwordVerification == null);
        else return !password.equals(passwordVerification);
    }
}
