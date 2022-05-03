import * as React from 'react';

function App() {
	const title='React';
	const list=[
		{
			title_:"Learning"
		},
		{
			title_:"React"
		}];
  return (
  <div>
	<h1>{title}</h1>
	  <hr/>
	  <ul>
	  {
		  list.map(function(element)
		   {
			   return(<li> {element.title_} </li>);
		   })}
	</ul>
	<label id="search">Search:</label>
	<input id="search" type="text"/>  
  </div>
  );
}

export default App;
