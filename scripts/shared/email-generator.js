var MailListener = require("mail-listener2");

const dotenv = require('dotenv');

// have to run from project directory to work
dotenv.load({ path: '.env.private' });
dotenv.load({ path: '.env.settings' });

const imapUsername = process.env.EMAIL_ADDRESS;
const imapPassword = process.env.PEWTUBE_VERIFY_EMAIL_PASSWORD;
const imapHost = process.env.EMAIL_HOST;
const imapPort = process.env.EMAIL_PORT;

console.log(imapPassword, imapUsername, imapHost)

var mailListener = new MailListener({
  username: imapUsername,
  password: imapPassword,
  host: imapHost,
  port: imapPort,
  tls: true,
  connTimeout: 10000, // Default by node-imap
  // debug: console.log, // Or your custom function with only one incoming argument. Default: null
  tlsOptions: { rejectUnauthorized: false },
  mailbox: "INBOX", // mailbox to monitor
  searchFilter: ['SEEN'], // the search filter being used after an IDLE notification has been retrieved
  // markSeen: true, // all fetched email will be marked as seen and not fetched next time
  fetchUnreadOnStart: true, // use it only if you want to get all unread email on lib start. Default is `false`,
  mailParserOptions: {streamAttachments: true}, // options to be passed to mailParser lib.
  attachments: true, // download attachments as they are encountered to the project directory
  attachmentOptions: { directory: "attachments/" } // specify a download directory for attachments
});

mailListener.start(); // start listening

// stop listening
//mailListener.stop();

mailListener.on("server:connected", function(){
  console.log("imapConnected");

});

mailListener.on("server:disconnected", function(){
  console.log("imapDisconnected");
});

mailListener.on("error", function(err){
  console.log(err);
});

// seqno just an incrementing index
mailListener.on("mail", function(mail, seqno, attributes){

  // console.log(attributes);



  /** data collected **/
  console.log('from: ' + mail.from[0].address);
  console.log('to: ' + mail.to[0].address);
  console.log(mail.date);
  console.log(mail['messageId']);
  console.log(mail.subject);
  console.log('\n');

  // console.log(mail.priority);
  // console.log(mail.eml);
  // console.log(mail.text)




  // console.log(mail.headers['message-id']);

  const keys = Object.keys(mail.headers);

  // console.log(keys);
  // console.log(mail.eml)

    /** MAIL KEYS **/
    // 'text',
    // 'headers',
    // 'subject',
    // 'messageId',
    // 'priority',
    // 'from',
    // 'to',
    // 'date',
    // 'receivedDate',
    // 'eml' ]

    /** HEADERS **/
    // [ 'from',
    // 'message-id',
    // 'subject',
    // 'mime-version',
    // 'content-type',
    // 'x-priority',
    // 'user-agent',
    // 'x-mailer',
    // 'x-zoho-virus-status',
    // 'to',
    // 'date',
    // 'in-reply-to',
    // 'x-zohomail-sender' ]

    /** EXAMPLE ATTRIBUTE **/
    // { date: 2017-09-22T17:03:05.000Z,
    //   flags: [ '\\Recent', '\\Seen', 'NONJUNK' ],
    //   uid: 7,
    //   modseq: '1000000000000000000' }



  // do something with mail object including attachments
  // console.log("emailParsed", mail);
  // mail processing code goes here
});

// mailListener.imap.move(:msguids, :mailboxes, function(){})
