import { useState, useRef, useEffect } from 'react'
import AppLayout from '../components/AppLayout'
import { Search as SearchIcon, Filter, Clock, Tag, Eye, X, Mic } from 'lucide-react'

interface SearchResult {
  id: string
  thumbnail: string
  timestamp: string
  objectLabel: string
  confidence: number
  camera: string
  description: string
}

const mockResults: SearchResult[] = [
  {
    id: '1',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAsjPv0CBhPXJKq6AD4C-QZpSc0XrBbTUUbFLXa0rONSu_i9p2xgnUm2zs4jmEWa8wWuvr5fCIncEzc6iXEiLXsjCbIUwo9ie0GH8krqBoWVePPlbBvTgBm0OGAyeyMBqIpY85cqVUN7szf9-F1QWbWCC_0A37uLekYQ_KNQAHAx8oHxVYX0G-frMW4aVFeYxxsJxt_mmaERnyuIbDA5b0N-Qh1PalFqNji8L-baLCWkRB-Qn3OZttai0LMCiPjvQuhohoLkeOvJ3c',
    timestamp: '02:14:55 AM',
    objectLabel: 'Person Detected',
    confidence: 95,
    camera: 'CAM-04',
    description: 'Unauthorized individual detected in Sector 4 perimeter'
  },
  {
    id: '2',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCw8xhzicb8VG584K6l6xpeGL0Hp9iu-z3ORXh0aWJLnv0uaHlsj29JC_K8SUT5O-AkB2SUUNik34QN5ZSe6ySOniczZ_qOt31YqIGvWJEuUf7uuSxUnkYXBF54TviRMhXY93U_AapVX0Lcv6QQ5KZ7em_07xShC600w2qlnZtMgxOC8Q3YJOHSgIGsfra3n_7o5AcbTUT-BM6vL0A0NVWH3fw5_syl7OxLVB2d8zPYS2SkM0ZcOJCLXTBoW6N1UL9goiO5L33aKGc',
    timestamp: '01:55:00 AM',
    objectLabel: 'Vehicle',
    confidence: 88,
    camera: 'CAM-09',
    description: 'Vehicle lingering in Perimeter Zone C for >5 mins'
  },
  {
    id: '3',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmF2Ge4d8UXHV7DNa-R_p4_DnlHTBYka9BYxW6kiwWj-pMYwy2rC0CkA_txQczppSNdcOeVb1EZKMSnyiWQSwvika4-Bu42ZlXXgVxAchcafx_Ua03yrMRw7u7ouOl37JaOkfgNhLe-jDfULZxiL3p8ZZZ0ThGMuJSxLMOZisOrLrR4Dobafk-pNMe_gXSJjiVnAOxT5sGRd7dFwIrwW68yfGfrF5r870M_mnE91cumVPQkWwqnKTpoIxTH8EUWhN-xW3QlkXhJ1M',
    timestamp: '01:42:15 AM',
    objectLabel: 'Package/Bag',
    confidence: 92,
    camera: 'CAM-02',
    description: 'Unattended package detected near main entrance'
  },
]

const filterChips = [
  { label: 'Last 24h', value: '24h' },
  { label: 'Person', value: 'person' },
  { label: 'Vehicle', value: 'vehicle' },
  { label: 'Object', value: 'object' },
  { label: 'CAM-01', value: 'cam1' },
  { label: 'CAM-04', value: 'cam4' },
]

