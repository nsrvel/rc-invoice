function getPageNumber(pageIndex) {
  if (pageIndex == null) {
    return '';
  }

  const pageNumber = pageIndex + 1;

  return pageNumber;
}

function getTotalPages(pages) {
  if (!pages) {
    return '';
  }

  return pages.length;
}

function getDate() {
  // Get the current date
  var currentDate = new Date();

  // Options for formatting the date
  var options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'Asia/Jakarta' // Set the time zone to Jakarta
  };

  // Format the date and return
  return currentDate.toLocaleDateString('en-GB', options).replace(/\//g, '-');
}

function getTime() {
  // Get the current time
  var currentTime = new Date();

  // Options for formatting the time
  var options = {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'Asia/Jakarta' // Set the time zone to Jakarta
  };

  // Format the time and return
  return currentTime.toLocaleTimeString('en-GB', options);
}
