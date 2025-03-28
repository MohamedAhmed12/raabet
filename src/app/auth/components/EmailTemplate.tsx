// export const EmailTemplate = ({
//   user,
//   activationCode,
// }: {
//   user: string;
//   activationCode: string;
// }) => 
//   <div className="bg-blue-50 p-10 font-sans">
//     <div className="text-center">
//       <img src="https://your-logo-url.com/logo.png" alt="Liinks Logo" width="50" className="mb-4"/>
//     </div>
//     <div className="max-w-md bg-white p-8 rounded-lg shadow-md mx-auto">
//       <h1 className="text-blue-900 text-2xl font-bold mb-4">Hi ${user}!</h1>
//       <p className="text-gray-700 text-base mb-4">Your activation code is below:</p>
//       <p className="text-gray-600 text-sm mb-6">Enter the code to finish creating your account. You can also copy & paste it.</p>
      
//       <div className="flex justify-center items-center">
//         <div className="bg-gray-100 px-6 py-4 text-2xl font-bold rounded-lg border-2 border-blue-900 tracking-widest text-center">
//           ${activationCode}
//         </div>
//       </div>

//       <p className="mt-6 text-xs text-gray-500">If you didn’t sign up, you can ignore this message.</p>
//     </div>

//     <div className="mt-8 text-xs text-gray-500 text-center">
//       <img src="https://your-logo-url.com/logo.png" alt="Liinks Logo" width="30" className=""/>
//       <p className="mt-2">© Liinks - All Rights Reserved</p>
//       <p className="mt-1">Charlie Clark, 335 Carroll St #5F, 11231, NY, USA</p>
//       <p className="mt-2">
//         <a href="https://yourwebsite.com/faq" className="text-blue-900 no-underline">FAQ</a> | 
//         <a href="https://yourwebsite.com/contact" className="text-blue-900 no-underline">Contact Us</a>
//       </p>
//     </div>
//   </div>
// ;

export const EmailTemplate = ({
  user,
  activationCode,
}: {
  user: string;
  activationCode: string;
}) => `
  <div style="background-color: #e3f2fd; padding: 40px; font-family: Arial, sans-serif;">
<div style="text-align: center;">
  <img src="https://your-logo-url.com/logo.png" alt="Liinks Logo" width="50" style="margin-bottom: 15px;"/>
</div>
    <div style="max-width: 500px; background: #fff; padding: 30px; border-radius: 8px; margin: auto; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
      <h1 style="color: #0d47a1;">Hi ${user}!</h1>
      <p style="font-size: 16px; color: #333;">Your activation code is below:</p>
      
      <p style="margin-top: 15px; color: #666;">Enter the code to finish creating your account. You can also copy & paste it.</p>
      
      <div style="display: flex; justify-content: center; align-items: center;">
  <div style="background-color: #f1f1f1; padding: 15px 25px; font-size: 24px; 
              font-weight: bold; border-radius: 5px; border: 2px solid #0d47a1; 
              letter-spacing: 2px; text-align: center;">
    ${activationCode}
  </div>
</div>



      <p style="margin-top: 20px; font-size: 12px; color: #888;">If you didn’t sign up, you can ignore this message.</p>
    </div>

    <div style="margin-top: 20px; font-size: 12px; color: #888; text-align: center;">
      <img src="https://your-logo-url.com/logo.png" alt="Liinks Logo" width="30"/>
      <p>© Liinks - All Rights Reserved</p>
      <p>Charlie Clark, 335 Carroll St #5F, 11231, NY, USA</p>
      <p>
        <a href="https://yourwebsite.com/faq" style="color: #0d47a1; text-decoration: none;">FAQ</a> | 
        <a href="https://yourwebsite.com/contact" style="color: #0d47a1; text-decoration: none;">Contact Us</a>
      </p>
    </div>
  </div>
`;
