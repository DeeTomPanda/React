import * as React from 'react';

const list=[
		{
			title_:"Learning",
			id:1,
			language:"English"
		},
		{
			title_:"React",
			id:2,
			language:"English"

		}];
		
function List()
{
   return(
       <ul>
	{    
	 list.map(function (element)
	         {
	             return (
	                     <li key={element.id}>
			        <span>{element.title_}</span>
			        <span>{element.language}</span>
			     </li>
	                    );
	         }
	         )
	}
        </ul>
         );
}
	          

function App() {
	const title='React';
  return (
  <div>
	<h1>{title}</h1>
	  <hr/>
	<label id="search">Search:</label>
	<input id="search" type="text"/>
	<List/> 
  </div>
  );
}

export default App;
