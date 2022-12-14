    // Make the App component's state and functions available globally
    window.App = {
      state: {
        page: page
      },
      setPage: setPage
    };

    // Get the pagination elements
    const prevPageBtn = document.getElementById("prev-page");
    const currentPageSpan = document.getElementById("current-page");
    const nextPageBtn = document.getElementById("next-page");

    // Get the current page from the App component's state
    const currentPage = App.state.page;

    // Update the current page span with the current page number
    currentPageSpan.innerHTML = currentPage;

    // Handle the click event for the previous page button
    prevPageBtn.addEventListener("click", () => {
      App.setPage(currentPage - 1);
    });

    // Handle the click event for the next page button
    nextPageBtn.addEventListener("click", () => {
      App.setPage(currentPage + 1);
    });
