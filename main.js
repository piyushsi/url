var input = document.querySelector(".input");
var generate = document.querySelector(".ui-topsites");
var generated = document.querySelector(".generated");
var loader = document.querySelector(".ui-topsites");
var copy = document.querySelector(".btn6");

const copyToClipboard = (str) => {
  const el = document.createElement("textarea");
  el.value = str;
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
};

generate.addEventListener("click", () => {
  if (input.value == "") {
    input.placeholder = "Please input your URL first";
  } 
  if(!input.value.includes('https://') || !input.value.includes('http://')){
    input.value=='';
    input.placeholder = "Please input valid URL";
  }
    
  
  else {
    loader.innerHTML = '<div class="lds-ripple"><div></div><div></div></div>';
    const data = { url: input.value };

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(data);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://url-sr.herokuapp.com/api/url/", requestOptions)
      .then((response) => response.text())
      .then((res) => {
        var result = JSON.parse(res);
        generated.innerText = result.shortUrl;
        generated.href = result.shortUrl;
        loader.innerHTML = ` <a href="#" class="ui-topsites-item">
        <i class="fas fa-globe ui-topsite-icon"></i>
        <span>Generate</span>
        <span class="ui-topsites-item-edit"><i class="fas fa-ellipsis-v"></i></span>
    </a>`;
        copy.style.visibility = "unset";
      })
      .catch((error) => {
        console.error("Error:", error);
        loader.innerHTML = ` <a href="#" class="ui-topsites-item">
        <i class="fas fa-globe ui-topsite-icon"></i>
        <span>Try Again</span>
        <span class="ui-topsites-item-edit"><i class="fas fa-ellipsis-v"></i></span>
    </a>`;
      });
  }
});

copy.addEventListener("click", () => {
  copyToClipboard(generated.innerText);
  copy.innerText = "copied";
});