export default function Search() {
  const [query, setQuery] = useState('')
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [results] = useState<SearchResult[]>(mockResults)
  const [selectedResult, setSelectedResult] = useState<SearchResult | null>(null)

  // Voice search state
  const [isListening, setIsListening] = useState(false)
  const [voiceError, setVoiceError] = useState<string | null>(null)
  const recognitionRef = useRef<any>(null)

  // Initialize speech recognition
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition()
      recognition.lang = 'en-US'
      recognition.interimResults = false
      recognition.continuous = false

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setQuery(transcript)
        setIsListening(false)
      }

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error)
        setVoiceError(event.error === 'not-allowed' ? 'Mic permission denied' : 'Voice input failed')
        setIsListening(false)
      }

      recognition.onend = () => {
        setIsListening(false)
      }

      recognitionRef.current = recognition
    }
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort()
      }
    }
  }, [])

  const toggleVoiceSearch = () => {
    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
      setIsListening(false)
      return
    }

    setVoiceError(null)
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (!SpeechRecognition) {
      setVoiceError('Voice search not supported in this browser')
      return
    }

    try {
      recognitionRef.current?.start()
      setIsListening(true)
      // Stop listening after 5 seconds of silence
      setTimeout(() => {
        if (recognitionRef.current && isListening) {
          recognitionRef.current.stop()
          setIsListening(false)
        }
      }, 5000)
    } catch (err) {
      setVoiceError('Failed to start voice input')
      setIsListening(false)
    }
  }

  const toggleFilter = (value: string) => {
    setActiveFilters(prev =>
      prev.includes(value)
        ? prev.filter(f => f !== value)
        : [...prev, value]
    )
  }

  const getConfidenceColor = (conf: number) => {
    if (conf >= 90) return 'text-green-400'
    if (conf >= 70) return 'text-yellow-400'
    return 'text-red-400'
  }

  // Filter results based on query and active filters
  const filteredResults = results.filter(result => {
    if (!query.trim()) return true
    const queryLower = query.toLowerCase()
    return (
      result.objectLabel.toLowerCase().includes(queryLower) ||
      result.description.toLowerCase().includes(queryLower) ||
      result.camera.toLowerCase().includes(queryLower)
    )
  })

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h2 className="font-display text-headline-lg text-on-background mb-1">Search Intelligence</h2>
          <p className="font-body-md text-on-surface-muted">Search events, objects, or activities across all camera feeds</p>
        </div>

        {/* Hero Search Bar */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-tertiary/20 blur-3xl opacity-30 rounded-3xl"></div>
          <div className="relative glass-card p-8 rounded-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-primary/20 rounded-xl">
                <SearchIcon className="text-primary-light" size={24} />
              </div>
              <div>
                <h3 className="font-headline-md text-on-background">Command Center Search</h3>
                <p className="text-sm text-on-surface-muted">AI-powered semantic search across all video feeds</p>
              </div>
            </div>

            {/* Search Input - No Icon */}
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && query.trim()}
                placeholder="Search events, objects, or activities..."
                className="input-primary pr-32 text-lg"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                {isListening && (
                  <span className="text-xs text-primary-light animate-pulse font-mono-data">Listening...</span>
                )}
                {voiceError && (
                  <span className="text-xs text-red-400 font-mono-data">{voiceError}</span>
                )}
                <button
                  onClick={toggleVoiceSearch}
                  className={`transition-all duration-300 ${
                    isListening
                      ? 'text-primary-light scale-110 drop-shadow-[0_0_8px_rgba(96,165,250,0.6)] animate-pulse'
                      : 'text-on-surface-muted hover:text-primary-light hover:scale-105'
                  }`}
                  title={isListening ? 'Stop listening' : 'Search with voice'}
                >
                  <Mic size={18} className={isListening ? 'animate-pulse' : ''} />
                </button>
                {query && (
                  <button
                    onClick={() => setQuery('')}
                    className="text-on-surface-muted hover:text-on-background transition-colors"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
            </div>

            {/* Autocomplete Suggestions */}
            {query && (
              <div className="mt-3 glass-panel rounded-lg p-2 space-y-1">
                  {['person walking near gate', 'vehicle license plate OV-772X', 'package left unattended', 'motion in sector 4'].map((suggestion, i) => (
                  <button
                    key={i}
                    onClick={() => setQuery(suggestion)}
                    className="w-full text-left px-4 py-2 rounded-lg hover:bg-white/5 text-on-surface text-sm transition-colors flex items-center gap-3"
                  >
                    <SearchIcon size={14} className="text-on-surface-muted" />
                    {suggestion}
                  </button>
                ))}
              </div>
            )}

            {/* Filter Chips */}
            <div className="flex flex-wrap gap-2 mt-6">
              <span className="text-xs font-mono-data text-on-surface-muted uppercase tracking-widest mr-2 flex items-center gap-1">
                <Filter size={12} /> Filters:
              </span>
              {filterChips.map((chip) => (
                <button
                  key={chip.value}
                  onClick={() => toggleFilter(chip.value)}
                  className={`filter-chip ${activeFilters.includes(chip.value) ? 'active' : ''}`}
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-headline-md text-on-background">
              Search Results
              <span className="ml-3 text-sm font-mono-data text-on-surface-muted">({filteredResults.length} found)</span>
            </h3>
          </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResults.length > 0 ? (
            filteredResults.map((result) => (
              <div key={result.id} className="glass-card rounded-xl overflow-hidden group cursor-pointer" onClick={() => setSelectedResult(result)}>
                <div className="relative aspect-video overflow-hidden bg-surface-container-highest">
                  <img
                    src={result.thumbnail}
                    alt={result.objectLabel}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 bg-black/60 backdrop-blur-md rounded text-[10px] font-mono-data text-white border border-white/10">
                      {result.camera}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className="flex items-center gap-1 text-white/80 text-xs font-mono-data">
                      <Clock size={12} />
                      {result.timestamp}
                    </span>
                    <span className={`text-xs font-mono-data font-bold ${getConfidenceColor(result.confidence)}`}>
                      {result.confidence}%
                    </span>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 rounded-full bg-primary-light/80 flex items-center justify-center backdrop-blur-sm">
                      <Eye size={20} className="text-white ml-1" />
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Tag size={14} className="text-primary-light" />
                    <span className="text-sm font-medium text-primary-light">{result.objectLabel}</span>
                  </div>
                  <p className="text-sm text-on-surface-muted mb-3">{result.description}</p>
                  <button className="btn-secondary w-full justify-center text-sm py-2">
                    <Eye size={14} />
                    View Clip
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-on-surface-muted text-lg">No results found</p>
              <p className="text-sm text-on-surface-muted mt-2">Try adjusting your search query or filters</p>
            </div>
          )}
        </div>
        </div>

        {/* Selected Result Modal */}
        {selectedResult && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedResult(null)}></div>
            <div className="relative glass-card rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setSelectedResult(null)}
                className="absolute top-4 right-4 text-on-surface-muted hover:text-on-background transition-colors"
              >
                <X size={20} />
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="aspect-video rounded-lg overflow-hidden bg-surface-container-highest">
                  <img src={selectedResult.thumbnail} alt={selectedResult.objectLabel} className="w-full h-full object-cover" />
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-headline-md text-on-background mb-2">{selectedResult.objectLabel}</h3>
                    <p className="text-on-surface-muted">{selectedResult.description}</p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-on-surface-muted">Timestamp</span>
                      <span className="text-sm font-mono-data text-on-background">{selectedResult.timestamp}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-on-surface-muted">Camera</span>
                      <span className="text-sm font-mono-data text-on-background">{selectedResult.camera}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-on-surface-muted">Confidence</span>
                      <span className={`text-sm font-mono-data font-bold ${getConfidenceColor(selectedResult.confidence)}`}>
                        {selectedResult.confidence}%
                      </span>
                    </div>
                  </div>
                  <button className="btn-primary w-full justify-center mt-4">
                    View at Timestamp
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  )
}
