import { useEffect, useState } from 'react';
import './app.css';
import axios from 'axios';

const App = () => {

  const [input, setInput] = useState('')
  const [currentShortUrl, setCurrentShortUrl] = useState(null)
  const [copyId, setCopyId] = useState(null)
  const [urls, setUrls] = useState([])
  const [isLoading, setIsLoading] = useState(true);


  const handelsubmit = async (e) => {
    e.preventDefault();

    const response = await axios.post('http://localhost:5173/api/url', { url: input })

    setCurrentShortUrl(`http://localhost:3000/${response.data.data.shortCode}`)

    setInput('')
    fetchData()

  }

  const handelCopyToClipboard = async (text, id) => {

    await navigator.clipboard.writeText(text)

    setCopyId(id);

    setTimeout(() => { setCopyId(null) }, 2000)
  }

  const fetchData = async () => {
    const response = await axios.get('http://localhost:5173/api/url')
    setIsLoading(false)
    setUrls(response.data.data)
  }

  const handelDelete = async (id) => {
    await axios.delete(`http://localhost:5173/api/url/${id}`)
    fetchData()
  }


  useEffect(() => {
    //initial fetching the data
    fetchData()

    const handelFocus = () => {
      fetchData()
    }

    //fetch data again ehen user weitch back to the tab again so we can show updated clicks again
    window.addEventListener('focus', handelFocus)

    //removing the event on unmounting
    return () => window.removeEventListener('focus', handelFocus)
  }, [])




  return (
    <div className="min-h-screen bg-[#FBF9F5] text-stone-900 px-6 py-12 flex justify-center font-sans antialiased">
      <div className="w-full max-w-3xl space-y-6">

        {/* 1. Hero Section */}
        <section className="space-y-1.5">
          <h1 className="text-3xl sm:text-4xl font-black font-serif tracking-tight text-stone-950">
            Long links?
          </h1>
          <p className="text-stone-600 text-sm sm:text-base font-normal">
            Paste a link, get a short one, see how many people clicked it.
          </p>
        </section>

        {/* 2. Shorten Form Input Card */}
        <section>
          <form
            onSubmit={(e) => { handelsubmit(e) }}
            className="flex flex-col sm:flex-row gap-2.5 items-stretch"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => { setInput(e.target.value) }}
              placeholder="Paste a long URL here..."
              className="flex-1 px-4 py-3 bg-[#FDFCFA] border border-stone-300 rounded-lg text-sm text-stone-800 placeholder-stone-400 outline-none focus:border-stone-500 focus:ring-1 focus:ring-stone-400 transition"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-[#111111] hover:bg-black text-white font-medium text-sm rounded-lg transition shrink-0 cursor-pointer"
            >
              Shorten
            </button>
          </form>
        </section>

        {/* 3. Result Card (Newly Created Short Link) */}
        {
          currentShortUrl &&
          <section className="flex items-center justify-between px-4 py-3.5 bg-[#F6F2EB] border border-stone-200/80 rounded-lg">
            <a href={currentShortUrl} target='_blank' className="font-mono text-sm sm:text-base text-amber-800 font-medium tracking-tight">
              {currentShortUrl}
            </a>
            <button
              type="button"
              className="px-3.5 py-1.5 bg-[#FDFCFA] hover:bg-stone-100 border border-stone-300 rounded-md text-xs font-medium text-stone-700 transition cursor-pointer disabled:cursor-default"
              onClick={() => { handelCopyToClipboard(currentShortUrl, 'current') }}
              disabled={copyId === 'current'}
            >
              {copyId === 'current' ? "copied" : "Copy"}
            </button>
          </section>
        }

        {/* 4. Links List Section */}
        <section className="pt-2 space-y-3">
          <h2 className="text-lg font-bold font-serif text-stone-900">
            Your links ({urls.length})
          </h2>

          <div className="divide-y divide-stone-200/70 border-t border-stone-200/70">
            {isLoading ? (
              <div className="py-8 text-center text-stone-500 font-mono text-sm">
                Loading links...
              </div>
            ) : urls.length === 0 ? (
              <div className="py-8 text-center text-stone-500 text-sm">
                No links yet. Shorten your first one above.
              </div>
            ) : (
              urls.map((item, index) => (
                <div
                  key={item._id || index}
                  className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm"
                >
                  <div className="flex items-baseline gap-4 min-w-0 flex-1 pr-4">
                    <a href={`http://localhost:3000/${item.shortCode}`} target='_blank' className="font-mono text-amber-800 font-medium shrink-0">
                      {item.shortCode}
                    </a>
                    <span className="text-stone-600 truncate font-mono text-xs sm:text-sm">
                      {item.originalUrl.replace(/^https?:\/\//, '')}
                    </span>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-5 shrink-0">
                    <span className="font-mono text-xs sm:text-sm text-stone-700 tabular-nums">
                      {item.clicks} clicks
                    </span>
                    <div className="flex items-center bg-[#FDFCFA] border border-stone-300 rounded-md overflow-hidden text-xs font-medium text-stone-700 divide-x divide-stone-300">
                      <button
                        type="button"
                        className="px-3.5 py-1.5 bg-[#FDFCFA] hover:bg-stone-100 border border-stone-300 rounded-md text-xs font-medium text-stone-700 transition cursor-pointer disabled:cursor-default"
                        onClick={() => { handelCopyToClipboard(`http://localhost:3000/${item.shortCode}`, item._id) }}
                        disabled={copyId === item._id}
                      >
                        {copyId === item._id ? "copied" : "Copy"}
                      </button>
                      <button
                        type="button"
                        className="px-2.5 py-1 hover:bg-red-50 hover:text-red-600 transition cursor-pointer"
                        onClick={() => { handelDelete(item._id) }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

      </div>
    </div>
  );
};

export default App;