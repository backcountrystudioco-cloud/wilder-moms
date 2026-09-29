// Trail Craft page
//
// A photo-to-craft flow. Mom takes a picture of what the kids
// pocketed on the trail, sends it to /api/trail-craft (which
// hits OpenAI vision + DALL-E 3), and gets back a sketched
// image of a finished craft + step-by-step directions tuned
// for a tired parent.

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { fadeUpVariants } from '../hooks/useScrollReveal'

const MAX_DIM = 1024
const JPEG_QUALITY = 0.85
const ACCEPT = 'image/*'

function resizeToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const img = new Image()
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas')
        let { width, height } = img
        if (width > MAX_DIM || height > MAX_DIM) {
          const ratio = Math.min(MAX_DIM / width, MAX_DIM / height)
          width = Math.round(width * ratio)
          height = Math.round(height * ratio)
        }
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, width, height)
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              URL.revokeObjectURL(url)
              reject(new Error('Could not compress image'))
              return
            }
            const reader = new FileReader()
            reader.onload = () => {
              URL.revokeObjectURL(url)
              resolve(reader.result)
            }
            reader.onerror = () => {
              URL.revokeObjectURL(url)
              reject(new Error('Could not read image'))
            }
            reader.readAsDataURL(blob)
          },
          'image/jpeg',
          JPEG_QUALITY,
        )
      } catch (err) {
        URL.revokeObjectURL(url)
        reject(err)
      }
    }
    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('Could not load image'))
    }
    img.src = url
  })
}

export default function TrailCraftPage() {
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const fileInputRef = useRef(null)

  async function handleFile(file) {
    if (!file) return
    setError(null)
    setResult(null)
    setLoading(true)

    try {
      const dataUrl = await resizeToDataUrl(file)
      setPreview(dataUrl)

      const res = await fetch('/api/trail-craft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: dataUrl }),
      })

      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}))
        throw new Error(errBody.error || 'Could not generate a craft right now.')
      }

      const data = await res.json()
      setResult(data)
    } catch (err) {
      setError(err.message || 'Something went sideways.')
    } finally {
      setLoading(false)
    }
  }

  function handleReset() {
    setPreview(null)
    setResult(null)
    setError(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  function handleDrop(e) {
    e.preventDefault()
    const file = e.dataTransfer?.files?.[0]
    if (file) handleFile(file)
  }

  function handleDragOver(e) {
    e.preventDefault()
  }

  const idle = !preview && !loading && !result && !error

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-4xl mx-auto px-6 pt-28 pb-16">
        <Link
          to="/"
          className="text-inkll text-xs uppercase tracking-[0.15em] mb-8 inline-flex items-center gap-1 hover:text-ember transition-colors"
        >
          ← Wilder Moms
        </Link>

        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          <p className="text-ember text-xs font-medium uppercase tracking-[0.2em] mb-4">
            Trail Craft
          </p>
          <h1 className="font-serif font-light text-4xl md:text-5xl text-ink leading-tight mb-5">
            What did your kids bring home?
          </h1>
          <p className="text-inkl text-base md:text-lg leading-relaxed mb-10 max-w-xl">
            Drop in a photo of what you collected on the trail — leaves,
            sticks, feathers, rocks. Wilder sketches a simple craft, lists
            what you need, and walks you through it step by step.
          </p>
        </motion.div>

        {idle && (
          <UploadZone
            inputRef={fileInputRef}
            onFile={handleFile}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          />
        )}

        {loading && <LoadingState preview={preview} />}

        {error && !loading && (
          <ErrorCard message={error} onReset={handleReset} />
        )}

        {result && !loading && (
          <ResultCard result={result} preview={preview} onReset={handleReset} />
        )}
      </div>
    </div>
  )
}

function UploadZone({ inputRef, onFile, onDrop, onDragOver }) {
  return (
    <motion.div
      variants={fadeUpVariants}
      initial="hidden"
      animate="visible"
      custom={1}
      onDrop={onDrop}
      onDragOver={onDragOver}
      className="border-2 border-dashed border-inkll/30 rounded-3xl bg-white p-10 md:p-14 text-center"
    >
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT}
        capture="environment"
        onChange={(e) => onFile(e.target.files?.[0])}
        className="hidden"
      />
      <div className="max-w-md mx-auto">
        <div className="w-16 h-16 rounded-full bg-ember/10 mx-auto mb-6 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-ember"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
        <h2 className="font-serif text-2xl text-ink mb-3">
          Drop a photo, or take one.
        </h2>
        <p className="text-inkl text-sm leading-relaxed mb-7">
          Whatever your kids pocketed on the trail. Sticks, leaves, rocks,
          feathers, seed pods, acorns. Even just one thing.
        </p>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="inline-flex items-center gap-2 bg-ember text-white px-8 py-3 rounded-full font-medium text-sm hover:bg-terra transition-colors"
        >
          Choose a photo
        </button>
        <p className="text-inkll font-serif italic text-sm mt-6">
          We don't save your photo. It goes to the AI and back.
        </p>
      </div>
    </motion.div>
  )
}

