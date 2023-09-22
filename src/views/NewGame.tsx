import React from 'react';

export default function ControlsUi({ setShowModal } : { setShowModal: React.Dispatch<React.SetStateAction<boolean>>}) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [apiData, setApiData] = React.useState();
  const [serverError, setServerError] = React.useState();

  const fetchData = async (difficulty: string) => {
    try {
      const data = await (await fetch(`https://sugoku.onrender.com/board?difficulty=${difficulty}`)).json();
      setApiData(data);
      setIsLoading(false);
    } catch (err: any) {
      setServerError(err);
      setIsLoading(false);
    }
  };
  console.log('need to load this in context', apiData);
  return (
    <div className={`overlay ${isLoading ? "in-active" : "active"}`}>
      <div>
        <div>
          <button onClick={() => setShowModal(false)}>Back</button>
        </div>
        <div>
          <button onClick={() => fetchData('easy')}>Easy</button>
          <button onClick={() => fetchData('medium')}>Medium</button>
          <button onClick={() => fetchData('hard')}>Hard</button>
          {serverError && <div>Server Error</div>}
        </div>
      </div>
      <div className={`overlay ${isLoading ? "active" : "in-active"}`}></div>
    </div>
  );
}
