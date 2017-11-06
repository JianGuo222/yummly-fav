export default (url) => {
  console.log(url);
  return new Promise((resolve) => {
    fetch(url)
      .then((response) => {
        return response.json();
      }).then((data) => {
        resolve(data);
      }).catch(() => {
        resolve([]);
      });
  });
};
