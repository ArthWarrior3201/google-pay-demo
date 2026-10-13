/**
 * Configuration definition for the Google Pay API core version architecture base reference objects.
 */
const baseRequest = {
  apiVersion: 2,
  apiVersionMinor: 0
};

/**
 * Worldwide payment networks accepted within this merchant sandbox portal layout pipeline.
 */
const allowedCardNetworks = ["AMEX", "DISCOVER", "INTERAC", "JCB", "MASTERCARD", "VISA"];

/**
 * Cryptographic device token validation authentication procedures authorized by this handler engine.
 */
const allowedCardAuthMethods = ["PAN_ONLY", "CRYPTOGRAM_3DS"];

/**
 * Simulated backend payment processing gateway specifications parameters interface descriptor mapping.
 */
const tokenizationSpecification = {
  type: 'PAYMENT_GATEWAY',
  parameters: {
    'gateway': 'example',
    'gatewayMerchantId': 'exampleGatewayMerchantId'
  }
};

/**
 * Base data request parameters framework for core credit and debit payment card profile elements tracking.
 */
const baseCardPaymentMethod = {
  type: 'CARD',
  parameters: {
    allowedAuthMethods: allowedCardAuthMethods,
    allowedCardNetworks: allowedCardNetworks
  }
};

/**
 * Combined profile framework bundling card payment definitions and backend system encryption token specifications.
 */
const cardPaymentMethod = Object.assign(
  {},
  baseCardPaymentMethod,
  {
    tokenizationSpecification: tokenizationSpecification
  }
);

let paymentsClient = null;

/**
 * Bundles the final transactional pricing values, product identifiers, and merchant entity definitions.
 */
function getGooglePaymentDataRequest() {
  const paymentDataRequest = Object.assign({}, baseRequest);
  paymentDataRequest.allowedPaymentMethods = [cardPaymentMethod];
  paymentDataRequest.transactionInfo = getGoogleTransactionInfo();
  paymentDataRequest.merchantInfo = {
    merchantName: 'Google Developers Community'
  };
  return paymentDataRequest;
}

/**
 * Returns an operational payment pipeline handler state instance securely bound into the local global scope sandbox environment.
 */
function getGooglePaymentsClient() {
  if ( paymentsClient === null ) {
    paymentsClient = new google.payments.api.PaymentsClient({environment: 'TEST'});
  }
  return paymentsClient;
}

/**
 * Core initialization setup trigger executed automatically following the secure download lifecycle hook from Google servers.
 */
function onGooglePayLoaded() {
  console.log("Google library script verified. Rendering UI asset button nodes...");
  addGooglePayButton();
}

/**
 * Mounts the standardized official brand asset element smoothly inside the markup wrapper target viewport node.
 */
function addGooglePayButton() {
  const paymentsClient = getGooglePaymentsClient();
  
  const button = paymentsClient.createButton({
    buttonColor: 'black', 
    buttonType: 'buy',    
    onClick: onGooglePaymentButtonClicked
  });
  
  const container = document.getElementById('container');
  container.innerHTML = ''; 
  container.appendChild(button);
}

/**
 * Isolated parameters object containing regional locale context data currency definitions and simulated values tracking items.
 */
function getGoogleTransactionInfo() {
  return {
    countryCode: 'US',
    currencyCode: 'USD',
    totalPriceStatus: 'FINAL',
    totalPrice: '1.00'
  };
}

/**
 * Launch handler executing full structural window render processing overlays upon physical click device inputs.
 */
function onGooglePaymentButtonClicked() {
  const paymentDataRequest = getGooglePaymentDataRequest();
  paymentDataRequest.transactionInfo = getGoogleTransactionInfo();

  const paymentsClient = getGooglePaymentsClient();
  paymentsClient.loadPaymentData(paymentDataRequest)
      .then(function(paymentData) {
        processPayment(paymentData);
      })
      .catch(function(err) {
        console.error("Overlay user interface block logged:", err);
      });
}

/**
 * Outputs successfully processed transaction data arrays safely into the browser developer layout console logs.
 */
function processPayment(paymentData) {
    // The pop-up alert text has been completely removed for a completely silent, smooth close.
    console.log("Mock Payment loop completed successfully!", paymentData);
}
