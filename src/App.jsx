import { useState,useCallback,useEffect,useRef} from 'react'
import Footer from './components/Footer';


function App() {
  const [length, setLength] = useState(8);
  const[number,setNumber]=useState(false);
  const[char,setChar]=useState(false);
  const[password,setPassword]=useState();



  const passwordgenerator=useCallback(()=>{
    let pass="";
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if (number) str+='0123456789';
    if(char) str+='!@#$%^&*()_+=';
    for (let i = 1; i < length; i++){
       let randnum=Math.floor(Math.random()*str.length+1);
       pass+=str.charAt(randnum);
1     
    }
    setPassword(pass);
  }
  ,[length,number,char,setPassword])
  useEffect(()=>{passwordgenerator()},[number,char,length,passwordgenerator])
  const passref=useRef(null);
  const copy=useCallback(()=>{
    passref.current?.select();
    passref.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password)

  },[password]);
  

  return (
    <div className='' 
        >
        <h1 className="  text-center text-6xl text-white pt-8 font-mono pb-8">Random Password Generator</h1>
        <h3 className="text-center text-white font-mono text-xl pb-8">Create strong and secure passwords to keep your account safe online.</h3>
      <div className="   w-full mx-auto  rounded-xl px-4 py-2  shadow-md bg-slate-800 text-orange-700 max-w-xl">
        
      
        <div className="flex gap-2 shadow-xl mb-4 pt-4">
        <input
            type="text"
            value={password}
            className="outline-none w-full py-3 px-3 rounded-full"
              placeholder="Password"
              readOnly
              ref={passref}
        />
        <button className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"  
         onClick={copy}
         >copy</button>

        </div>
        <div className='flex flex-col text-l gap-5'>
      <div className='flex items-center gap-x-3'>
      <label>Length: {length}</label>
        <input 
        type="range"
        min={6}
        max={100}
        value={length}
         className='cursor-pointer'
         onChange={(e) => {setLength(e.target.value)}}
          />
          
      </div>
      <div className="flex items-center gap-x-1">
        <input 
          type="checkbox"
          defaultChecked={number}
          onChange={()=>{
            setNumber((prev)=>!prev)
          }}
        /><label>Numbers</label>
      </div>
      <div className="flex items-center gap-x-1">
        <input 
          type="checkbox"
          defaultChecked={char}
          onChange={()=>{
            setChar((prev)=>!prev)
          }}
        /><label>Characters</label>
      </div>
      </div>

      
    </div>
    <div className="fixed w-full bottom-0">
    <Footer/>
    </div>
    
    </div>
    
  )
}

export default App
