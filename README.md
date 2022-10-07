# Node.js Card Payment for the CyberSource SDK

## How to run

* Clone this repo

````bash
git clone ''
````

* Install dependencies

````bash
npm install
````

* Send A Post request to "http://localhost:3000/api/pay/card" with the following body

````json
{
    "cardNumber":"4111111111111111",
    "expirationMonth":"03",
    "expirationYear":"2031",
    "amount":"100",
    "firstName":"myfirstname",
    "lastName":"mylastname",
    "email":"test@email.com",
    "phoneNumber":"254792340243",
    "referenceCode":"87654321"
}
````

### THIS USES A SANBOX ACCOUNT