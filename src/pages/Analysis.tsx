import { useState, useRef } from 'react'
import AppLayout from '../components/AppLayout'
import {
  Upload, Trash2, Video, AlertTriangle, Eye,
  Filter, Zap, CheckCircle, Loader, FileVideo, Scan
} from 'lucide-react'

interface VideoFile {
  id: string
  name: string
  size: number
  duration: number
  thumbnail: string
  uploadDate: Date
  status: 'uploaded' | 'analyzing' | 'analyzed'
  analysis?: {
    scenes: Scene[]
    detections: Detection[]
    dangerousItems: DangerousItem[]
  }
}

interface Scene {
  id: string
  startTime: number
  endTime: number
  thumbnail: string
  description: string
}

interface Detection {
  id: string
  type: 'person' | 'object' | 'vehicle'
  label: string
  confidence: number
  timestamp: number
  boundingBox: { x: number; y: number; width: number; height: number }
}

interface DangerousItem {
  id: string
  type: 'weapon' | 'fire' | 'threat'
  label: string
  confidence: number
  timestamp: number
  boundingBox: { x: number; y: number; width: number; height: number }
}

export default function Analysis() {
  const [videos, setVideos] = useState<VideoFile[]>([
    {
      id: '1',
      name: 'security_footage_001.mp4',
      size: 245000000,
      duration: 180,
      thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxyzUHffnK5Rr0sLHXY26fV9c4YDXGGHeaxetXE9m9z0882UV1rxiykD3vXDwWh7L9dQwiRJX-MDFFu8BzIB8qMcvQ3z1u2zm-bswgGcz-kUpqQM7HKrLui5Vp3Hf41a39Ydrm2LJX1qkwhE4ZQATLSCpCDSBgqumVvWYRlX-gi15ST_5C7rO7uUsbrqCskZ8CQkC0AnK8D6JWxzowZVl4WN3LAXI47JDAtw4CLZ424wMIkWc4CQDC5gYtwzFbZX65x5gZwtHJTGo',
      uploadDate: new Date('2024-04-27T10:30:00'),
      status: 'analyzed',
      analysis: {
        scenes: [
          { id: 's1', startTime: 0, endTime: 45, thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAsjPv0CBhPXJKq6AD4C-QZpSc0XrBbTUUbFLXa0rONSu_i9p2xgnUm2zs4jmEWa8wWuvr5fCIncEzc6iXEiLXsjCbIUwo9ie0GH8krqBoWVePPlbBvTgBm0OGAyeyMBqIpY85cqVUN7szf9-F1QWbWCC_0A37uLekYQ_KNQAHAx8oHxVYX0G-frMW4aVFeYxxsJxt_mmaERnyuIbDA5b0N-Qh1PalFqNji8L-baLCWkRB-Qn3OZttai0LMCiPjvQuhohoLkeOvJ3c', description: 'Entrance area' },
          { id: 's2', startTime: 45, endTime: 120, thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCw8xhzicb8VG584K6l6xpeGL0Hp9iu-z3ORXh0aWJLnv0uaHlsj29JC_K8SUT5O-AkB2SUUNik34QN5ZSe6ySOniczZ_qOt31YqIGvWJEuUf7uuSxUnkYXBF54TviRMhXY93U_AapVX0Lcv6QQ5KZ7em_07xShC600w2qlnZtMgxOC8Q3YJOHSgIGsfra3n_7o5AcbTUT-BM6vL0A0NVWH3fw5_syl7OxLVB2d8zPYS2SkM0ZcOJCLXTBoW6N1UL9goiO5L33aKGc', description: 'Parking lot' },
        ],
        detections: [
          { id: 'd1', type: 'person', label: 'Person', confidence: 0.95, timestamp: 15, boundingBox: { x: 100, y: 80, width: 60, height: 120 } },
          { id: 'd2', type: 'vehicle', label: 'Car', confidence: 0.88, timestamp: 75, boundingBox: { x: 200, y: 150, width: 120, height: 80 } }
        ],
        dangerousItems: [
          { id: 'danger1', type: 'weapon', label: 'Knife', confidence: 0.92, timestamp: 135, boundingBox: { x: 150, y: 100, width: 40, height: 80 } }
        ]
      }
    }
  ])

  const [selectedVideo, setSelectedVideo] = useState<VideoFile | null>(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [filterType, setFilterType] = useState<'all' | 'person' | 'object' | 'danger'>('all')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragOver(true) }
  const handleDragLeave = (e: React.DragEvent) => { e.preventDefault(); setIsDragOver(false) }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const files = Array.from(e.dataTransfer.files)
    handleFiles(files)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : []
    handleFiles(files)
  }

  const handleFiles = async (files: File[]) => {
    const videoFiles = files.filter(file => file.type.startsWith('video/'))
    for (const file of videoFiles) {
      setIsUploading(true)
      setUploadProgress(0)
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => prev >= 100 ? (clearInterval(progressInterval), 100) : prev + 10)
      }, 200)
      await new Promise(resolve => setTimeout(resolve, 2000))
      const newVideo: VideoFile = {
        id: Date.now().toString(),
        name: file.name,
        size: file.size,
        duration: 0,
        thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmF2Ge4d8UXHV7DNa-R_p4_DnlHTBYka9BYxW6kiwWj-pMYwy2rC0CkA_txQczppSNdcOeVb1EZKMSnyiWQSwvika4-Bu42ZlXXgVxAchcafx_Ua03yrMRw7u7ouOl37JaOkfgNhLe-jDfULZxiL3p8ZZZ0ThGMuJSxLMOZisOrLrR4Dobafk-pNMe_gXSJjiVnAOxT5sGRd7dFwIrwW68yfGfrF5r870M_mnE91cumVPQkWwqnKTpoIxTH8EUWhN-xW3QlkXhJ1M',
        uploadDate: new Date(),
        status: 'uploaded'
      }
      setVideos(prev => [newVideo, ...prev])
      setIsUploading(false)
      setUploadProgress(0)
    }
  }

  const analyzeVideo = async (videoId: string) => {
    setVideos(prev => prev.map(v => v.id === videoId ? { ...v, status: 'analyzing' as const } : v))
    await new Promise(resolve => setTimeout(resolve, 3000))
    const mockAnalysis = {
      scenes: [
        { id: 's1', startTime: 0, endTime: 60, thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAsjPv0CBhPXJKq6AD4C-QZpSc0XrBbTUUbFLXa0rONSu_i9p2xgnUm2zs4jmEWa8wWuvr5fCIncEzc6iXEiLXsjCbIUwo9ie0GH8krqBoWVePPlbBvTgBm0OGAyeyMBqIpY85cqVUN7szf9-F1QWbWCC_0A37uLekYQ_KNQAHAx8oHxVYX0G-frMW4aVFeYxxsJxt_mmaERnyuIbDA5b0N-Qh1PalFqNji8L-baLCWkRB-Qn3OZttai0LMCiPjvQuhohoLkeOvJ3c', description: 'Main entrance' },
        { id: 's2', startTime: 60, endTime: 120, thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCw8xhzicb8VG584K6l6xpeGL0Hp9iu-z3ORXh0aWJLnv0uaHlsj29JC_K8SUT5O-AkB2SUUNik34QN5ZSe6ySOniczZ_qOt31YqIGvWJEuUf7uuSxUnkYXBF54TviRMhXY93U_AapVX0Lcv6QQ5KZ7em_07xShC600w2qlnZtMgxOC8Q3YJOHSgIGsfra3n_7o5AcbTUT-BM6vL0A0NVWH3fw5_syl7OxLVB2d8zPYS2SkM0ZcOJCLXTBoW6N1UL9goiO5L33aKGc', description: 'Corridor' }
      ],
      detections: [
        { id: 'd1', type: 'person' as const, label: 'Person', confidence: 0.94, timestamp: 25, boundingBox: { x: 120, y: 90, width: 55, height: 110 } },
        { id: 'd2', type: 'object' as const, label: 'Bag', confidence: 0.87, timestamp: 85, boundingBox: { x: 180, y: 140, width: 45, height: 35 } }
      ],
      dangerousItems: []
    }
    setVideos(prev => prev.map(v => v.id === videoId ? { ...v, status: 'analyzed' as const, analysis: mockAnalysis } : v))
  }

  const deleteVideo = (videoId: string) => {
    setVideos(prev => prev.filter(v => v.id !== videoId))
    if (selectedVideo?.id === videoId) setSelectedVideo(null)
  }

  const formatFileSize = (bytes: number) => {
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="font-display text-headline-lg text-on-background mb-1">AI Video Analysis</h2>
            <p className="text-on-surface-muted text-body-md">Upload videos for automated threat detection and scene analysis</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="glass-panel px-4 py-2 rounded-lg flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-primary-light animate-pulse"></div>
              <span className="font-mono-data text-xs text-primary-light uppercase tracking-widest">AI Engine Active</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-6">
            {/* Upload Area */}
            <div
              className={`glass-card rounded-xl p-8 text-center transition-all duration-300 ${isDragOver ? 'border-primary-light bg-primary/10' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {isUploading ? (
                <div className="space-y-4">
                  <Loader className="w-12 h-12 text-primary-light animate-spin mx-auto" />
                  <div>
                    <p className="text-on-background font-medium mb-2">Uploading video...</p>
                    <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                      <div className="bg-primary-light h-2 rounded-full transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
                    </div>
                    <p className="text-on-surface-muted text-sm mt-2">{uploadProgress}% complete</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                    <Upload className="w-8 h-8 text-primary-light" />
                  </div>
                  <div>
                    <h3 className="text-on-background font-medium mb-2">Upload Security Footage</h3>
                    <p className="text-on-surface-muted text-sm mb-4">Drag and drop video files here, or click to browse</p>
                    <input ref={fileInputRef} type="file" multiple accept="video/*" onChange={handleFileSelect} className="hidden" />
                    <button onClick={() => fileInputRef.current?.click()} className="btn-primary">
                      <FileVideo size={16} />
                      Choose Files
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Video Library */}
            <div className="glass-card rounded-xl p-6">
              <h3 className="font-headline-md text-on-background mb-6">Video Library</h3>
              <div className="space-y-4">
                {videos.map((video) => (
                  <div key={video.id} className="card-base flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-12 bg-surface-container-highest rounded overflow-hidden flex items-center justify-center">
                        <Video className="w-6 h-6 text-on-surface-muted" />
                      </div>
                      <div>
                        <h4 className="text-on-background font-medium truncate max-w-xs">{video.name}</h4>
                        <p className="text-on-surface-muted text-sm">
                          {formatFileSize(video.size)} • {formatDuration(video.duration)} • {video.uploadDate.toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {video.status === 'uploaded' && (
                        <span className="px-2 py-1 bg-error-low/20 text-error-low text-xs rounded-full font-medium">Uploaded</span>
                      )}
                      {video.status === 'analyzing' && (
                        <div className="flex items-center gap-2">
                          <Loader className="w-4 h-4 animate-spin text-primary-light" />
                          <span className="text-primary-light text-xs">Analyzing...</span>
                        </div>
                      )}
                      {video.status === 'analyzed' && (
                        <span className="px-2 py-1 bg-badge-low text-error-low text-xs rounded-full flex items-center gap-1 font-medium">
                          <CheckCircle className="w-3 h-3" />
                          Analyzed
                        </span>
                      )}
                      <button onClick={() => setSelectedVideo(video)} className="p-2 text-on-surface-muted hover:text-primary-light hover:bg-white/5 rounded-lg transition-colors" title="View analysis">
                        <Scan size={16} />
                      </button>
                      {video.status === 'uploaded' && (
                        <button onClick={() => analyzeVideo(video.id)} className="p-2 text-on-surface-muted hover:text-primary-light hover:bg-white/5 rounded-lg transition-colors" title="Analyze">
                          <Zap size={16} />
                        </button>
                      )}
                      <button onClick={() => deleteVideo(video.id)} className="p-2 text-on-surface-muted hover:text-error hover:bg-white/5 rounded-lg transition-colors" title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Analysis Panel */}
          <div className="lg:col-span-4 space-y-6">
            {selectedVideo?.analysis && (
              <div className="glass-card rounded-xl p-6">
                <h3 className="font-headline-md text-on-background mb-4">Detection Timeline</h3>
                <div className="flex gap-2 mb-4 flex-wrap">
                  {[
                    { key: 'all', label: 'All', icon: Filter },
                    { key: 'person', label: 'People', icon: Eye },
                    { key: 'object', label: 'Objects', icon: AlertTriangle },
                  ].map(({ key, label, icon: Icon }) => (
                    <button
                      key={key}
                      onClick={() => setFilterType(key as any)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${filterType === key ? 'bg-primary text-white' : 'bg-surface-container text-on-surface-muted hover:text-on-background'}`}
                    >
                      <Icon className="w-4 h-4" />
                      {label}
                    </button>
                  ))}
                </div>
                <div className="space-y-3">
                  {selectedVideo.analysis.detections.filter(d => filterType === 'all' || d.type === filterType).map((detection) => (
                    <div key={detection.id} className="flex items-center gap-3 p-3 bg-surface-container rounded-lg hover:bg-surface-container-high transition-colors">
                      <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                        <Eye className="w-4 h-4 text-primary-light" />
                      </div>
                      <div className="flex-1">
                        <p className="text-on-background font-medium text-sm">{detection.label}</p>
                        <p className="text-on-surface-muted text-xs">{formatDuration(detection.timestamp)}</p>
                      </div>
                      <span className="text-primary-light font-mono-data text-sm font-bold">{Math.round(detection.confidence * 100)}%</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Stats */}
            <div className="glass-card rounded-xl p-6">
              <h3 className="font-headline-md text-on-background mb-4">Analysis Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-on-surface-muted">Total Videos</span>
                  <span className="text-on-background font-mono-data font-bold">{videos.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-on-surface-muted">Analyzed</span>
                  <span className="text-primary-light font-mono-data font-bold">{videos.filter(v => v.status === 'analyzed').length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-on-surface-muted">Threats Detected</span>
                  <span className="text-error font-mono-data font-bold">{videos.reduce((acc, v) => acc + (v.analysis?.dangerousItems.length || 0), 0)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
