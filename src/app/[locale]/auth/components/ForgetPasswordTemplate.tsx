export const ForgetPasswordTemplate = ({
  user,
  token,
}: {
  user: string;
  token: string;
}) => `
<div style="background-color: #e3f2fd; padding: 40px 20px; font-family: Arial, sans-serif;">
  <!-- Header -->
  <div style="text-align: center; margin-bottom: 30px;">
    <table border="0" cellspacing="0" cellpadding="0" align="center" style="margin: 0 auto;">
      <tr>
        <td>
          <a href="${process.env.NEXT_PUBLIC_BASE_URL}" style="text-decoration: none;">
            <table border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td style="vertical-align: middle; padding-right: 8px;">
                  <img 
                    src="${process.env.NEXT_PUBLIC_BASE_URL}/svg/mainLogo.svg" 
                    alt="Rabet" 
                    width="21" 
                    height="21"
                    style="display: block;"
                  />
                </td>
                <td style="vertical-align: middle;">
                  <span style="
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: #2a2f2e;
                    text-transform: capitalize;
                    line-height: 1;
                  ">Rabet</span>
                </td>
              </tr>
            </table>
          </a>
        </td>
      </tr>
    </table>
  </div>

  <!-- Email Content -->
  <div style="max-width: 500px; background: #fff; padding: 30px; border-radius: 8px; margin: 0 auto; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
    <h1 style="color: #0d47a1; font-size: 24px; margin: 0 0 20px 0; font-weight: 500;">Hi ${user}!</h1>
    <p style="font-size: 16px; color: #333; margin: 0 0 15px 0;">
      We've received a request to reset your password.
    </p>

    <p style="margin: 15px 0; color: #666; line-height: 1.5;">
      If you didn't make this request, just ignore this message. Otherwise you
      can reset your password using the button below.
    </p>

    <!-- Reset Password Button -->
    <table border="0" cellspacing="0" cellpadding="0" style="margin: 25px auto 0 auto; width: 250px;">
      <tr>
        <td align="center" bgcolor="#0d47a1" style="border-radius: 4px; text-align: center;">
          <a href="${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token}"
            style="
              background-color: #0d47a1;
              border: 1px solid #0d47a1;
              border-radius: 4px;
              color: #ffffff;
              display: block;
              font-size: 16px;
              font-weight: 600;
              padding: 12px 25px;
              text-align: center;
              text-decoration: none;
              mso-padding-alt: 0;
            "
            target="_blank">
            <span style="display: block; padding: 10px 20px;">Reset Password</span>
          </a>
        </td>
      </tr>
    </table>

    <p style="margin: 20px 0 0 0; color: #6b7280; font-size: 14px; text-align: center; line-height: 1.5;">
      This link will expire in 15 minutes for security reasons.
    </p>
  </div>
  
  <!-- Footer -->
  <div style="margin-top: 20px; font-size: 12px; color: #888; text-align: center;">
    <!-- Address -->
    <table border="0" cellspacing="0" cellpadding="0" align="center" style="margin: 0 auto; text-align: center; width: 100%;">
      <tr>
        <td style="text-align: center;">
          <p style="margin: 8px 0; color: #6b7280; font-size: 11px; line-height: 1.5; text-align: center;">
            &copy; Rabet - All Rights Reserved
          </p>
          <p style="margin: 8px 0; color: #6b7280; font-size: 11px; line-height: 1.5; text-align: center;">
            444 Alaska Avenue, Torrance, CA 90503, USA
          </p>
        </td>
      </tr>
    </table>
    
    <!-- Links -->
    <table border="0" cellspacing="0" cellpadding="0" align="center" style="margin: 15px auto 0 auto; text-align: center;">
      <tr>
        <td style="padding: 0 8px; text-align: center;">
          <a href="${process.env.NEXT_PUBLIC_BASE_URL}/terms" style="color: #3b82f6; text-decoration: none; font-size: 12px; white-space: nowrap;">Terms</a>
        </td>
        <td style="color: #d1d5db; padding: 0 2px; text-align: center;">•</td>
        <td style="padding: 0 8px; text-align: center;">
          <a href="${process.env.NEXT_PUBLIC_BASE_URL}/privacy" style="color: #3b82f6; text-decoration: none; font-size: 12px; white-space: nowrap;">Privacy</a>
        </td>
        <td style="color: #d1d5db; padding: 0 2px; text-align: center;">•</td>
        <td style="padding: 0 8px; text-align: center;">
          <a href="${process.env.NEXT_PUBLIC_BASE_URL}/contact" style="color: #3b82f6; text-decoration: none; font-size: 12px; white-space: nowrap;">Contact</a>
        </td>
      </tr>
    </table>
  </div>
</div>

`;