function LoadingState({ preview }) {
  return (
    <motion.div
      variants={fadeUpVariants}
      initial="hidden"
      animate="visible"
      className="bg-white border border-inkll/10 rounded-3xl overflow-hidden"
    >
      <div className="grid md:grid-cols-2">
        <div className="aspect-square bg-inkll/5 overflow-hidden">
          {preview ? (
            <img
              src={preview}
              alt="Your trail finds"
              className="w-full h-full object-cover"
            />
          ) : null}
        </div>
        <div className="p-8 md:p-10 flex flex-col justify-center">
          <p className="text-ember text-xs font-medium uppercase tracking-[0.2em] mb-3">
            Sketching your craft
          </p>
          <div className="space-y-3">
            <div className="h-4 bg-inkll/10 rounded w-3/4 animate-pulse" />
            <div className="h-4 bg-inkll/10 rounded w-5/6 animate-pulse" />
            <div className="h-4 bg-inkll/10 rounded w-2/3 animate-pulse" />
          </div>
          <p className="text-inkll text-sm mt-6 italic">
            Takes about 20-30 seconds.
          </p>
        </div>
      </div>
    </motion.div>
  )
}

function ResultCard({ result, preview, onReset }) {
  const hasImage = Boolean(result.imageUrl)
  return (
    <motion.div
      variants={fadeUpVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <div className="grid md:grid-cols-2 gap-0 bg-white border border-inkll/10 rounded-3xl overflow-hidden">
        <div className="aspect-square bg-inkll/5">
          {hasImage ? (
            <img
              src={result.imageUrl}
              alt={`A sketched idea for ${result.title}`}
              className="w-full h-full object-cover"
            />
          ) : preview ? (
            <img
              src={preview}
              alt="Your trail finds"
              className="w-full h-full object-cover opacity-80"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-inkll text-sm italic">
              Sketch coming back...
            </div>
          )}
        </div>
        <div className="p-7 md:p-9 flex flex-col justify-center">
          <p className="text-ember text-[10px] font-medium uppercase tracking-[0.2em] mb-2">
            Trail Craft
          </p>
          <h2 className="font-serif text-3xl text-ink leading-tight mb-3">
            {result.title}
          </h2>
          {result.summary && (
            <p className="text-inkl text-sm leading-relaxed mb-5">
              {result.summary}
            </p>
          )}
          {result.imageError && (
            <p className="text-inkll font-serif italic text-xs mb-4">
              {result.imageError}
            </p>
          )}
          {result.materials?.length > 0 && (
            <div className="mb-5">
              <p className="text-inkll text-[10px] uppercase tracking-[0.2em] mb-2">
                What you need
              </p>
              <ul className="text-inkl text-sm leading-relaxed space-y-1">
                {result.materials.map((m, i) => (
                  <li key={i}>· {m}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {result.steps?.length > 0 && (
        <div className="bg-white border border-inkll/10 rounded-3xl p-7 md:p-10">
          <p className="text-ember text-[10px] font-medium uppercase tracking-[0.2em] mb-5">
            Step by step
          </p>
          <ol className="space-y-5">
            {result.steps.map((step, i) => (
              <li
                key={i}
                className="grid grid-cols-[2.5rem_1fr] gap-4 items-start"
              >
                <span className="font-serif italic text-gold text-2xl leading-none pt-1">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-inkl text-base leading-relaxed">
                  {step}
                </p>
              </li>
            ))}
          </ol>
        </div>
      )}

      <div className="text-center">
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-medium text-sm text-ember border border-ember hover:bg-ember/5 transition-colors"
        >
          Try another photo
        </button>
      </div>
    </motion.div>
  )
}

function ErrorCard({ message, onReset }) {
  return (
    <motion.div
      variants={fadeUpVariants}
      initial="hidden"
      animate="visible"
      className="bg-white border border-inkll/10 rounded-3xl p-8 text-center"
    >
      <p className="text-ember text-xs font-medium uppercase tracking-[0.2em] mb-3">
        Hmm
      </p>
      <p className="text-inkl text-base leading-relaxed mb-6">
        {message || 'Something went sideways.'}
      </p>
      <button
        type="button"
        onClick={onReset}
        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium text-ember border border-ember hover:bg-ember/5 transition-colors"
      >
        Try again
      </button>
    </motion.div>
  )
}
