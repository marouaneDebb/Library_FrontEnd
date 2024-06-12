const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

app.post('/send-email', async (req, res) => {
    const { to, subject, text } = req.body;

    console.log('Received request to send email');
    console.log('To:', to);
    console.log('Subject:', subject);
    console.log('Text:', text);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'mo.aabouche2002@gmail.com',
            pass: 'rtultfwbjbhvpkly'   
        }
    });

    const mailOptions = {
        from: 'EmiBook ',
        to,
        subject,
        text
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
        res.status(200).send('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending email: ' + error.toString());
    }
});

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.listen(port, () => {
    console.log(`Email sender server listening at http://localhost:${port}`);
});
