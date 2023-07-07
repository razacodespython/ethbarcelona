

export default function Home() {
  const messages = "text"
  
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(messages),
  };

  const apiCall = async () => {
    //goes to folder
    console.log("clicked");
    const response = await fetch("/api/hello", options);
    const data = await response.json();
    console.log(data)
  };
  return (
    <>
     <h1>Hello World</h1>
     <button  type="submit" onClick={apiCall}> apicall </button>
    </>
  )
}
