const createAutoComplete = ({auto, renderOption, onOptionSelect, inputValue, fetchData})=>{
	auto.innerHTML = `
    <label><b>Search</b></label>
   <input class="input"/>
   <div class= "dropdown">
      <div class="dropdown-menu">
          <div class="dropdown-content results">
          </div>
      </div>
</div>
`;

const input = auto.querySelector('input');
const dropDown = auto.querySelector('.dropdown');
const results = auto.querySelector('.results');



 const onInput =   async event=>{
 	const items = await fetchData(event.target.value);
 	if(!items.length){//or if(!event.targe.value or input.value)
       dropDown.classList.remove('is-active');
       return;
 	}
 	results.innerHTML = '';
 	dropDown.classList.add('is-active');
 	for(let item of items){
 		const options = document.createElement('a');
 		
 		options.classList.add('dropdown-item');
 		options.innerHTML = renderOption(item);
 		options.addEventListener('click', ()=>{
 			dropDown.classList.remove('is-active');
 			input.value =inputValue(item);
 			onOptionSelect(item);
 		})
 	 results.appendChild(options);

 	}
 };

input.addEventListener('input', debounce(onInput, 1000));

document.addEventListener('click', event=>{
   if(!auto.contains(event.target)){
   	dropDown.classList.remove('is-active');
   }
});



}