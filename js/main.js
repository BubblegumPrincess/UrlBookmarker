//Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

//save Bookmark
function saveBookmark(e){
	//get form values
	var siteName = document.getElementById('siteName').value;
	var siteURL = document.getElementById('siteURL').value;

	if(!validateForm(siteName, siteURL)){
		return false;
	}

	var bookmark = {
		name: siteName,
		url: siteURL
	}

	/*
	  //Local storage test
	  localStorage.setItem('test', 'Hello world');
	  //get an Item
	  console.log(localStorage.getItem('test'));
	  //delete an Item
	  localStorage.removeItem('test');
	  console.log(localStorage.getItem('test'));
	*/

	//Test if bookmarks is null
	if (localStorage.getItem('bookmarks') === null) {
		//Init array
		var bookmarks = [];
		//add to array
		bookmarks.push(bookmark);
		//Set to localStorage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	} else {
		//get bookmarks from localStorage
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
		//add bookmark to array
		bookmarks.push(bookmark);
		//reset back to localStorage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	}

	//Clear form
	document.getElementById('myForm').reset();

	//re-fetch bookmarks
	fetchBookmarks();


	//prevents form from submitting
	e.preventDefault();
}

//Delete bookmarks
function deleteBookmark(url){
	//get bookmark from localStorage
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	//loop through bookmarks
	for(var i = 0; i<bookmarks.length;i++){
		if(bookmarks[i].url == url){
			//remove from array
			bookmarks.splice(i, 1);
		}
	}
	//reset back to localStorage
	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

	//re-fetch bookmarks
	fetchBookmarks();

}

//Fetch bookmarks
function fetchBookmarks(){
		//get bookmarks from localStorage
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

		//Get output ID
		var bookmarksResult = document.getElementById('bookmarksResults');

		//build output
		bookmarksResults.innerHTML = '';
		for(var i = 0; i < bookmarks.length; i++){
			var name = bookmarks[i].name;
			var url = bookmarks[i].url;

			bookmarksResults.innerHTML += '<div class="m-4">'+
			                              '<h4>'+name+
			                              '  <a class="btn btn-lg btn-outline-success" target="_blank" href="'+url+'">View &raquo;</a>  '+
			                              '  <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-lg btn-outline-danger" href="#">Delete</a>  '+
			                              '</h4>'+
			                              '</div>';
		}
}

//validate Form
function validateForm(siteName, siteURL){
	if(!siteName || !siteURL){
		alert('Please fill in the form');
		return false;
	}

	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if(!siteURL.match(regex)){
    	alert('Please use a valid URL');
    	return false;
    }

    return true;
}