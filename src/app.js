  document.getElementById('share-button').addEventListener('click', function () {
    var subject = 'Check out this awesome website';
    var body = 'I found this awesome website: https://example.com';
    var mailtoLink = 'mailto:?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    window.location.href = mailtoLink;
  });