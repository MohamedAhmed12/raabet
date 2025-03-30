export const ForgetPasswordTemplate = ({
  user,
  token,
}: {
  user: string;
  token: string;
}) => `<div style="background-color: #e3f2fd; padding: 40px;font-family: Arial, sans-serif;">
  <div style="text-align: center">
    <img
      src="https://your-logo-url.com/logo.png"
      alt="Liinks Logo"
      width="50"
      style="margin-bottom: 15px"
    />
  </div>
  <div
    style="
      max-width: 500px;
      background: #fff;
      padding: 30px;
      border-radius: 8px;
      margin: auto;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    "
  >
    <h5 style="color: #666">Hi ${user}!</h5>
    <p style="font-size: 16px; color: #333">
      We've received a request to reset your password.
    </p>

    <p style="margin-top: 15px; color: #666">
      If you didn't make this request, just ignore this message. Otherwise you
      can reset your password using the button below.
    </p>

    <div style="text-align: center; margin-top: 20px">
      <a
        href="${process.env.BASE_URL}/auth/resetPassword?token=${token}"
        style="
          display: inline-block;
          background-color: #0d6efd;
          color: #ffffff;
          text-decoration: none;
          font-size: 18px;
          padding: 12px 24px;
          border-radius: 5px;
          font-weight: bold;
          border: none;
          cursor: pointer;
          transition: background 0.3s ease-in-out;
        "
      >
        Reset Your Password
      </a>
    </div>
  </div>

  <div
    style="margin-top: 20px; font-size: 12px; color: #888; text-align: center"
  >
    <img
      src="https://your-logo-url.com/logo.png"
      alt="Liinks Logo"
      width="30"
    />
    <p>© Liinks - All Rights Reserved</p>
    <p>Charlie Clark, 335 Carroll St #5F, 11231, NY, USA</p>
    <p>
      <a
        href="https://yourwebsite.com/faq"
        style="color: #0d47a1; text-decoration: none"
        >FAQ</a
      >
      |
      <a
        href="https://yourwebsite.com/contact"
        style="color: #0d47a1; text-decoration: none"
        >Contact Us</a
      >
    </p>
  </div>
</div>

`;
