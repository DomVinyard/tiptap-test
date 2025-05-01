'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Surface } from '@/components/ui/Surface'

export function FileUpload() {
  const [file, setFile] = useState<File | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0])
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv']
    },
    maxFiles: 1
  })

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <Surface 
        className={`
          !bg-slate-100/25 dark:!bg-slate-800/40
          p-8 border-2 border-dashed border-slate-200 dark:border-slate-700 
          ${isDragActive ? 'border-blue-500 !bg-blue-50 dark:!bg-blue-900/20' : ''}
          rounded-lg cursor-pointer transition-colors text-center
        `}
      >
        {file ? (
          <div className="flex items-center justify-center gap-2 text-slate-600 dark:text-slate-400">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>{file.name}</span>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2">
            <svg className="w-10 h-10 text-slate-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3 3m0 0l-3-3m3 3V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div className="text-slate-600 dark:text-slate-400">
              Drag and Drop file here
            </div>
          </div>
        )}
      </Surface>
    </div>
  )
} 