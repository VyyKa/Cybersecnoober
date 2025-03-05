const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Create a test email account using Ethereal
let testAccount;
let transporter;

async function setupMailer() {
    // Generate test SMTP service account
    testAccount = await nodemailer.createTestAccount();

    // Create a transporter using Ethereal email
    transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass
        }
    });
}

async function setupMailer() {
    try {
        // Generate test SMTP service account
        testAccount = await nodemailer.createTestAccount();

        // Create a transporter using Ethereal email
        transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
                user: testAccount.user,
                pass: testAccount.pass
            }
        });
    } catch (error) {
        console.error('Error setting up mailer:', error);
    }
}

// Endpoint to send OTP email
app.post('/send-otp', async (req, res) => {
    const { email, otp } = req.body;

    try {
        // Send mail with defined transport object
        const info = await transporter.sendMail({
            from: '"CYBERSECNOOB TOOLS" <security@cybersecnoob.com>',
            to: email,
            subject: 'Password Reset OTP',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #1a73e8;">Password Reset Request</h2>
                    <p>You have requested to reset your password. Please use the following OTP code to proceed:</p>
                    <div style="background: #f5f5f5; padding: 20px; text-align: center; margin: 20px 0;">
                        <h1 style="color: #1a73e8; letter-spacing: 5px;">${otp}</h1>
                    </div>
                    <p>This code will expire in 10 minutes.</p>
                    <p>If you didn't request this password reset, please ignore this email.</p>
                    <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
                    <p style="color: #666; font-size: 12px;">This is an automated email from CYBERSECNOOB TOOLS. Please do not reply.</p>
                </div>
            `
        });

        // Preview URL for Ethereal email
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        
        res.json({ 
            success: true, 
            message: 'OTP sent successfully',
            previewUrl: nodemailer.getTestMessageUrl(info)
        });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({
            success: false, 
            message: 'Failed to send OTP'
        });
    }
});

app.use(express.static(__dirname)); // Serve static files from the current directory

// Serve index.html at the root URL
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
