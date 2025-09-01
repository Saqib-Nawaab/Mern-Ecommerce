

const emailTemplates = (data) => {
  return `
  <div style="font-family: Arial, sans-serif; padding: 20px; line-height: 1.6; color: #333;">
    <h2>Welcome to Our App, ${data.name}!</h2>
    <p>Click the button below to activate your account. This link will expire in 5 minutes.</p>
    <a href="${data.activationUrl}" 
       style="display: inline-block; padding: 12px 24px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">
      Activate Account
    </a>
    <br/>
    <p>Thanks,<br/>The Team</p>
  </div>
`;
};


export default emailTemplates;