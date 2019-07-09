const nodemailer = require("nodemailer");
const matchUtils = require('./utilities').Match;

// async..await is not allowed in global scope, must use a wrapper
exports.email = async function(scores) {
	if (scores) {
		let scoresString = '';

		scores.forEach(function(s) {
			const listItem = "<li>" + s.score + " (" + s.team + ")</li>";

			scoresString += listItem.toString();
		});


		// Generate test SMTP service account from ethereal.email
		// Only needed if you don't have a real mail account for testing
		let testAccount = await nodemailer.createTestAccount();
	
		// create reusable transporter object using the default SMTP transport
		let transporter = nodemailer.createTransport({
			host: "smtp.ethereal.email",
			port: 587,
			secure: false, // true for 465, false for other ports
			auth: {
				user: testAccount.user, // generated ethereal user
				pass: testAccount.pass // generated ethereal password
			}
		});
	
		// send mail with defined transport object
		let info = await transporter.sendMail({
			from: '"Fred Foo 👻" <foo@example.com>', // sender address
			to: "bar@example.com, baz@example.com", // list of receivers
			subject: "Hello ✔", // Subject line
			text: "test", // plain text body
			html: "<ul>" + scoresString + "</ul>" // html body
		});
	
		console.log("Message sent: %s", info.messageId);
		// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
	
		// Preview only available when sending through an Ethereal account
		console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
		// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
	}
}

exports.email().catch(console.error);