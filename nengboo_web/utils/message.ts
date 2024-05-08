export const sendMessage = (data) => {
  window.ReactNativeWebView?.postMessage(JSON.stringify(data));
};
