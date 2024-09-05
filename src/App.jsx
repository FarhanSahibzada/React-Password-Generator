import { useCallback, useEffect, useState,useRef } from 'react'

function App() {
  const [length, setlength] = useState(6)
  const [numberallow, setnumberallow] = useState(false)
  const [specialchar, setspecialchar] = useState(false)
  let [password, setpassword] = useState("");
  let passwordref = useRef(null)

  let copyclipboard = useCallback(()=>{
    passwordref.current?.select();
    passwordref.current?.setSelectionRange(0,20);
    window.navigator.clipboard.writeText(password)
  },[password])
  let passwordgenerator = useCallback(() => {
    let pass = "";
    let alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberallow) { alpha += "0123456789" }
    if (specialchar) { alpha += "!@#$%&*" }

    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random() * alpha.length);
      pass += alpha.charAt(char);
    }
    setpassword(pass)
  }, [length, numberallow, specialchar,setpassword])
  useEffect(() => {
    passwordgenerator()
  }, [length, numberallow, specialchar,setpassword])
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
        <h1 className="text-4xl mb-6 font-bold">Password Generator</h1>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="mb-4 flex justify-between items-center">
            <input
              type="text"
              value={password}
              readOnly
              ref={passwordref}
              className="text-lg p-2 w-full bg-gray-700 rounded-lg focus:outline-none"
            />
            <button
            onClick={copyclipboard}
              className="ml-4 bg-yellow-500 text-black p-2 rounded-lg">
              Copy
            </button>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Password Length: {length}</label>
            <input
              type="range"
              min="6"
              max="20"
              value={length}
              onChange={(e) => setlength(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                onChange={(prev) => setnumberallow(prev => !prev)}
                className="mr-2"
              />
              Include Numbers
            </label>
          </div>

          <div className="mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                onChange={(prev) => setspecialchar(prev => !prev)}
                className="mr-2"
              />
              Include Special Characters
            </label>
          </div>

          <button
          onClick={passwordgenerator}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg w-full">
            Another Password
          </button>
        </div>
      </div>
    </>
  )
}

export default App;
