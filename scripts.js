console.log('better encore')

var replace_cover = function(){
  var cover_div, syndetics, syndetics_url, encore_img;

  console.clear();

  try{
    cover_div = document.getElementsByClassName('itemBookCover')[0];

    if (cover_div){

      syndetics = document.getElementById('imageLinkComponent');

      if (syndetics){

        syndetics_url = syndetics.href.replace('MC.gif', 'LC.gif');

        encore_img = document.getElementById('imageServiceAnyComponent');
        encore_img.src = syndetics_url;
        encore_img.style.display = "block";
      }
      else{
        syndetics = cover_div.getElementsByTagName('img')[0];
        syndetics_url = syndetics.src.replace('MC.gif', 'LC.gif');
        syndetics.src = syndetics_url;

        syndetics.style.display = "block";

      }
    }
  }
  catch(e){
    console.log(e);
  }
}

var clone_request_button = function(){
  var section = document.getElementsByClassName('dpBibTitle')[0];
  var request_button = document.getElementsByClassName('requestButton')[0];
  var new_button = request_button.cloneNode(true);

  section.appendChild(new_button);

}

var body = document.getElementsByTagName('body')[0];

if (!body.classList.contains('searchResultsPage')){
  replace_cover();
}
clone_request_button();

document.getElementById('searchString').placeholder = "Search for a title, an author, or a topic";

var linkin = document.getElementById('innreachSearchLink6Component');
var linkin_copy = linkin.cloneNode(true);
linkin_copy.innerHTML = "Search Linkin libraries"

document.getElementsByClassName('backToPrevious')[0].appendChild(linkin_copy);
