const form = document.querySelector('form');
const resultDiv = document.querySelector('.result');

form.addEventListener('submit', (e)=>{
e.preventDefault();
getwordInfo(form.elements[0].value);
});

// for checking purpose whether it is working or Not 
// const getwordInfo = (word)=>{
//     alert("word" + word);
// }

const getwordInfo = async (word)=>{
    try{

   
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const data = await response.json();
    console.log(data);
    let definitions = data[0].meanings[0].definitions[0];

    resultDiv.innerHTML =`<h2><strong>Word:<storng> ${data[0].word}</h2>
    <p class="partOfSpeech">${data[0].meanings[0].partOfSpeech}</P>
    <p><strong>Meaning:</strong>${definitions.definition === undefined ? "Not Found": definitions.definition}</p>
    <p><strong>Example:<strong>${definitions.example === undefined ? "Not Found" : definitions.example}</p>
    <p><strong>Antonyms:<strong></p>
    <ul id = "AntonymsList"> </ul>
    <p><strong>Synonyms:<strong></p>
    <ul id="SynonymsList"> </ul>
    `;

    const SynonymsList = document.getElementById("SynonymsList");
    const AntonymsList = document.getElementById("AntonymsList");
    // Fetching antonyms
    if(definitions.antonyms.length ===0){
        AntonymsList.innerHTML +=`<span>None</span>`;
    }else{
        for(i=0; i<definitions.antonyms.length; i++){
            AntonymsList.innerHTML += `<li>${definitions.antonyms[i]}</li>`
        }
    }
    
    // Fetching synonyms

    if(definitions.synonyms.length === 0){
        SynonymsList.innerHTML += `<span>Not Found</span>`;
    }else{
        for(j=0; j<definitions.synonyms.length; j++){
            SynonymsList.innerHTML += `<li>${definitions.synonyms[j]}</li>`
        }
    }
    // Adding Read More Button
    resultDiv.innerHTML +=`<div><a href="${data[0].sourceUrls}" target ="_blank">Read More</a></div>`

}
catch(error){
resultDiv.innerHTML =`<p> Sorry, The word does not exist</p>`;
};
};