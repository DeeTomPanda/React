import * as React from 'react';
		
function List({custom,onClik})
{	
   return(
       <ul>
	{    
	 custom.map(function (element)    //element is the individual array element
	         {
	             return(
	                    <Item key={element.url}  //Passing a single element of array
			     item={element} 
			     onClik={onClik}/>
	                    );
	         }
	         )
	}
        </ul>
         );
}

function Item({item,onClik})
{
	return(
		<>
		{(item.title!==null && item.title!=='')?(
	        <li>
		   <span>{item.title}</span><span><a href={item.url}>{" "+item.url}</a></span>
		   <span><button onClick={()=>onClik(item)}>{"Remove"}</button></span>
		</li>):(<p></p>) }
		</>
	);
}

function IpWithLabel({id,value,eventHandler,isFocused,label})
                                                           //Destructuring in definition
{
	return(
		<>
	        <label htmlFor={id}>{label}</label>
		<input id={id}
		       value={value}
		       type="text"
		       onChange={eventHandler}
		       autoFocus={isFocused}/>
		</>);
}

//This component has been replaced with Reusable IpWithLabel Component
/*
 function Search(props)
{
	return(
	<div>
	   <label id="search">Search</label>
	   <input id="search" type="text" value={props.inputVal} onChange={props.eventHandler}/>
	</div>
	)
}*/

//Reducer fn below
const storiesReducer=(state,action)=>
{
	switch(action.type)
	{
		case('STORIES_INIT'):
		{
		 return{
			 ...state,
			 isLoading:true,
			 isError:false
		       }
		}
		case('SET_NEW_STORIES'):
	        {
		 return{
			 ...state,
			 isLoading:false,
			 isError:false,
			 data:action.payload,
		       }
		}
		case('SET_FILTER_STORIES'):
		{
		 return{
			...state,
			data:(state.data.filter(function(elmnt)
				                {
						 return elmnt.url!==action.payload.url;
						}))
		       }
		}
		default:
		throw new Error();
	} 
}

function App() {
const title='React';

const stories=[
		{
		 title_:"React_Redux",
		 id:1,
		 Author:"Dan"
	        },
	        {
		 title_:"Learning React",
		 id:2,
		 Author:"Robin"
		},
	        {
		 title_:"Learning JS",
		 id:3,
	         Author:'John Markfellow'
		},
	        {
		 title_:"HTML & CSS for Dummies",
	         id:4,
		 Author:"Jon Stringvarwessen",
		}
	];
	
	
	//Def of custom hook below
	const useCustomHook=(initialState)=>
	{
		const [value,setValue]=React.useState(localStorage.getItem('value')||initialState);

		React.useEffect(()=>
			{
				localStorage.setItem('value',value);
			},
			[value]
		);

		return [value,setValue];
	}
	const [changedText,setChangedText]=useCustomHook('React');

	
	function handleChange(e)
	{
		setChangedText(e.target.value);
	}
		
	const onClik=(item)=>
	{
	   setNewStories({
		   type:'SET_FILTER_STORIES',
	           payload:item});
	}

	const [newStories,setNewStories]=React.useReducer(storiesReducer,
		{data:[],isLoading:false,isError:false});

	/*	const getAsyncStories=()=>
        {
	    return(
		    new Promise((resolve,reject)=>
		    setTimeout(()=> resolve({data:stories}),3000))
	          );
	}
	*/

	const handleFetch=React.useCallback(()=>
	{
		if(changedText==='') return;
		setNewStories({type:'STORIES_INIT'});
		const URL='https://hn.algolia.com/api/v1/search?query=';
		fetch(`${URL}+${changedText}`)
		 .then((response)=>{return response.json()})
		 .then((result)=>{
			         setNewStories({type:'SET_NEW_STORIES',
			                       payload:result.hits,});
			         console.log(result);
		                 })
	},[changedText]);

	React.useEffect(()=>
		{
			handleFetch();
		},[handleFetch]);


  return (
  <div>
	<h1>{title}</h1>
	  <hr/>
	  <IpWithLabel label={"Search:"}
	  id={"search"}  
	  eventHandler={handleChange} 
	  value={changedText}
	  isFocused/> 
	  { newStories.isLoading? (<p>LOADING...</p>):(
	  <List custom={newStories.data} onClik={onClik}/>)}
	  <hr/>
	<p><strong>{changedText}</strong></p>
	<hr/>
	<hr/>
 </div>
  );
}

export default App;
