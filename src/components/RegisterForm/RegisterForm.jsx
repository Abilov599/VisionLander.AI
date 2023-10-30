import { useForm } from "react-hook-form";
import "./RegisterForm.scss";
import { message } from "antd";
import { Button } from "..";

const RegisterForm = ({ signUpAction, logInAction, closeSignUpModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useForm();

  const [messageApi, contextHolder] = message.useMessage();

  const error = (message) => {
    messageApi.open({
      type: "error",
      content: message,
    });
  };

  const success = (message) => {
    messageApi.open({
      type: "success",
      content: message,
    });
  };

  const onSubmit = async (data) => {
    signUpAction(data)
      .then((res) => {
        if (res.status === 404) return error(res.message);
        if (res.status === 200) {
          closeSignUpModal();
          success(res.message);
          return;
        }
      })
      .catch((err) => {
        error("Something went wrong!");
        error(err);
      });
    reset();
  };

  return (
    <>
      {contextHolder}
      <div className="register-form">
        <p className="form-title">Registrate to continue</p>
        <p className="form-text">
          if you do not have an account - choose sign up
        </p>
        <form id="register-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="inputs">
            <div className="input-field">
              <input
                className="email-input"
                type="text"
                placeholder="Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              <p className="error-message">
                {errors.email && errors.email.message}
              </p>
            </div>
            <div className="input-field">
              <input
                className="password-input"
                type="password"
                placeholder="Password"
                {...register("password", { required: "Password is required" })}
              />
              <p className="error-message">
                {errors.password && errors.password.message}
              </p>
            </div>
            <div className="input-field">
              <input
                className="confirm-password-input"
                type="password"
                placeholder="Confirm password"
                {...register("confirmPassword", {
                  required: "Confirm your password",
                  validate: (value) =>
                    value === getValues("password") ||
                    "The passwords do not match",
                })}
              />
              <p className="error-message">
                {errors.confirmPassword && errors.confirmPassword.message}
              </p>
            </div>
            <div className="checkbox-field">
              <div className="checkbox-input">
                <input
                  id="termsCheckbox"
                  name="termsCheckbox"
                  type="checkbox"
                  {...register("termsCheckbox", {
                    required: "Read terms of use and privacy policy",
                  })}
                />
                <label htmlFor="termsCheckbox">
                  I agree to the terms and conditions
                </label>
              </div>
              <p className="error-message">
                {errors.termsCheckbox && errors.termsCheckbox.message}
              </p>
            </div>
          </div>
          <Button
            style={{ width: "100%", padding: "21px 0" }}
            className="btn--primary btn-sign-up"
            type="submit"
            disabled={isSubmitting}
          >
            Sign Up
          </Button>
          <Button
            onClick={logInAction}
            style={{ width: "100%", padding: "21px 0" }}
            className="btn--outline btn-login"
            type="button"
            disabled={isSubmitting}
          >
            Already have an account?
          </Button>
          <Button
            onClick={closeSignUpModal}
            style={{
              width: "100%",
              padding: "21px 0",
              marginTop: "16px",
              fontFamily: "'Bai Jamjuree', sans-serif'",
              fontSize: "20px",
              fontWeight: "700",
              borderRadius: "8px",
              borderWidth: "2px",
            }}
            className="btn--outline"
            disabled={isSubmitting}
          >
            Close
          </Button>
        </form>
        <div className="links">
          <a href="#privacy-policy" target="_blank" className="link">
            Privacy Policy
          </a>
          <a href="/terms-of-use" target="_blank" className="link">
            Terms of Use
          </a>
        </div>
      </div>
    </>
  );
};

export { RegisterForm };
