import * as React from 'react';
		
function List(props)
{
   return(
       <ul>
	{    
	 props.custom.map(function (element)
	         {
	             return (
	                     <li key={element.id}>
			        <span>{element.title_}</span>
			        <span>{" "+element.Author}</span>
			     </li>
	                    );
	         }
	         )
	}
        </ul>
         );
}
	     
function Search(props)
{
	return(
	<div>
	   <label id="search">Search</label>
	   <input id="search" type="text" value={props.inputVal} onChange={props.eventHandler}/>
	</div>
	)
}

function App() {
	const title='React';
	const [changedText,setChangedText]=React.useState(localStorage.getItem('search')||'React');

	function handleChange(e)
	{
		setChangedText(e.target.value);
		localStorage.setItem('search',e.target.value);
		console.log(e.target.value);
	}
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
		}
	];
	const searchStories=stories.filter(function(element)
		                             {
					return(element.title_.toLowerCase().includes(changedText.toLowerCase()));
					     });
	console.log(stories);
  return (
  <div>
	<h1>{title}</h1>
	  <hr/>
	  <List custom={stories}/>
	  <hr/>
	<Search eventHandler={handleChange} inputVal={changedText}/> 
	<p><strong>{changedText}</strong></p>
	<hr/>
        <List custom={searchStories}/>
  </div>
  );
}

export default App;
