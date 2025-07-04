importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyA_qT1TuIR8j5xLPBbb7c49kHTJOj9Ad1o",
  authDomain: "pro910-iet.firebaseapp.com",
  projectId: "pro910-iet",
  storageBucket: "pro910-iet.firebasestorage.app",
  messagingSenderId: "422953949855",
  appId: "1:422953949855:web:28768ad3ec1edc9daee0aa",
  measurementId: "G-V0VWYYPEN9"
};
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here

  self.registration.showNotification(payload.data.title, {
    body: payload.data.body,
    icon: payload.data.icon,
    image: payload.data.imageURL,
    data: {
      url: payload.data.referenceURL,
      primaryUrl: payload.data.primaryURL,
      secondaryUrl: payload.data.secondaryURL,
    },
    actions: [
      ...(
        payload.data.primaryActionBtn ? [{
          action: 'coffee-action',
          title: payload.data.primaryActionBtn,
          type: 'button',
          // icon: 'thumbs-up-solid.svg'
        }] : []
      ),
      ...(
        payload.data.secondaryActionBtn ? [{
          action: 'doughnut-action',
          type: 'button',
          title: payload.data.secondaryActionBtn,
          // icon: "thumbs-up-solid.svg"
        }] : []
      ),
    ],
  });
});


// const x = [...(2 > 1 ? [4] : []), ...(1 > 2 ? [5] : [])]


// self.addEventListener('notificationclick', function (event) {
//     event.notification.close();
//     console.log(event.notification)
//     event.waitUntil(
//         clients.openWindow(event.notification.data.url)
//     );
// });

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  console.log(event.notification);
  if (event.action === 'coffee-action') {
    event.waitUntil(clients.openWindow(event.notification.data.primaryUrl));
  } else if (event.action === 'doughnut-action') {
    event.waitUntil(clients.openWindow(event.notification.data.secondaryUrl));
  } else {
    event.waitUntil(clients.openWindow(event.notification.data.url));
  }
});
