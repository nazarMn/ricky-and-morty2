let speciesTrigger = false;
let speciesValue;
let genderValue = ""; 

function getCharacterPage(page) {
    let src = `https://rickandmortyapi.com/api/character?page=${page}`;
    if (speciesTrigger === true) {
        src = `https://rickandmortyapi.com/api/character?page=${page}&species=${speciesValue}`;
    } else if (genderValue) {
        src = `https://rickandmortyapi.com/api/character?page=${page}&gender=${genderValue}`;
    }
    
    fetch(src)
        .then(res => res.json())
        .then(data => {
            $('.characterContainer').empty();
            for (let el of data.results) {
                const characterItem = $(`
                    <div class='characterItem'>
                        <h3>${el.name}</h3>
                        <img src="${el.image}" alt="character">
                        <p><b>Gender: </b>${el.gender}</p>
                        <button class="moreBtn" id="${el.id}">More</button>
                    </div>`);
                characterItem.find('.moreBtn').click(() => displayCharacterDetails(el.id));
                $('.characterContainer').append(characterItem);
            }
        });
}

function displayCharacterDetails(characterId) {
    $('.popupContainer').empty();
    fetch(`https://rickandmortyapi.com/api/character/${characterId}`)
        .then(res => res.json())
        .then(characterData => {
            console.log('Character Details:', characterData);
            $('.popupContainer').append(`
                <img src='${characterData.image}'>
                <div>${characterData.name}</div>
                <div>${characterData.status}</div>
                <div>${characterData.species}</div>
                <div>${characterData.origin.name}</div>
                <div>${characterData.location.name}</div>`);
            $('.popup').css('display', 'flex');
        });
}

let currentPage = 1;
getCharacterPage(currentPage);

$('#nextBtn').click(() => {
    if (currentPage < 41) {
        currentPage++;
        getCharacterPage(currentPage);
        $('#pageNumber').text(currentPage);
    }
});

$('#prewBtn').click(() => {
    if (currentPage >= 2) {
        currentPage--;
        getCharacterPage(currentPage);
        $('#pageNumber').text(currentPage);
    }
});

function getAllCharacters(species) {
    speciesValue = species;
    speciesTrigger = true;
    genderValue = "";
    $('.characterContainer').empty();
    getCharacterPage(currentPage);
}

function filterByGender(gender) {
    genderValue = gender;
    speciesValue = "";
    speciesTrigger = false;
    $('.characterContainer').empty();
    getCharacterPage(currentPage);
}


$('#filterByGender').click(() => {
    const selectedGender = $('#genderFilter').val();
    filterByGender(selectedGender);
});

$('#addSpecies').click(() => {
    speciesValue = $('#speciesFinder').val();
    speciesTrigger = true;
    $('.characterContainer').empty();
    getAllCharacters(speciesValue);
});



$('.closeContainer').click(() => {
    $('.popup ').css('display','none')
   });