document.getElementById('myForm').addEventListener('submit', saveBookmark);

// Save bookmark
function saveBookmark(e) {
    // Get form values
    let siteName = document.getElementById('siteName').value;
    let siteUrl = document.getElementById('siteUrl').value;
    if (!siteName || !siteUrl) {
        alert('Please fill in the form');
        return false;
    }
    let expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
    let regex = new RegExp(expression);
    if (!siteUrl.match(regex)) {
        alert('Please use a valid URL');
        return false;
    }
    let bookmark = {
        name: siteName,
        url: siteUrl
    };
    // Test if bookmarks is null
    if (localStorage.getItem('bookmarks') === null) {
        let bookmarks = [];
        // Add to array
        bookmarks.push(bookmark);
        // Set to localStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        // Get bookmarks from localStorage
        let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        for(let i = 0; i < bookmarks.length; i++) {
            if(bookmarks[i].url == siteUrl) {
                alert('Already bookmarked');
                return false;
            }
        }
        // Add bookmarks to array
        bookmarks.push(bookmark);
        // Re-set back to localStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    // Fetch and display bookmarks
    fetchBookmarks();
    //Clear form
    document.getElementById('myForm').reset();
    // Prevent form from submitting
    e.preventDefault();
}

// Delete bookmark
function deleteBookmark(url) {
    if (!confirm('Are you sure?')) {
        return false;
    }
    // Get bookmarks from localStorage
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Loop through bookmarks
    for (let i = 0; i < bookmarks.length; i++) {
        // Remove from array
        if (bookmarks[i].url == url) {
            bookmarks.splice(i, 1);
        }
    }
    // Re-set back to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    // Re-fetch bookmarks
    fetchBookmarks();
}

// Fetch bookmarks
function fetchBookmarks() {
    // Get bookmarks from localStorage
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Output bookmarks
    let bookmarksResults = document.getElementById('bookmarksResults');
    // Build output
    bookmarksResults.innerHTML = '';
    for (let i = 0; i < bookmarks.length; i++) {
        let name = bookmarks[i].name;
        let url = bookmarks[i].url;
        bookmarksResults.innerHTML += '<div class="well"><h3>' + name + ' ' + '<a class="btn btn-default" target="_blank" href="' + url + '">Visit</a> <a onclick="deleteBookmark(\'' + url + '\')" class="btn btn-danger" href="#">Delete</a></h3></div>';
    }
}

// Initially fetch and display bookmarks when page loads
document.addEventListener('DOMContentLoaded', fetchBookmarks);
