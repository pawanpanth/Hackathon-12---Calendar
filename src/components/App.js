import React, {Component, useEffect, useState} from "react";
import '../styles/App.css';
let month = new Array();
month[0] = "January";
month[1] = "February";
month[2] = "March";
month[3] = "April";
month[4] = "May";
month[5] = "June";
month[6] = "July";
month[7] = "August";
month[8] = "September";
month[9] = "October";
month[10] = "November";
month[11] = "December";


const App = () => {
  const [show, setShow] = useState(false);
  const [years,setYears] = useState();

  const [curr_month,set_curr_month] = useState(new Date().getMonth());
  const [curr_year,set_curr_year] = useState(new Date().getFullYear());

  const [days,setDays] = useState(0);
  const [start_day, setStartDay] = useState(0);
  const [head_blank,setHeadBlank] = useState(0);
  
  const [rows,set_rows] = useState(0);
  const [tail_blank, setTailBlank] = useState(0);
  const [today,setToday] =useState(new Date().getDate());
  //const [today,setToday] =useState(1);
  

  const monthHandler =(evt)=>{
    evt.preventDefault();
    let new_month = evt.target.value;
    set_curr_month(new_month);
  }
  const yearHandler = (evt)=>{
    
    if (evt.keyCode != 13) { return; }
    
    evt.preventDefault();
  
    let new_year = years;
    set_curr_year(new_year);
    setShow(!show);
    
  }
  const yearChange =(evt)=>{
    
    evt.preventDefault();
    setYears(evt.target.value);
    
  }

  const increaseYear =(evt)=>{
    evt.preventDefault();
    let year = Number(curr_year) + 1;
    set_curr_year(year);
    

  }
  const decreaseYear =(evt)=>{
    evt.preventDefault();
    let year = Number(curr_year) - 1;
    set_curr_year(year);
  }
  const increaseMonth =(evt) => {
    evt.preventDefault();
    if(Number(curr_month) === 11){
      let year = Number(curr_year) + 1;
      set_curr_year(year);
      let month = 0;
      set_curr_month(month);
    }else{
      let month = Number(curr_month) + 1;
      set_curr_month(month);
    }
    
  }
  const decreaseMonth = (evt) =>{
    evt.preventDefault();
    if(Number(curr_month) === 0){
      let year = Number(curr_year) - 1;
      set_curr_year(year);
      let month = 11;
      set_curr_month(month);
    }else{
      let month = Number(curr_month) - 1;
      set_curr_month(month);
    }
  }
  useEffect(() => {
    console.log(today);
    let new_start_day = new Date(curr_year,curr_month,1).getDay();
    setStartDay(new_start_day);
    let new_days = new Date(curr_year,curr_month+1,0).getDate();
    setDays(new_days);
    let new_head_blank = new_start_day;
    setHeadBlank(new_head_blank);
    let new_rows = Math.ceil((new_head_blank+new_days)/7);
    set_rows(new_rows);
    let new_tail_blank = new_rows*7 - new_days-new_head_blank;
    setTailBlank(new_tail_blank);
    
  }, [curr_month,curr_year])
  const showInput = (evt) => {
    evt.preventDefault();
    setShow(!show);
  }
  return (
    <div id="main">
      <h1 id="heading">Calendar{curr_month}</h1>
      <select id="month" onChange={monthHandler} value={curr_month}>
        {month.map((value, index) => (
          <option key={index} value={index}>
            {value}
          </option>
        ))}
      </select>
      <span id="year" onDoubleClick={setShow}>{curr_year}</span>
         {show?<input id="year-text-box" type="text" value={years} onKeyDown={yearHandler} onChange={yearChange}/>:null}
         
   
     
      <table>
        
          <tr>
            <th>Sunday</th>
            <th>Monday</th>
            <th>Tuedday</th>
            <th>Wednesday</th>
            <th>Thursday</th>
            <th>Friday</th>
            <th>Saturday</th>
          </tr>
        

        
          {[...Array(Number(rows))].map((_, key1) => (
            <tr>
              {key1 === 0
                ? [...Array(Number(head_blank))].map((_, key2) => <td id={`cell${key2+1}`}></td>)
                : key1 !== rows - 1
                ? [...Array(7)].map((_, key3) => (
                    <>
                      {key1*7+key3+1-head_blank == Number(today)?<td id="today">{key1 * 7 - head_blank + key3 +1}</td>:
                      <td id={`cell${(key1)*7+key3+1}`}>{key1 * 7 - head_blank + key3 +1}</td>}
                    </>
                    
                  ))
                : [...Array(7-Number(tail_blank))].map((_,key5)=>(

                  <>
                  {key1*7+key5+1-head_blank == Number(today)?<td id="today">{key1 * 7 - head_blank + key5 +1}</td>:
                  <td id={`cell${(key1)*7+key5+1}`}>{key1 * 7 - head_blank + key5 +1}</td>}</>
                )
                )}
              {key1 === 0
                ? [...Array(Number(7 - head_blank))].map((_, key4) => (
                    <>
                    {key4+1 == Number(today)? <td id="today">{key4 + 1}</td>:
                    <td id={`cell${key4+head_blank+1}`}>{key4 + 1}</td>}
                    </>
                  ))
                : null}
                {key1 === (rows-1)
                ? [...Array(Number(tail_blank))].map((_, key5) => (
                    <td id={`cell${rows*7-tail_blank+key5+1}`}></td>
                  ))
                : null}
            </tr>
          ))}
        
      </table>

      <button onClick={decreaseYear} id="previous-year">&lt;&lt;</button>
      <button onClick={decreaseMonth} id="previous-month">&lt;</button>
      <button onClick={increaseMonth} id="next-month">&gt;</button>
      <button onClick={increaseYear} id="next-year">&gt;&gt;</button>
    </div>
  );
}



export default App;
