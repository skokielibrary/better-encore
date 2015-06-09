console.log('better encore')

var replace_thumbs = function(){
  var covers = document.getElementsByClassName('itemBookCover');
  var re = /(upc|isxn)\=[a-zA-Z0-9]+/g;

  for (i = 0; i < covers.length; i++){
    var cover = covers[i];
    var img = cover.getElementsByTagName('img')[0];
    var src = img.src;

    console.log(src)

    var m;
    var matches = {};

    while ((m = re.exec(src)) != null){
      if (m[1] == 'upc'){
        matches.upc = m[0];
      }
      else{
        matches.isxn = m[0];
      }
    }
    console.log(matches)
    console.log('---done---')

    if (matches){
      if (matches.upc){
        var rec = matches.upc;
      }
      else if (matches.isxn){
        var rec = matches.isxn;
        rec = rec.replace('isxn', 'isbn');
      }
    }
    else{
      var rec = 'isbn=99999999';
    }

    var new_src = 'http://www.syndetics.com/index.php?' + rec + '/MC.gif&client=skopl&type=hw7';
    console.log(new_src)

    img.src = new_src;
  }
}

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

        if (syndetics.id == 'imageService2AnyComponent'){
          syndetics_url = syndetics.src.replace('thumb', 'large');
        }
        else{
          syndetics_url = syndetics.src.replace('MC.gif', 'LC.gif');
        }
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
  var sections, section, request_buttons, request_button, new_button

  sections = document.getElementsByClassName('dpBibTitle');
  request_buttons = document.getElementsByClassName('requestButton');

  for (i=0;i < sections.length;i++){
    section = sections[i];
    request_button = request_buttons[i];
    new_button = request_button.cloneNode(true);
    section.appendChild(new_button);
    request_button.parentElement.removeChild(request_button);
  }

}

var clone_articles_nav = function(){
  var nav = document.getElementById('leftColumn');
  var main = document.getElementById('mainContentArea');
  var new_nav = nav.cloneNode(true);
  new_nav.classList.add('new-nav')

  main.insertBefore(new_nav, main.firstChild);
  nav.parentNode.removeChild(nav);
}

var clone_linkin = function(){
  var linkin = document.getElementById('innreachSearchLink6Component');
  var linkin_copy = linkin.cloneNode(true);
  linkin_copy.innerHTML = "Search Linkin libraries"
  document.getElementsByClassName('backToPrevious')[0].appendChild(linkin_copy);
}

var create_holdings_toggle = function(){
  var all = document.getElementsByClassName('allItemsSection')[0];

  console.log(all)

  if (all !== undefined){
    var holdings = document.getElementsByClassName('bibHoldingsWrapper')[0];
    var button = document.createElement('button');
    button.classList.add('text-button', 'holdings-toggle', 'show-available');
    button.innerText = "Show available";
    button.id = "holdings-toggle";

    holdings.insertBefore(button, holdings.firstChild);

    document.getElementById('holdings-toggle').onclick = function(){
      toggle_holdings(this);
    }
  }
}

var toggle_holdings = function(element){
  var available = document.getElementsByClassName('availableItemsSection')[0];
  var all = document.getElementsByClassName('allItemsSection')[0];

  var toggle = element;

  if (toggle.classList.contains('show-available')){
    available.style.display = "block";
    all.style.display = "none"
    toggle.classList.remove('show-available');
    toggle.classList.add('show-all');
    toggle.innerText = 'Show all';
  }
  else{
    available.style.display = "none";
    all.style.display = "block"
    toggle.classList.remove('show-all');
    toggle.classList.add('show-available');
    toggle.innerText = 'Show available';
  }
}

var body = document.getElementsByTagName('body')[0];
document.getElementById('searchString').placeholder = "Search for a title, an author, or a topic";

if (body.classList.contains('recordDetailPage')){
  replace_cover();
  clone_linkin();
  create_holdings_toggle();
}

if (body.classList.contains('searchResultsPage')){
  replace_thumbs();
}

if (body.classList.contains('articlesPage')){
  clone_articles_nav();
}
