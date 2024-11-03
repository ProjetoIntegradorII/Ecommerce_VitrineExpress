const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: 'sandbox',
  client_id: 'AfJkAKVfWYqESTWcpUnF1zwdH5cVD1sNA68LdulTPdc7en4c1bhiOI88ngRgV96MZdAxlAnG2oF0cuwd',
  client_secret: 'EP11OGCGvZviD2cYHQuETlws3wxdyZacispjDRQO5nxoQ77ILqYmtfulZXTArhXUU1vcfP61cTLvpJct',
});

module.exports = paypal;
