//YOU CAN USE THIS WAY
// const input = document.querySelector('input');
// let timeoutId;
// const onInput = (event)=>{
// 	if(timeoutId){
// 		clearTimeout(timeoutId);
// 	}
// 	 timeoutId =setTimeout(()=>{
//          fetchData(event.target.value)
// 	}, 1000)
// }


const debounce = (func, delay = 1000)=>{
	let timeoutId;
	return (...args)=>{
      if(timeoutId){
	   clearTimeout(timeoutId) ;	
      }
      timeoutId =setTimeout(()=>{
          func.apply(null, args);
	}, delay)
	};
};