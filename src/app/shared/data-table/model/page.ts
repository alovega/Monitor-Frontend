export class Page {
    // The number of elements in the page
    size = 10;
    // The total number of elements
    totalElements = 0;
    // The total number of pages
    totalPages = 0;
    // The current page number
    offset = 0;
    // data for sorting
    orderBy = '';
    // data for sorting
    orderDir = '';
    // the current search parameter
    searchQuery = '';
    // the url for fetching data
    url = '';
  }
