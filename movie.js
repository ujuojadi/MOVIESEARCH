const createConfig = {
  renderOption(movie){
		const imgSrc = movie.Poster==='N/A'? '' : movie.Poster;
		return `
        <img src="${imgSrc}"/>
        ${movie.Title} ${movie.Year}
        `
	},

	inputValue(movie){
       return movie.Title;
	},

    async fetchData(searchTerm){
		const response = await axios.get('http://www.omdbapi.com/', {
		params: {
			apikey : '104dc041',
			s: searchTerm,
		}
	    }); 
	    if(response.data.Error){
		return [];
	    }
	    return response.data.Search;
	}

};

 createAutoComplete({
 	...createConfig,
	auto: document.querySelector('#left-autocomplete'),
	onOptionSelect(movie){
        document.querySelector('.tutorial').classList.add('is-hidden');
		onMovieselect(movie, document.querySelector('#left-summary'), 'left');
	}
	
})

  createAutoComplete({
 	...createConfig,
	auto: document.querySelector('#right-autocomplete'),
	onOptionSelect(movie){
        document.querySelector('.tutorial').classList.add('is-hidden');
		onMovieselect(movie, document.querySelector('#right-summary'), 'right');
	}
	
})




let leftMovie;
let rightMovie; 
const onMovieselect = async (movie, summaryElement, side)=>{
	const response = await axios.get('http://www.omdbapi.com/', {
		params: {
			apikey : '104dc041',
		    i: movie.imdbID
		}
	}) 
	
	summaryElement.innerHTML=onMoviedetails(response.data);
	if(side==='left'){
		leftMovie = response.data;
	}else{
		rightMovie = response.data;
	};

	if(leftMovie && rightMovie){
		runComparison();
	}
	
}

    const runComparison = ()=>{
     const leftSide = document.querySelectorAll('#left-summary .notification');
     const rightSide = document.querySelectorAll('#right-summary .notification');

     leftSide.forEach((lefts, index)=>{
        const rights = rightSide[index];

        const leftStats = parseInt(lefts.dataset.value);
        const rightStats = parseInt(rights.dataset.value);
        console.log(leftStats)

        if(leftStats > rightStats){
        	lefts.classList.add('is-primary');
        	rights.classList.remove('is-warning')
        }else{
        	lefts.classList.remove('is-primary');
        	rights.classList.add('is-warning')
        }
     });
};

const onMoviedetails= (movieData)=>{
	// let count;
	//  const awards = movieData.Awards.split(' ').forEach((word)=>{
	//  	const value = parseInt(word);
	//  	if(isNaN(value)){
	//  		return
	//  	}else{
	//  		count = count + word
	//  	}
    //OR
    //let count;
    //    const awards = movieData.Awards.split(' ').forEach((word)=>{
    // 	if(parseInt(word)===NaN){
	//     return;
    // 	}else{
    //        count = count + item
	// }
    // });
	
	const awards =movieData.Awards.split(' ').reduce((accumulator, currentvalue)=>{
		const curr = parseInt(currentvalue);
		if(isNaN(curr)){
			return accumulator;
		}else{
			return accumulator + currentvalue;
		}
	}, 0)
	
	const dollars = parseInt(movieData.BoxOffice.replace(/\$/g, '').replace(/,/g, ''));
	const score = parseInt(movieData.Metascore);
	const rating = parseInt(movieData.imdbRating);
	const votes = parseInt(movieData.imdbVotes);
	
    return `
     <article data-value= class="media">
       <figure class="media-left">
         <p class="image">
           <img src= "${movieData.Poster}"/>
          </p>
        </figure>
      <div class="media-content">
         <div class="content">
         <h1>${movieData.Title}</h1>
         <h4>${movieData.Genre}</h4>
         <p>${movieData.Plot}</p>

         </div>
       </div>
       </article>
    <article data-value=${awards} class="notification is-primary">
    <p class="title">${movieData.Awards}</p>
    <p class="subtitle">Awards</p>
    </article>
     <article data-value=${dollars} class="notification is-primary">
    <p class="title">${movieData.BoxOffice}</p>
    <p class="subtitle">BoxOffice</p>
    </article>
     <article data-value=${score} class="notification is-primary">
    <p class="title">${movieData.Metascore}</p>
    <p class="subtitle">MetaScore</p>
    </article>
     <article  data-value=${rating} class="notification is-primary">
    <p class="title">${movieData.imdbRating}</p>
    <p class="subtitle">imdbRating</p>
    </article>
     <article data-value=${votes} class="notification is-primary">
    <p class="title">${movieData.imdbVotes}</p>
    <p class="subtitle">imdbVotes</p>
    </article>
    `
}


