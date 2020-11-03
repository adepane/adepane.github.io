var webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BH8CiHqvMTfKjQgmdSu66dAT87t4KkeQT4OoOp60BlQ3CpaKMOAb_BahiZerZisvYrQWin0VAbVUNDrJ2JgArXQ",
    "privateKey": "ZPDoGTdBCedNjRkigLOVjEyDgpWge1XqdJo4XMGW8oo"
};


webPush.setVapidDetails(
    'mailto:adesbpane@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/eQUeCbC61Zw:APA91bG74amErdvXTrJm_JqDrP1LJkTEnWu86KEIKLi9_lkzBktsqhnNJ0KoLsy59rOSiFhODhhMwGxBmawojsKzFj9Z1D3rcxWa3dEq4apZBydczXY1K5jawnVS6wRP9Qo3gUZ0U5eY",
    "keys": {
        "p256dh": "BEjP4Cv1e7oxckr3IamAdZa+dpz7zevoC+RixspYEy8jQCkFwhDZ5bCYdZ5KF3fN2xRGsy81CxEhyarKLlu+nJ8=",
        "auth": "nMIQoAfXrjGo30/shUk3/g=="
    }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

var options = {
    gcmAPIKey: '314924417221',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);