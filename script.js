/**
 * Google Pay API Web Client Reference Implementation
 * Sandbox Environment Configuration Script Engine
 */

const baseRequest = {
  apiVersion: 2,
  apiVersionMinor: 0
};

const allowedCardNetworks = ["AMEX", "DISCOVER", "INTERAC", "JCB", "MASTERCARD", "VISA"];
const allowedCardAuthMethods = ["PAN_ONLY", "CRYPTOGRAM_3DS"];

const tokenizationSpecification = {
  type: 'PAYMENT_GATEWAY',
  parameters: {
    'gateway': 'example',
    'gatewayMerchantId': 'exampleGatewayMerchantId'
  }
};

const baseCardPaymentMethod = {
  type: 'CARD',
  parameters: {
    allowedAuthMethods: allowedCardAuthMethods,
    allowedCardNetworks: allowedCardNetworks
  }
};

const cardPaymentMethod = Object.assign(
  {},
  baseCardPaymentMethod,
  {
    tokenizationSpecification: tokenizationSpecification
  }
);

let paymentsClient = null;

function getGoogleIsReadyToPayRequest() {
  return Object.assign(
      {},
      baseRequest,
      {
        allowedPaymentMethods: [baseCardPaymentMethod]
      }
  );
}

function getGooglePaymentDataRequest() {
  const paymentDataRequest = Object.assign({}, baseRequest);
  paymentDataRequest.allowedPaymentMethods = [cardPaymentMethod];
  paymentDataRequest.transactionInfo = getGoogleTransactionInfo();
  paymentDataRequest.merchantInfo = {
    merchantName: 'Official Sandbox Demo Entity'
  };
  return paymentDataRequest;
}

function getGooglePaymentsClient() {
  if ( paymentsClient === null ) {
    // Explicit environment flag configurations forcing the client into completely safe sandbox mode
    paymentsClient = new google.payments.api.PaymentsClient({environment: 'TEST'});
  }
  return paymentsClient;
}

function onGooglePayLoaded() {
  const paymentsClient = getGooglePaymentsClient();
  paymentsClient.isReadyToPay(getGoogleIsReadyToPayRequest())
      .then(function(response) {
        if (response.result) {
          addGooglePayButton();
        }
      })
      .catch(function(err) {
        console.error("Wallet compatibility assessment check execution encountered an exception:", err);
      });
}

function addGooglePayButton() {
  const paymentsClient = getGooglePaymentsClient();
  const button = paymentsClient.createButton({onClick: onGooglePaymentButtonClicked});
  document.getElementById('google-pay-container').appendChild(button);
}

function getGoogleTransactionInfo() {
  return {
    countryCode: 'US',
    currencyCode: 'USD',
    totalPriceStatus: 'FINAL',
    totalPrice: '1.00'
  };
}

function onGooglePaymentButtonClicked() {
  console.log("Initializing digital transaction sheet request payload mapping interface...");
  const paymentDataRequest = getGooglePaymentDataRequest();
  paymentDataRequest.transactionInfo = getGoogleTransactionInfo();

  const paymentsClient = getGooglePaymentsClient();
  paymentsClient.loadPaymentData(paymentDataRequest)
      .then(function(paymentData) {
        processPayment(paymentData);
      })
      .catch(function(err) {
        console.error("Payment action pipeline operation terminated or dismissed by client framework context execution:", err);
      });
}

function processPayment(paymentData) {
    console.log("Mock digital token schema parsed successfully:", paymentData);
    alert("Sandbox validation check passed! Simulated payment verification data successfully emitted to the web developer console log targets.");
}
