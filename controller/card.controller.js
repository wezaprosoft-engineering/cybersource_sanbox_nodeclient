const cybersourceRestApi = require('cybersource-rest-client');
const path = require('path');
const merchant = path.resolve('config/merchant.config.js');
const configuration = require(merchant);
const { nanoid } = require("nanoid");

const creditPay = async (req, res, next) => {
	try {
		const configObject = new configuration();
		const apiClient = new cybersourceRestApi.ApiClient();
		const requestObj = new cybersourceRestApi.CreateCreditRequest();

		const clientReferenceInformation = new cybersourceRestApi.Ptsv2paymentsClientReferenceInformation();
		clientReferenceInformation.code = nanoid() //'12345678';
		requestObj.clientReferenceInformation = clientReferenceInformation;

		const paymentInformation = new cybersourceRestApi.Ptsv2paymentsidrefundsPaymentInformation();
		const paymentInformationCard = new cybersourceRestApi.Ptsv2paymentsidrefundsPaymentInformationCard();
		paymentInformationCard.number = req.body.cardNumber || '4111111111111111';
		paymentInformationCard.expirationMonth = req.body.expirationMonth || '03';
		paymentInformationCard.expirationYear = req.body.expirationYear || '2031';
		paymentInformationCard.type = '001';
		paymentInformation.card = paymentInformationCard;

		requestObj.paymentInformation = paymentInformation;

		const orderInformation = new cybersourceRestApi.Ptsv2paymentsidrefundsOrderInformation();
		const orderInformationAmountDetails = new cybersourceRestApi.Ptsv2paymentsidcapturesOrderInformationAmountDetails();
		orderInformationAmountDetails.totalAmount = req.body.amount || '150';
		orderInformationAmountDetails.currency = 'usd';
		orderInformation.amountDetails = orderInformationAmountDetails;

		const orderInformationBillTo = new cybersourceRestApi.Ptsv2paymentsidcapturesOrderInformationBillTo();
		orderInformationBillTo.firstName = req.body.firstName;
		orderInformationBillTo.lastName = req.body.lastName;
		orderInformationBillTo.address1 = req.body.address || '1 Market St';
		orderInformationBillTo.locality = req.body.locality || 'san francisco';
		orderInformationBillTo.administrativeArea = 'CA';
		orderInformationBillTo.postalCode = req.body.postalCode || '94105';
		orderInformationBillTo.country = req.body.country || 'US';
		orderInformationBillTo.email = req.body.email;
		orderInformationBillTo.phoneNumber = req.body.phoneNumber || '4158880000';
		orderInformation.billTo = orderInformationBillTo;

		requestObj.orderInformation = orderInformation;


		const instance = new cybersourceRestApi.CreditApi(configObject, apiClient);

		instance.createCredit(requestObj, function (error, data, response) {
			if (error) {
				next(error);
			}
			else if (data) {
				// console.log('\nData : ' + JSON.stringify(data));
			}
			console.log('\nResponse Code of Process a Credit : ' + JSON.stringify(response['status']));
			res.json(response);

		});
	}
	catch (error) {
		console.log('\nException on calling the API : ' + error);
		next(error)
	}
}
if (require.main === module) {
	credit(function () {
		console.log('\nCreateCredit end.');
	});
}
module.exports = creditPay


