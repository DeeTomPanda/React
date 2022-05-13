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
	     
function Search()
{
	const [changedText,setChangedText]=React.useState('');
	const handleChange=(event)=>
	{
		console.log(event.target.value);
		setChangedText(event.target.value);
	}
	return(
	<div>
	   <label id="search">Search</label>
	   <input id="search" type="text" onChange={handleChange}/>
	   <p><strong>{changedText}</strong></p>
	</div>
	)
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
		}
	];
  return (
  <div>
	<h1>{title}</h1>
	  <hr/>
        <List custom={stories}/>
	  <hr/>
	<Search/> 
  </div>
  );
}

export default App;
