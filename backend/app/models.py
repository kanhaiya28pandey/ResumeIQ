from pydantic import BaseModel, EmailStr


# what the client sends when signing up
class SignupRequest(BaseModel):
    name: str
    email: EmailStr
    password: str


# what the client sends when logging in
class LoginRequest(BaseModel):
    email: EmailStr
    password: str


# step 1 of forgot password - just need the email to send OTP to
class ForgotPasswordRequest(BaseModel):
    email: EmailStr


# step 2 - user submits the OTP they got in their email
class VerifyOtpRequest(BaseModel):
    email: EmailStr
    otp: str


# step 3 - user sets a new password using the reset token they got from step 2
class ResetPasswordRequest(BaseModel):
    resetToken: str
    newPassword: str
