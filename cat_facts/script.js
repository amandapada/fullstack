let catFact = document.getElementById("cat_info");
let catImage = document.querySelector(".img_container");
let pleaseGenerate = document.getElementById("please_generate");
let introText = document.getElementById("intro_text")
let data;  
let img_data; 

async function fetchData() {
    try {
        pleaseGenerate.style.display = "none"
        introText.style.display = "none"
        const response = await fetch("https://meowfacts.herokuapp.com/");
        if (!response.ok) {
            throw new Error("Fact API failed: " + response.status);
        }
        data = await response.json();  
        catFact.innerHTML = data.data[0];
        catFact.style.display = "inline-block"

        const img_response = await fetch("https://api.thecatapi.com/v1/images/search");
        if (!img_response.ok) {
            throw new Error("Image API failed: " + img_response.status);
        }
        img_data = await img_response.json();  
        const imgUrl = img_data[0].url;
        catImage.innerHTML = '<img src="' + imgUrl + '" alt="Cat Image">';
        catImage.querySelector("img").style.display = "inline-block"
        
    } catch (error) {
        console.error('Error:', error);
        catFact.innerHTML = "Error: " + error.message;
        catImage.innerHTML = "<p>Image failed to load.</p>";
    }
}


function shareOnTwitter() {
    
    if (!data || !img_data) {
        pleaseGenerate.style.display = "block"
        pleaseGenerate.innerHTML = "I thought told you to GENERATE first?!"; 
        introText.style.display = "none"
        return;
    }

    const catFactText = data.data[0]; 
    const catImageUrl = img_data[0].url; 
    
    let tweetText = `Fun cat fact: "${catFactText}" \nCheck out this adorable cat image: ${catImageUrl} 🐱`;
    
    // URL-encode the text
    let encodedText = encodeURIComponent(tweetText);
    
    let shareUrl = `https://x.com/intent/post?text=${encodedText}`;
    
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
}

