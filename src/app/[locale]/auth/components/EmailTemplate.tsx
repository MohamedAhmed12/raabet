export const EmailTemplate = ({
  user,
  activationCode,
}: {
  user: string;
  activationCode: string;
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
      <h1 style="color: #0d47a1; font-size: 24px; margin: 0 0 20px 0;">Hi ${user}!</h1>
      <p style="font-size: 16px; color: #333; margin: 0 0 15px 0;">
        Your activation code is below. Enter it to complete your account setup.
      </p>
      
      <div style="margin: 25px 0 30px; text-align: center;">
        <div style="
          display: inline-block;
          background-color: #f8f9fa;
          padding: 15px 30px;
          font-size: 28px;
          font-weight: 700;
          border-radius: 6px;
          border: 2px solid #0d47a1;
          letter-spacing: 2px;
          color: #0d47a1;
        ">
          ${activationCode}
        </div>
      </div>

      <p style="margin: 0 0 10px 0; color: #666; line-height: 1.5;">
        This code will expire in 15 minutes. If you didn't request this email, please ignore it.
      </p>
    </div>

    <div style="margin-top: 20px; font-size: 12px; color: #888; text-align: center;">
      <!-- Address -->
      <p style="margin: 8px 0; color: #6b7280; font-size: 11px; line-height: 1.5;">
        © Rabet - All Rights Reserved
      </p>
      <p style="margin: 8px 0; color: #6b7280; font-size: 11px; line-height: 1.5;">
        444 Alaska Avenue, Torrance, CA 90503, USA
      </p>
      
      <!-- Links -->
      <table border="0" cellspacing="0" cellpadding="0" align="center" style="margin: 15px auto 0 auto;">
        <tr>
          <td style="padding: 0 8px;">
            <a href="${process.env.NEXT_PUBLIC_BASE_URL}/terms" style="color: #3b82f6; text-decoration: none; font-size: 12px; white-space: nowrap;">Terms</a>
          </td>
          <td style="color: #d1d5db; padding: 0 2px;">•</td>
          <td style="padding: 0 8px;">
            <a href="${process.env.NEXT_PUBLIC_BASE_URL}/privacy" style="color: #3b82f6; text-decoration: none; font-size: 12px; white-space: nowrap;">Privacy</a>
          </td>
          <td style="color: #d1d5db; padding: 0 2px;">•</td>
          <td style="padding: 0 8px;">
            <a href="${process.env.NEXT_PUBLIC_BASE_URL}/contact" style="color: #3b82f6; text-decoration: none; font-size: 12px; white-space: nowrap;">Contact</a>
          </td>
        </tr>
      </table>
    </div>
  </div>
`;
