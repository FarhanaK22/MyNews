const API_KEY = "42bec0412d3941c29c791dbcbbe592a7";
const URL = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load',()=> fetchNews("India"));

async function fetchNews (query)
{
   const res = await fetch(`${URL}${query}&apiKey=${API_KEY}`);
   const data = await res.json();
   console.log(data);
   bindData(data.articles);
}

function reload()
{
    window.location.reload();
} 

function bindData(articles){
    const container = document.getElementById('cards-container')
    const news_template = document.getElementById('template-news-card')

    container.innerHTML='';

    articles.forEach(article => {
        if(!article.urlToImage) return ;
        
        const card_clone = news_template.content.cloneNode(true);

        fillDataInCard(card_clone,article);
        container.appendChild(card_clone);
    });
}

 function fillDataInCard(card_clone,article)
{
    const newImg = card_clone.querySelector('#news-image');
    const newsTitel = card_clone.querySelector('#news-title');
    const newSource = card_clone.querySelector('#news-sourse');
    const newDesc = card_clone.querySelector('#news-desc');
    
    newImg.src = article.urlToImage;
    newsTitel.innerHTML = article.title;
    newDesc.innerHTML = article.description;
    console.log('Inside fillDataInCard:', article.urlToImage);
    console.log('Inside fillDataInCard:', article.title);
    console.log('Inside fillDataInCard:', article.description);
    const date = new Date(article.publishedAt).toLocaleString("en-US",
        {
            timeZone : "Asia/Jakarta"
        }
    );

    newSource.innerHTML = `${article.source.name} · ${date}`;
    card_clone.firstElementChild.addEventListener('click',()=>
    {
        window.open(article.url,"_blank");
    })
}

let curSelectedNav = null;
function onNavItemClick(id){
    fetchNews(id);
    const navitem = document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = navitem;
    curSelectedNav.classList.add('active');
}

const input_text= document.getElementById('news-input');
const search = document.getElementById('search-button');

search.addEventListener('click',()=>
{
    const query = input_text.value;

    if(!query) return ;

    fetchNews(query);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = null;

});


document.addEventListener("DOMContentLoaded", () => {
    // Simulate an API request or any async operation
    setTimeout(() => {
        hideLoader();
        showContent();
    }, 3000); // Replace with your actual data loading logic and time

    function hideLoader() {
        const loader = document.getElementById("loader");
        loader.style.display = "none";
        const loaderT =  document.querySelector(".loading-text");
        loaderT.style.display = "none";
    }

    function showContent() {
        const content = document.getElementById("content");
        content.style.display = "block";
        
    }
});

function waveLoadingEffect() {
    var baseText = "L";
    var waveText = "❤ADING";
    var element = document.querySelector(".loading-text");
    var text = baseText + waveText;
    var i = 0;
    var forward = true;
  
    function updateText() {
      if (forward) {
        if (i < text.length) {
          element.textContent = text.substring(0, i + 1);
          i++;
        } else {
          forward = false;
          i--;
        }
      } else {
        if (i >= baseText.length) {
          element.textContent = text.substring(0, i);
          i--;
        } else {
          forward = true;
          i++;
        }
      }
    }
  
    setInterval(updateText, 350);
  }
  
  waveLoadingEffect();
  
  /*This is for the Loading-Text, Which is animated using js*/
  