'use client'

import { useState, useEffect } from 'react'
import { Surface } from '@/components/ui/Surface'
import { Button } from '@/components/ui/Button'
import {
  CheckCircle,
  XCircle,
  AlertCircle,
  Info,
  X,
  Bell,
  Copy,
  RotateCcw,
  SkipForward,
  MessageCircle,
  Trash,
  Clock,
  Expand,
  Edit3,
} from 'lucide-react'
import Image from 'next/image'

// Pastel color palette using provided hex codes (lowercase)
const pastelBackgrounds = ['#fbd4e2', '#dbcbe1', '#b8deea', '#bde4dc', '#f1f4cd', '#fce4b5', '#f9c5b1']

// Helper function to get a deterministic background color from ID hash
const getColorFromIdHash = (id: string): string => {
  let hash = 0
  for (let i = 0; i < id.length; i++) {
    hash = (hash << 5) - hash + id.charCodeAt(i)
    hash |= 0 // Convert to 32bit integer
  }
  const index = Math.abs(hash) % pastelBackgrounds.length
  return pastelBackgrounds[index]
}

interface NotificationCardProps {
  id: string
  status: string
  requirement?: string
  timestamp?: string
  onDismiss?: (id: string) => void
  actions?: Array<{
    label: string
    variant?: 'primary' | 'secondary'
    onClick: () => void
    customStyle?: string
    icon?: React.ReactNode
  }>
  notificationType?: 'approve' | 'select' | 'input' | 'edit'
  placeholder?: string
  preview?: {
    type: 'text' | 'code' | 'image'
    content: string
  }
  cardBgColor: string
}

const NotificationCard = ({
  id,
  status,
  requirement,
  timestamp,
  onDismiss,
  actions,
  notificationType,
  placeholder,
  preview,
  cardBgColor,
  onOpenModal,
}: NotificationCardProps & { onOpenModal?: (content: { status: string; preview: any }) => void }) => {
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    if (notificationType === 'edit') {
      if (preview?.content) {
        setInputValue(preview.content)
      } else {
        setInputValue('')
      }
    } else {
      // Clear input value if not in edit mode or no preview for edit
      setInputValue('')
    }
  }, [notificationType, preview])

  // Check if this is a long preview that should have a modal
  const isLongPreview = preview && preview.content.length > 500

  const renderPreviewContent = (isFullContent = false) => {
    if (preview) {
      let content = preview.content

      // For long previews, show truncated content in the card
      if (isLongPreview && !isFullContent) {
        const lines = content.split('\n')
        content = lines.slice(0, 3).join('\n')
      }

      if (preview.type === 'code') {
        return (
          <pre className="text-neutral-700 dark:text-neutral-300 font-mono text-xs whitespace-pre-wrap overflow-x-auto">
            <code>{content.replace(/\\n/g, '\n')}</code>
          </pre>
        )
      } else if (preview.type === 'image') {
        if (preview.content.startsWith('[Image:') && preview.content.endsWith(']')) {
          return <p className="text-neutral-700 dark:text-neutral-300 italic text-xs">{preview.content}</p>
        }
        // eslint-disable-next-line @next/next/no-img-element
        return <img src={preview.content} alt={status || 'Preview Image'} className="max-w-full h-auto rounded mt-1" />
      }
      // Default to 'text' type or if type is unspecified
      return (
        <p
          className="text-neutral-800 dark:text-neutral-200 text-base leading-relaxed"
          style={{ fontFamily: 'PT Sans, sans-serif' }}
        >
          {content.replace(/\\n/g, '\n')}
        </p>
      )
    }
    return null
  }

  const displayedPreviewContent = renderPreviewContent(false)
  // Determine if we should show a preview block (now including edit type)
  const showPreviewBlock = displayedPreviewContent

  return (
    <div
      className={`p-4 rounded-lg dark:bg-neutral-800 transition-all duration-300 hover:shadow-md`}
      style={{ backgroundColor: cardBgColor }}
    >
      {timestamp && <time className="text-xs text-neutral-600 dark:text-neutral-300 mb-2 block">{timestamp}</time>}
      <div className="flex items-start">
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-sm text-neutral-900 dark:text-neutral-100">{status}</h3>
              {requirement && <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">{requirement}</p>}

              {/* Display structured preview if available */}
              {showPreviewBlock && (
                <div
                  className={`mt-4 bg-white/70 dark:bg-white/15 rounded-2xl relative ${notificationType === 'edit' ? 'overflow-hidden' : 'overflow-visible'}`}
                >
                  {/* Speech bubble triangle pointing right */}
                  <div
                    className="absolute top-6 -right-2 w-4 h-4 bg-white/70 dark:bg-white/15 rotate-45 transform z-10"
                    style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%)' }}
                  ></div>
                  <div
                    className={`p-4 ${isLongPreview && notificationType !== 'edit' ? 'pb-12' : ''} ${notificationType === 'edit' ? 'max-h-32 overflow-hidden' : ''}`}
                  >
                    {displayedPreviewContent}
                    {/* Fade-out effect for edit notifications when content is long */}
                    {isLongPreview && notificationType === 'edit' && (
                      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white/70 to-transparent dark:from-white/15 dark:to-transparent pointer-events-none" />
                    )}
                  </div>
                  {/* Expand button for non-edit notifications */}
                  {isLongPreview && notificationType !== 'edit' && (
                    <button
                      onClick={() => onOpenModal?.({ status, preview })}
                      className="absolute bottom-0 left-0 right-0 bg-black/5 dark:bg-black/20 hover:bg-black/15 dark:hover:bg-black/25 transition-all duration-200 py-2 flex items-center justify-center gap-1.5 rounded-b-2xl"
                      title="View full content"
                    >
                      <Expand className="w-3 h-3" />
                      <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300">Expand</span>
                    </button>
                  )}
                </div>
              )}

              {/* Textarea for 'input' type only */}
              {notificationType === 'input' && (
                <div className="mt-3">
                  <textarea
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    placeholder={placeholder || 'Enter your response...'}
                    className="w-full p-2 text-sm border border-black dark:border-neutral-600 rounded bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 resize-none"
                    rows={3}
                  />
                </div>
              )}
            </div>
          </div>
          {((actions && actions.length > 0) || onDismiss) && (
            <div className="flex flex-col gap-2 mt-3">
              {actions && notificationType === 'approve' ? (
                // Side by side layout for approve buttons
                <div className="flex gap-2 w-full">
                  {actions.map((action, index) => (
                    <Button
                      key={index}
                      buttonSize="medium"
                      onClick={action.onClick}
                      className={
                        action.customStyle
                          ? `flex-1 ${action.customStyle} border border-transparent rounded-md flex items-center justify-center gap-2`
                          : 'flex-1 bg-black text-white hover:bg-neutral-800 dark:bg-black dark:hover:bg-neutral-700 border border-transparent rounded-md'
                      }
                    >
                      {action.icon && action.icon}
                      {action.label}
                    </Button>
                  ))}
                </div>
              ) : (
                // Stacked layout for other notification types
                actions &&
                actions.map((action, index) => (
                  <Button
                    key={index}
                    buttonSize="medium"
                    onClick={action.onClick}
                    className={
                      action.customStyle
                        ? `w-full ${action.customStyle} border border-transparent rounded-md flex items-center ${notificationType === 'select' ? 'justify-start pl-4' : 'justify-center'} gap-2`
                        : 'w-full bg-black text-white hover:bg-neutral-800 dark:bg-black dark:hover:bg-neutral-700 border border-transparent rounded-md'
                    }
                  >
                    {action.icon && action.icon}
                    {action.label}
                  </Button>
                ))
              )}

              {/* Wrapper for Ignore, Snooze, and Discuss buttons in a single row */}
              {onDismiss && (
                <div className="flex gap-2 w-full mt-2">
                  <Button
                    buttonSize="medium"
                    onClick={() => onDismiss(id)}
                    className="flex-1 text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-md border-0 bg-transparent flex items-center justify-center gap-2"
                  >
                    <Trash className="w-4 h-4" />
                    Ignore
                  </Button>
                  <Button
                    buttonSize="medium"
                    onClick={() => onDismiss(id)}
                    className="flex-1 text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-md border-0 bg-transparent flex items-center justify-center gap-2"
                  >
                    <Clock className="w-4 h-4" />
                    Snooze
                  </Button>
                  <Button
                    buttonSize="medium"
                    onClick={() => console.log('Discuss clicked for card:', id)}
                    className="flex-1 text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-md border-0 bg-transparent flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Discuss
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const MobileFrame = ({
  children,
  modalContent,
  onCloseModal,
}: {
  children: React.ReactNode
  modalContent?: { status: string; preview: any } | null
  onCloseModal?: () => void
}) => {
  const renderModalPreviewContent = (preview: any) => {
    if (preview) {
      const content = preview.content

      if (preview.type === 'code') {
        return (
          <pre className="text-neutral-700 dark:text-neutral-300 font-mono text-xs whitespace-pre-wrap overflow-x-auto">
            <code>{content.replace(/\\n/g, '\n')}</code>
          </pre>
        )
      } else if (preview.type === 'image') {
        if (preview.content.startsWith('[Image:') && preview.content.endsWith(']')) {
          return <p className="text-neutral-700 dark:text-neutral-300 italic text-xs">{preview.content}</p>
        }
        // eslint-disable-next-line @next/next/no-img-element
        return <img src={preview.content} alt="Preview Image" className="max-w-full h-auto rounded mt-1" />
      }
      // Default to 'text' type or if type is unspecified
      return (
        <span className="text-neutral-700 dark:text-neutral-300 font-mono text-xs whitespace-pre-wrap">
          {content.replace(/\\n/g, '\n')}
        </span>
      )
    }
    return null
  }

  return (
    <div className="w-full max-w-md">
      {/* Mobile Frame Border */}
      <div className="bg-neutral-800 dark:bg-neutral-700 rounded-[2.5rem] p-2 shadow-2xl">
        {/* Screen */}
        <div className="bg-white dark:bg-neutral-950 rounded-[2rem] overflow-hidden h-[800px] relative">
          {/* Status Bar */}
          <div className="bg-white dark:bg-neutral-950 px-4 py-2 flex justify-between items-center text-xs font-medium">
            <span className="text-neutral-900 dark:text-neutral-100">9:41</span>
            <div className="flex items-center gap-1">
              <div className="w-4 h-2 bg-neutral-300 dark:bg-neutral-600 rounded-sm"></div>
              <div className="w-6 h-3 border border-neutral-300 dark:border-neutral-600 rounded-sm">
                <div className="w-4 h-full bg-green-500 rounded-sm"></div>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="h-[calc(100%-2rem)] overflow-y-auto">{children}</div>

          {/* Modal for full content - positioned within mobile container */}
          {modalContent && (
            <div className="absolute inset-0 z-50 flex items-end justify-center">
              {/* Backdrop */}
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onCloseModal} />

              {/* Modal Content */}
              <div className="relative w-full max-h-[70%] bg-white dark:bg-neutral-900 rounded-t-2xl animate-in slide-in-from-bottom duration-300">
                {/* Header */}
                <div className="flex items-center justify-between p-3 border-b border-neutral-200 dark:border-neutral-700">
                  <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 line-clamp-1">
                    {modalContent.status}
                  </h3>
                  <button
                    onClick={onCloseModal}
                    className="p-1.5 text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 flex-shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-3 overflow-y-auto" style={{ maxHeight: 'calc(70vh - 120px)' }}>
                  <div className="text-xs">{renderModalPreviewContent(modalContent.preview)}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const NotificationForm = ({
  onAddNotification,
}: {
  onAddNotification: (data: {
    status: string
    requirement: string
    type: 'approve' | 'select' | 'input' | 'edit'
    options?: string[]
    placeholder?: string
    preview?: {
      type: 'text' | 'code' | 'image'
      content: string
    }
  }) => void
}) => {
  const [formData, setFormData] = useState<{
    status: string
    requirement: string
    type: 'approve' | 'select' | 'input' | 'edit'
    options?: string[]
    placeholder?: string
    preview?: {
      type: 'text' | 'code' | 'image'
      content: string
    }
  }>({
    status: '',
    requirement: '',
    type: 'approve',
    options: [],
    placeholder: '',
    preview: undefined,
  })
  const [newOption, setNewOption] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const isValid = formData.status.trim() && (formData.type === 'approve' || formData.requirement.trim())

    if (isValid) {
      onAddNotification(formData)
      setFormData({
        status: '',
        requirement: '',
        type: 'approve',
        options: [],
        placeholder: '',
        preview: undefined,
      })
      setNewOption('')
    }
  }

  const addOption = () => {
    if (newOption.trim() && !formData.options?.includes(newOption.trim())) {
      setFormData(prev => ({
        ...prev,
        options: [...(prev.options || []), newOption.trim()],
      }))
      setNewOption('')
    }
  }

  const removeOption = (optionToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      options: prev.options?.filter(option => option !== optionToRemove) || [],
    }))
  }

  return (
    <Surface className="p-6 h-full">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Type Select */}
        <div>
          <label htmlFor="type" className="block text-sm font-medium mb-2">
            Notification Type
          </label>
          <select
            id="type"
            value={formData.type}
            onChange={e =>
              setFormData(prev => ({
                ...prev,
                type: e.target.value as 'approve' | 'select' | 'input' | 'edit',
                options: e.target.value === 'select' ? prev.options : [],
                placeholder: e.target.value === 'input' ? prev.placeholder : '',
                preview:
                  e.target.value === 'approve' || e.target.value === 'edit' || e.target.value === 'select'
                    ? prev.preview
                    : undefined,
              }))
            }
            className="w-full p-3 border border-neutral-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100"
          >
            <option value="approve">Approve</option>
            <option value="select">Select</option>
            <option value="input">Input</option>
            <option value="edit">Edit</option>
          </select>
        </div>

        {/* Status Input */}
        <div>
          <label htmlFor="status" className="block text-sm font-medium mb-2">
            Status
          </label>
          <input
            id="status"
            type="text"
            value={formData.status}
            onChange={e => setFormData(prev => ({ ...prev, status: e.target.value }))}
            placeholder="What happened that required human input..."
            className="w-full p-3 border border-neutral-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100"
            required
          />
        </div>

        {/* Requirement Input - Hidden for approve type */}
        {formData.type !== 'approve' && (
          <div>
            <label htmlFor="requirement" className="block text-sm font-medium mb-2">
              Requirement
            </label>
            <textarea
              id="requirement"
              value={formData.requirement}
              onChange={e => setFormData(prev => ({ ...prev, requirement: e.target.value }))}
              placeholder="What does the human need to do/answer..."
              className="w-full p-3 border border-neutral-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 resize-none"
              rows={3}
              required
            />
          </div>
        )}

        {/* Preview Input - For approve, edit, and select types */}
        {(formData.type === 'approve' || formData.type === 'edit' || formData.type === 'select') && (
          <div>
            <label htmlFor="preview" className="block text-sm font-medium mb-2">
              {formData.type === 'approve'
                ? 'Artefact (Optional)'
                : formData.type === 'edit'
                  ? 'Text to Edit'
                  : 'Context/Preview (Optional)'}
            </label>
            <div className="space-y-3">
              <select
                value={formData.preview?.type || 'text'}
                onChange={e =>
                  setFormData(prev => ({
                    ...prev,
                    preview: prev.preview
                      ? { ...prev.preview, type: e.target.value as 'text' | 'code' | 'image' }
                      : { type: e.target.value as 'text' | 'code' | 'image', content: '' },
                  }))
                }
                className="w-full p-3 border border-neutral-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100"
              >
                <option value="text">Text</option>
                <option value="code">Code</option>
                <option value="image">Image</option>
              </select>
              <textarea
                id="preview"
                value={formData.preview?.content || ''}
                onChange={e =>
                  setFormData(prev => ({
                    ...prev,
                    preview: prev.preview
                      ? { ...prev.preview, content: e.target.value }
                      : { type: 'text', content: e.target.value },
                  }))
                }
                placeholder={
                  formData.type === 'approve'
                    ? 'What is being approved? (e.g., email draft, document, proposal)'
                    : formData.type === 'edit'
                      ? 'Enter the text that will be edited...'
                      : 'Provide context for the selection task (e.g., full message, user query).'
                }
                className="w-full p-3 border border-neutral-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 resize-none"
                rows={4}
              />
            </div>
          </div>
        )}

        {/* Conditional Fields */}
        {formData.type === 'select' && (
          <div>
            <label className="block text-sm font-medium mb-2">Select Options</label>
            <div className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newOption}
                  onChange={e => setNewOption(e.target.value)}
                  placeholder="Add an option..."
                  className="flex-1 p-3 border border-neutral-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100"
                  onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addOption())}
                />
                <Button type="button" onClick={addOption} variant="secondary" buttonSize="medium">
                  Add
                </Button>
              </div>
              {formData.options && formData.options.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">Options:</p>
                  {formData.options.map((option, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-neutral-50 dark:bg-neutral-800 p-2 rounded"
                    >
                      <span className="text-sm">{option}</span>
                      <button
                        type="button"
                        onClick={() => removeOption(option)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {formData.type === 'input' && (
          <div>
            <label htmlFor="placeholder" className="block text-sm font-medium mb-2">
              Input Placeholder
            </label>
            <input
              id="placeholder"
              type="text"
              value={formData.placeholder}
              onChange={e => setFormData(prev => ({ ...prev, placeholder: e.target.value }))}
              placeholder="Enter placeholder text for the input field..."
              className="w-full p-3 border border-neutral-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100"
            />
          </div>
        )}

        <Button type="submit" variant="primary" className="w-full">
          Add Notification
        </Button>
      </form>
    </Surface>
  )
}

interface CustomNotification {
  id: string
  status: string
  requirement?: string
  timestamp: string
  notificationType: 'approve' | 'select' | 'input' | 'edit'
  options?: string[]
  placeholder?: string
  preview?: {
    type: 'text' | 'code' | 'image'
    content: string
  }
  cardBgColor?: string
}

const STORAGE_KEY = 'notification-cards-data'

const getInitialNotifications = (): CustomNotification[] => [
  {
    id: 'approve-content-moderation',
    status: 'User comment flagged for review',
    requirement: 'Review comment for community guideline violation.',
    timestamp: '2 minutes ago',
    notificationType: 'approve',
    preview: { type: 'text', content: "Comment: 'This is an outrageous policy! You guys are the worst!'" },
  },
  {
    id: 'approve-code-review',
    status: 'Code snippet generated for new login button',
    requirement: 'Review and approve the generated React component code.',
    timestamp: '15 minutes ago',
    notificationType: 'approve',
    preview: {
      type: 'code',
      content: `// React Component: LoginButton.jsx
import React, { useState, useEffect } from 'react';
import './LoginButton.css';

const LoginButton = ({ 
  onClick, 
  disabled = false, 
  loading = false, 
  variant = 'primary',
  size = 'medium',
  children = 'Log In Securely'
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [rippleCoords, setRippleCoords] = useState({ x: -1, y: -1 });
  const [isRippling, setIsRippling] = useState(false);

  useEffect(() => {
    if (rippleCoords.x !== -1 && rippleCoords.y !== -1) {
      setIsRippling(true);
      setTimeout(() => setIsRippling(false), 300);
    } else {
      setIsRippling(false);
    }
  }, [rippleCoords]);

  useEffect(() => {
    if (!isRippling) {
      setRippleCoords({ x: -1, y: -1 });
    }
  }, [isRippling]);

  const handleClick = (e) => {
    if (disabled || loading) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    setRippleCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    
    if (onClick) {
      onClick(e);
    }
  };

  const getButtonClasses = () => {
    const baseClasses = 'login-btn relative overflow-hidden transition-all duration-200 ease-in-out';
    const variantClasses = {
      primary: 'bg-blue-600 hover:bg-blue-700 text-white',
      secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
      outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'
    };
    const sizeClasses = {
      small: 'px-3 py-1.5 text-sm',
      medium: 'px-4 py-2 text-base',
      large: 'px-6 py-3 text-lg'
    };
    
    return \`\${baseClasses} \${variantClasses[variant]} \${sizeClasses[size]} \${
      disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
    } \${isHovered && !disabled ? 'transform scale-105 shadow-lg' : ''}\`;
  };

  return (
    <button 
      className={getButtonClasses()}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      disabled={disabled || loading}
      type="button"
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
        </div>
      )}
      
      <span className={\`\${loading ? 'opacity-0' : 'opacity-100'} transition-opacity\`}>
        {children}
      </span>
      
      {isRippling && (
        <span
          className="absolute rounded-full bg-white bg-opacity-30 transform scale-0 animate-ping"
          style={{
            left: rippleCoords.x,
            top: rippleCoords.y,
            width: '20px',
            height: '20px',
            marginLeft: '-10px',
            marginTop: '-10px'
          }}
        />
      )}
    </button>
  );
};

export default LoginButton;`,
    },
  },
  {
    id: 'select-entity-disambiguation',
    status: "Ambiguous entity detected: 'Michael Smith'",
    requirement: 'Please select the correct Michael Smith based on user query context.',
    timestamp: '30 minutes ago',
    notificationType: 'select',
    preview: {
      type: 'text',
      content:
        "User query: 'Can you find the contact details for Michael Smith? He called earlier about the Q3 report.'",
    },
    options: [
      'Michael Smith (Sales Lead, Acme Corp)',
      'Michael Smith (Support Agent, NY Branch)',
      'M Smith (New Customer, Order #12345)',
      'None of the above - needs manual search',
    ],
  },
  {
    id: 'select-categorization',
    status: 'Support ticket needs categorization',
    requirement: 'Select the most appropriate category for this support ticket.',
    timestamp: '45 minutes ago',
    notificationType: 'select',
    preview: {
      type: 'text',
      content: `Ticket #2024-03-156789
Subject: Cannot reset my password - Urgent help needed
User: Sarah Johnson (sarah.johnson@techcorp.com)
Account Type: Premium Business Plan
Browser: Chrome 122.0.6261.94 (Windows 11)
Previous Tickets: 2 (both resolved)
Priority: High (user reported business critical)

Ticket Body:
"Hi there,

I'm reaching out because I'm having a serious issue with my password reset functionality, and it's preventing me from accessing my account which I need for an important client presentation this afternoon.

Here's exactly what's happening:
1. I go to the login page and click 'Forgot Password'
2. I enter my email address (sarah.johnson@techcorp.com) 
3. I get a confirmation message saying 'Reset link sent to your email'
4. I receive the email within a few minutes (checked spam folder too)
5. When I click the reset link, it just takes me to a completely blank white page
6. The URL shows something like: https://yourapp.com/reset?token=abc123... but nothing loads
7. I've tried this multiple times over the past 2 hours
8. I've also tried different browsers (Chrome, Firefox, Safari) and even my phone
9. I cleared my browser cache and cookies but still the same issue

This is really concerning because:
- I have a client demo in 3 hours and all my presentation materials are in my account
- My team is also locked out and depends on me to access our shared workspace
- We're considering upgrading to Enterprise plan but this is making us question the platform reliability

Additional context:
- Last successful login was yesterday around 6 PM
- I didn't change anything on my end
- My colleagues at other companies aren't reporting similar issues
- I tried the main login page too, but since I don't remember my current password, I can't get in that way either

Can someone please help me urgently? I can provide any additional information needed. Is there a way for your team to manually reset my password or is this a known system issue?

Thank you for your quick assistance,
Sarah Johnson
Senior Project Manager, TechCorp Solutions
Direct: +1-555-0123
sarah.johnson@techcorp.com"

System Details:
- IP Address: 192.168.1.45
- Session ID: sess_abc123def456
- Error Logs: Page load timeout after 30 seconds
- Last password change: 45 days ago
- Account status: Active (no flags)
- Two-factor authentication: Enabled`,
    },
    options: ['Account/Login Issues', 'Billing Problem', 'Technical Glitch'],
  },
  {
    id: 'input-missing-info',
    status: 'Unclear expense item on receipt',
    requirement: 'Please enter the correct amount and vendor for the highlighted expense.',
    timestamp: '1 hour ago',
    notificationType: 'input',
    preview: { type: 'image', content: 'https://miro.medium.com/v2/resize:fit:2000/1*XABefyicvTbpAARnM33BLA.jpeg' },
    placeholder: 'e.g., 25.99, Starbucks',
  },
  {
    id: 'input-feedback-tone',
    status: 'Feedback requested for marketing email draft',
    requirement: 'What is your feedback on the tone of this email draft? (e.g., too aggressive, too casual)',
    timestamp: '2 hours ago',
    notificationType: 'input',
    preview: {
      type: 'text',
      content: `Email Campaign: "Q1 2024 Product Launch Announcement"
Target Audience: Existing premium customers (B2B segment)
Send Date: March 15, 2024
Expected Recipients: 12,500 customers

Subject Line: HUGE Savings Inside! Don't Miss Out! 🚀💰

Email Body:
"Hey there valued customer!!! 

WOW - do we have some ABSOLUTELY INCREDIBLE news for you today! You're literally about to LOSE YOUR MIND when you see what we've prepared for you!

🔥 INSANE DEALS ALERT 🔥

You absolutely HAVE to check out these MIND-BLOWING deals we've got going on right now! This is NOT a drill - these are the BEST prices you'll EVER see on our premium products!

⚡ LIMITED TIME ONLY ⚡
- 75% OFF our flagship Enterprise Suite (NORMALLY $2,999/month!)
- FREE premium support for LIFE (worth $10,000+!)
- EXCLUSIVE access to our beta features (usually reserved for Fortune 500!)
- ZERO setup fees (save $5,000 instantly!)

But here's the catch - this offer DISAPPEARS in exactly 24 HOURS! Once it's gone, IT'S GONE FOREVER! No exceptions, no extensions, NO MERCY!

Don't be that person who waits and then regrets it for the rest of their life! Your competitors are probably signing up RIGHT NOW while you're reading this email!

Click this button IMMEDIATELY before someone else takes your spot:
[CLAIM MY MASSIVE DISCOUNT NOW!!!]

Still thinking about it??? Here's what our CEO Sarah Mitchell has to say:
'This promotion is so good, I'm almost embarrassed to offer it. We're practically giving away our software for free! But we want to reward our most loyal customers with something truly spectacular!'

REMEMBER: After midnight tomorrow, these prices will NEVER be available again. This is your ONE CHANCE to get our premium software at these ridiculous prices!

What are you waiting for??? CLICK NOW! 👆👆👆

Seriously, stop reading and CLICK THE BUTTON! Your future self will thank you!

Best regards (but mostly URGENT REGARDS!),
The AMAZING Team at TechSolutions Pro

P.S. If you don't take advantage of this offer, we'll both regret it forever! Don't let this slip away!
P.P.S. Forward this to your friends - they'll LOVE you for it!
P.P.P.S. We're so confident you'll love this deal, we'll personally guarantee your success or we'll work for FREE!

---
LEGAL: This offer expires at 11:59 PM EST on March 16, 2024. Cannot be combined with other offers. Some restrictions may apply. Void where prohibited."`,
    },
    placeholder: "e.g., 'Tone is a bit too pushy, suggest softening the subject line...'",
  },
  {
    id: 'edit-summary-refinement',
    status: 'Document summary generated, needs review',
    requirement: 'Please review and refine the generated summary for clarity and completeness.',
    timestamp: '3 hours ago',
    notificationType: 'edit',
    preview: {
      type: 'text',
      content: `Document: "Q3 2024 Comprehensive Financial Performance & Strategic Analysis Report"
Original Length: 5,200 words | 47 pages
Generated on: March 14, 2024
Source Document Type: Internal Executive Summary

AI-Generated Summary:

Executive Overview:
The Q3 financial report demonstrated significant positive momentum across multiple business segments, with a notable 15% year-over-year revenue increase that exceeded analyst expectations by 3.2%. This growth was primarily driven by new market expansion initiatives in the Southeast Asian markets, particularly in Singapore, Thailand, and Malaysia, where our SaaS platform gained substantial traction among mid-market enterprises.

Financial Highlights:
- Total revenue reached $47.3M, up from $41.1M in Q3 2023
- Gross profit margins improved to 73.2% from 71.8% in the previous quarter
- Operating expenses increased by 8.5% due to planned hiring and infrastructure investments
- Net income grew to $8.7M compared to $6.2M in Q3 2023
- Customer acquisition cost (CAC) decreased by 12% while lifetime value (LTV) increased by 18%
- Monthly recurring revenue (MRR) growth rate accelerated to 4.2% month-over-month

Market Expansion & Customer Growth:
New customer acquisitions totaled 1,847 accounts, representing a 28% increase compared to Q2 2024. Enterprise segment (>$500K annual contract value) grew by 35%, with notable wins including TechCorp Industries, Global Manufacturing Solutions, and three Fortune 1000 companies that remained confidential during the reporting period.

Operational Challenges & Mitigation Strategies:
Supply chain issues were identified as a significant challenge, particularly affecting our hardware component deliveries and third-party integration timelines. The procurement team implemented dual-sourcing strategies for critical components, reducing dependency on single suppliers by 40%. Additionally, shipping delays from overseas manufacturers resulted in a 2-week average delay in customer onboarding for enterprise clients requiring custom hardware configurations.

Investment & Resource Allocation:
Marketing spend increased by 5% to $12.4M, with a strategic shift toward digital channels and performance marketing campaigns that yielded a 23% improvement in lead quality scores. The majority of marketing budget was allocated to content marketing (35%), paid search (28%), trade shows and events (22%), and social media advertising (15%).

Technology & Product Development:
R&D investments grew by 15% as the company accelerated development of AI-powered features and mobile applications. The engineering team expanded by 12 developers and 3 data scientists to support the growing product roadmap and ensure scalability for projected Q4 customer growth.

Risk Assessment & Future Outlook:
Key risks identified include potential economic downturn impacts on enterprise software spending, increased competition from well-funded startups, and potential regulatory changes in key international markets. However, the strong financial position and diversified customer base provide resilience against these potential challenges.`,
    },
  },
  {
    id: 'edit-typo-correction',
    status: 'Marketing email draft requires proofreading',
    requirement: 'AI detected potential errors in email copy. Review and edit the draft before sending.',
    timestamp: '4 hours ago',
    notificationType: 'edit',
    preview: {
      type: 'text',
      content:
        "Subject: Introducing Our Revolutionary AI Writing Assisant!\n\nDear valued customer,\n\nWe're exited to announce the launch of our groundbreaking AI writing tool that will help you create profesional content in seconds.\n\nKey benefits:\n• 10x faster content creation\n• Grammer and spelling correction\n• Tone adjustements for any audience\n• Seemless integration with your existing workflow\n\nSign up today and recieve 50% off your first month!\n\nBest regards,\nThe AI Tools Team\n\nP.S. Don't miss out on this limited-time offer - it's litterally the best deal we've ever offered!",
    },
  },
  {
    id: 'approve-nda-draft',
    status: "NDA draft generated for 'Innovatech Solutions' partnership",
    requirement: 'Quick review: Does this auto-generated NDA cover all standard points for a new software vendor?',
    timestamp: '5 hours ago',
    notificationType: 'approve',
    preview: {
      type: 'text',
      content: `NON-DISCLOSURE AGREEMENT

This Non-Disclosure Agreement ("Agreement") is entered into as of [DATE] between [YOUR COMPANY NAME] ("Company") and Innovatech Solutions, a corporation organized under the laws of [STATE] ("Vendor").

RECITALS

WHEREAS, Company and Vendor wish to explore a potential business relationship involving the provision of software development services;

WHEREAS, in connection with such discussions, each party may disclose to the other certain confidential and proprietary information;

NOW, THEREFORE, in consideration of the mutual covenants contained herein, the parties agree as follows:

1. CONFIDENTIAL INFORMATION

1.1 Definition. "Confidential Information" means all non-public, proprietary, or confidential information disclosed by either party to the other, whether orally, in writing, electronically, or by any other means, including but not limited to:

(a) Technical data, software code, algorithms, designs, specifications, and documentation
(b) Business plans, strategies, forecasts, and financial information
(c) Customer lists, supplier information, and pricing data
(d) Marketing strategies and promotional materials
(e) Any other information that would reasonably be considered confidential

1.2 Exclusions. Confidential Information does not include information that:
(a) Is or becomes publicly available through no breach of this Agreement
(b) Was rightfully known by the receiving party prior to disclosure
(c) Is rightfully received from a third party without breach of any confidentiality obligation
(d) Is independently developed without use of Confidential Information

2. OBLIGATIONS AND RESTRICTIONS

2.1 Non-Disclosure. Each party agrees to:
(a) Hold all Confidential Information in strict confidence
(b) Not disclose Confidential Information to any third party without prior written consent
(c) Use Confidential Information solely for evaluating the potential business relationship
(d) Apply the same degree of care to protect Confidential Information as it applies to its own confidential information, but in no event less than reasonable care

2.2 Limited Access. Each party shall limit access to Confidential Information to those employees, agents, and advisors who have a legitimate need to know and who have been informed of the confidential nature of such information.

3. RETURN OF MATERIALS

Upon termination of discussions or upon written request, each party shall promptly return or destroy all documents, materials, and other tangible manifestations of Confidential Information, including all copies thereof.

4. NO LICENSE OR OWNERSHIP TRANSFER

Nothing in this Agreement grants any license, right, or interest in any intellectual property, trade secrets, or other proprietary rights. All Confidential Information remains the property of the disclosing party.

5. TERM AND TERMINATION

5.1 Term. This Agreement shall remain in effect for a period of five (5) years from the date of execution, unless terminated earlier by mutual written consent.

5.2 Survival. The obligations of confidentiality shall survive termination of this Agreement and continue for a period of five (5) years thereafter.

6. REMEDIES

Each party acknowledges that any breach of this Agreement may cause irreparable harm for which monetary damages would be inadequate. Therefore, each party shall be entitled to seek equitable relief, including injunction and specific performance, in addition to all other remedies available at law or in equity.

7. GOVERNING LAW

This Agreement shall be governed by and construed in accordance with the laws of [STATE], without regard to conflict of law principles.

8. GENERAL PROVISIONS

8.1 Entire Agreement. This Agreement constitutes the entire agreement between the parties with respect to the subject matter hereof.

8.2 Amendment. This Agreement may only be amended by written instrument signed by both parties.

8.3 Severability. If any provision of this Agreement is held to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.

8.4 Counterparts. This Agreement may be executed in counterparts, each of which shall be deemed an original.

IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first written above.

[YOUR COMPANY NAME]                    INNOVATECH SOLUTIONS


By: _________________________        By: _________________________
Name: [NAME]                          Name: [NAME]
Title: [TITLE]                        Title: [TITLE]
Date: _______________                 Date: _______________`,
    },
  },
  {
    id: 'select-image-primary-tag',
    status: 'Image analysis complete - primary subject clarification needed',
    requirement: 'Which of these AI-detected tags best represents the *main subject* of the image for cataloging?',
    timestamp: '6 hours ago',
    notificationType: 'select',
    preview: {
      type: 'image',
      content: 'https://artistichive.com/wp-content/uploads/2022/03/51625225-B812-4637-91C6-532571BBAB7C-scaled.jpeg',
    },
    options: ['Mountain Biking', 'Sunset Landscape', 'Adventure Sports', 'Outdoor Gear (Helmet/Bike)', 'Scenic View'],
  },
  {
    id: 'input-sentiment-override',
    status: 'Low confidence (65%) for sentiment on customer review',
    requirement: 'Please provide the primary sentiment and up to 3 key themes from this review.',
    timestamp: '7 hours ago',
    notificationType: 'input',
    preview: {
      type: 'text',
      content: `Customer Review Analysis
Product: Enterprise Cloud Management Platform v3.2
Reviewer: Michael Torres (verified purchase, 3-month user)
Review Date: March 12, 2024
Platform: G2 Crowd
Rating: 3.5/5 stars
Review Length: 847 words

Full Customer Review:
"So I've been using this platform for about three months now, and I have to say it's been quite the journey. Let me be completely honest about my experience because I think potential buyers deserve to know what they're getting into.

First off, the setup was a bit of a nightmare, not gonna lie. The documentation is extensive, which sounds great in theory, but it's honestly overwhelming and not particularly well-organized. I spent the better part of two weeks just trying to get our basic integrations working with our existing Salesforce and HubSpot systems. The API documentation seemed to assume a level of technical knowledge that frankly, most business users don't have. I ended up having to bring in a consultant just to get through the initial configuration, which added about $3,000 to our implementation costs that weren't budgeted for.

However, once I got it working - and this is where things get interesting - the performance is actually pretty decent for the price point. The dashboard is intuitive once you understand the logic behind it, and the reporting capabilities are genuinely impressive. I can pull data from multiple sources and create custom reports that would have taken our team days to compile manually. The automation workflows have saved us probably 15-20 hours per week in manual data entry and follow-up tasks.

The integration with our CRM has been mostly smooth sailing after the initial setup hurdles. Data sync happens in real-time, which was crucial for our sales team. They can see customer interaction history, purchase patterns, and engagement scores all in one place. This has definitely improved our conversion rates - we're seeing about a 12% increase in closed deals since implementation.

Customer support was... surprisingly helpful, I have to admit. I was prepared for the worst based on some other reviews I'd read, but my experience has been quite positive. Response times are usually within 4-6 hours during business hours, and the support agents actually seem to know what they're talking about. I've had three major issues since going live, and each time they were resolved within 24 hours. The chat support is particularly good - feels like you're talking to actual humans who understand the product, not reading from scripts.

That said, there are some frustrating limitations. The mobile app feels like an afterthought - it's slow, crashes occasionally, and you can't access about 40% of the platform's features. For a tool that costs $300+ per user per month, I expected better mobile functionality. Also, the custom field options are somewhat limited compared to what we had with our previous solution.

The pricing is reasonable for what you get, especially compared to enterprise alternatives like Salesforce Einstein or HubSpot Enterprise. But there are hidden costs that aren't immediately obvious - additional API calls, premium integrations, and advanced reporting features all cost extra. Our monthly bill has grown from the quoted $2,400 to about $3,100 once we added the features we actually needed.

Overall, it's a mixed bag. The core functionality is solid and has genuinely improved our operations, but the implementation process and some of the limitations are frustrating. If you have a dedicated IT team or budget for implementation support, it's probably worth considering. If you're looking for something plug-and-play, you might want to look elsewhere.

Would I recommend it? Honestly, it depends on your specific needs and technical capabilities. For our mid-size operation, it's working well enough that we'll probably stick with it for the foreseeable future, but I wouldn't call it a game-changer."

AI Analysis Results:
- Detected sentiment: Mixed/Neutral (65% confidence)
- Emotion indicators: Frustration (setup), Satisfaction (performance), Appreciation (support)
- Key phrases: "bit of a nightmare", "surprisingly helpful", "actually pretty decent"
- Tone: Balanced, detailed, honest`,
    },
    placeholder:
      'Sentiment (Positive/Negative/Neutral) & Themes (e.g., Difficult Setup, Good Performance, Helpful Support)',
  },
  {
    id: 'edit-extracted-order-details',
    status: 'Order details extracted from email - needs verification & formatting',
    requirement: 'Verify extracted fields and ensure correct formatting for CRM import.',
    timestamp: '8 hours ago',
    notificationType: 'edit',
    preview: {
      type: 'code',
      content:
        "**Original Email Snippet:**\\n'...yeah can I get 3 of the blue XL t-shirts and also one red small one. Ship to 123 Main St, Anytown, USA. My email is buyer@email.com, phone 555-1234. Thx! --J. Doe'\\n**Extracted Data (raw):**\\nItem1: blue XL t-shirt, Qty: 3\\nItem2: red small t-shirt, Qty: 1\\nAddress: 123 Main St, Anytown, USA\\nEmail: buyer@email.com\\nPhone: 555-1234\\nName: J. Doe",
    },
  },
]

const loadNotificationsFromStorage = (): CustomNotification[] => {
  if (typeof window === 'undefined') return getInitialNotifications()

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      // Validate that each notification has the proper structure
      if (Array.isArray(parsed)) {
        const validNotifications = parsed.filter(notification => notification && typeof notification.id === 'string')
        if (validNotifications.length > 0) {
          return validNotifications
        }
      }
    }
  } catch (error) {
    console.error('Failed to load notifications from localStorage:', error)
  }

  return getInitialNotifications()
}

const saveNotificationsToStorage = (notifications: CustomNotification[]) => {
  if (typeof window === 'undefined') return

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications))
  } catch (error) {
    console.error('Failed to save notifications to localStorage:', error)
  }
}

const resetNotificationsStorage = () => {
  // Clear localStorage completely first
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch (error) {
      console.error('Failed to clear localStorage:', error)
    }
  }

  const initialData = getInitialNotifications()
  saveNotificationsToStorage(initialData)
  return initialData
}

function getActionsForNotification(notification: CustomNotification, onAction: (id: string, action: string) => void) {
  switch (notification.notificationType) {
    case 'approve':
      return [
        {
          label: 'Reject',
          variant: 'secondary' as const,
          onClick: () => onAction(notification.id, 'declined'),
          customStyle: 'bg-red-600 hover:bg-red-700 text-white',
          icon: <XCircle className="w-4 h-4" />,
        },
        {
          label: 'Approve',
          variant: 'primary' as const,
          onClick: () => onAction(notification.id, 'approved'),
          customStyle: 'bg-green-600 hover:bg-green-700 text-white',
          icon: <CheckCircle className="w-4 h-4" />,
        },
      ]
    case 'select':
      return (
        notification.options?.map((option, index) => ({
          label: option,
          variant: 'secondary' as const,
          onClick: () => onAction(notification.id, `selected: ${option}`),
          customStyle: 'bg-green-600 hover:bg-green-700 text-white',
          icon: (
            <span className="w-5 h-5 bg-white text-green-600 rounded-full flex items-center justify-center text-xs font-bold">
              {index + 1}
            </span>
          ),
        })) || []
      )
    case 'input':
      return [
        {
          label: 'Submit',
          variant: 'primary' as const,
          onClick: () => onAction(notification.id, 'input submitted'),
          customStyle: 'bg-green-600 hover:bg-green-700 text-white -mt-2',
          icon: <CheckCircle className="w-4 h-4" />,
        },
      ]
    case 'edit':
      return [
        {
          label: 'Review & Submit',
          variant: 'primary' as const,
          onClick: () => alert('Open in full window to edit and submit'),
          customStyle: 'bg-green-600 hover:bg-green-700 text-white',
          icon: <Edit3 className="w-4 h-4" />,
        },
      ]
    default:
      return []
  }
}

const TabPanel = ({
  notifications,
  onAddNotification,
}: {
  notifications: CustomNotification[]
  onAddNotification: (data: {
    status: string
    requirement: string
    type: 'approve' | 'select' | 'input' | 'edit'
    options?: string[]
    placeholder?: string
    preview?: {
      type: 'text' | 'code' | 'image'
      content: string
    }
  }) => void
}) => {
  const [activeTab, setActiveTab] = useState<'add' | 'json' | 'schema'>('add')

  return (
    <Surface className="w-full h-full flex flex-col">
      {/* Tab Headers */}
      <div className="flex border-b border-neutral-200 dark:border-neutral-700">
        <button
          onClick={() => setActiveTab('add')}
          className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
            activeTab === 'add'
              ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
              : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
          }`}
        >
          Add Notification
        </button>
        <button
          onClick={() => setActiveTab('json')}
          className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
            activeTab === 'json'
              ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
              : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
          }`}
        >
          Inspect Data
        </button>
        <button
          onClick={() => setActiveTab('schema')}
          className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
            activeTab === 'schema'
              ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
              : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
          }`}
        >
          Schema
        </button>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'add' ? (
          <div className="h-full overflow-y-auto">
            <NotificationForm onAddNotification={onAddNotification} />
          </div>
        ) : activeTab === 'json' ? (
          <div className="w-full h-full overflow-y-auto p-6">
            <pre className="bg-neutral-50 dark:bg-neutral-900 p-4 rounded-lg text-xs overflow-x-auto border border-neutral-200 dark:border-neutral-700">
              <code className="text-neutral-800 dark:text-neutral-200">{JSON.stringify(notifications, null, 2)}</code>
            </pre>
          </div>
        ) : (
          <div className="h-full overflow-y-auto p-6">
            <div className="space-y-6">
              <div>
                <div className="space-y-3">
                  {/* Required Fields First */}
                  <div className="border border-neutral-200 dark:border-neutral-700 rounded-lg p-4 bg-white dark:bg-neutral-800">
                    <div className="flex items-center justify-between mb-2">
                      <code className="text-sm font-mono text-blue-600 dark:text-blue-400">id</code>
                      <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 px-2 py-1 rounded">
                        required
                      </span>
                    </div>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      Unique identifier for the notification
                    </p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-1">
                      Type: <code>string</code>
                    </p>
                  </div>

                  <div className="border border-neutral-200 dark:border-neutral-700 rounded-lg p-4 bg-white dark:bg-neutral-800">
                    <div className="flex items-center justify-between mb-2">
                      <code className="text-sm font-mono text-blue-600 dark:text-blue-400">notificationType</code>
                      <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 px-2 py-1 rounded">
                        required
                      </span>
                    </div>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">Type of interaction needed</p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-1">
                      Type: <code>'approve' | 'select' | 'input' | 'edit'</code>
                    </p>
                    <div className="mt-3 space-y-2">
                      <div className="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-r">
                        <h4 className="font-semibold text-blue-700 dark:text-blue-300 text-xs mb-0.5">approve</h4>
                        <p className="text-xs text-blue-600 dark:text-blue-400">
                          Simple yes/no approval. No 'requirement' field needed. Uses 'preview' for artefact.
                        </p>
                      </div>
                      <div className="border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20 p-3 rounded-r">
                        <h4 className="font-semibold text-green-700 dark:text-green-300 text-xs mb-0.5">select</h4>
                        <p className="text-xs text-green-600 dark:text-green-400">
                          Multiple choice. Uses 'options' array. 'preview' can provide context.
                        </p>
                      </div>
                      <div className="border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/20 p-3 rounded-r">
                        <h4 className="font-semibold text-purple-700 dark:text-purple-300 text-xs mb-0.5">input</h4>
                        <p className="text-xs text-purple-600 dark:text-purple-400">
                          Free text input. Uses 'placeholder'. 'preview' can provide context.
                        </p>
                      </div>
                      <div className="border-l-4 border-orange-500 bg-orange-50 dark:bg-orange-900/20 p-3 rounded-r">
                        <h4 className="font-semibold text-orange-700 dark:text-orange-300 text-xs mb-0.5">edit</h4>
                        <p className="text-xs text-orange-600 dark:text-orange-400">
                          Text editing. Uses 'preview' for text to be edited.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="border border-neutral-200 dark:border-neutral-700 rounded-lg p-4 bg-white dark:bg-neutral-800">
                    <div className="flex items-center justify-between mb-2">
                      <code className="text-sm font-mono text-blue-600 dark:text-blue-400">status</code>
                      <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 px-2 py-1 rounded">
                        required
                      </span>
                    </div>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      Main notification message describing what happened
                    </p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-1">
                      Type: <code>string</code>
                    </p>
                  </div>

                  <div className="border border-neutral-200 dark:border-neutral-700 rounded-lg p-4 bg-white dark:bg-neutral-800">
                    <div className="flex items-center justify-between mb-2">
                      <code className="text-sm font-mono text-blue-600 dark:text-blue-400">timestamp</code>
                      <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 px-2 py-1 rounded">
                        required
                      </span>
                    </div>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">When the notification was created</p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-1">
                      Type: <code>string</code>
                    </p>
                  </div>

                  {/* Optional Fields Second */}
                  <div className="border border-neutral-200 dark:border-neutral-700 rounded-lg p-4 bg-white dark:bg-neutral-800">
                    <div className="flex items-center justify-between mb-2">
                      <code className="text-sm font-mono text-blue-600 dark:text-blue-400">requirement</code>
                      <span className="text-xs bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 px-2 py-1 rounded">
                        optional
                      </span>
                    </div>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      What the user needs to do (not needed for 'approve' type)
                    </p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-1">
                      Type: <code>string | undefined</code>
                    </p>
                  </div>

                  <div className="border border-neutral-200 dark:border-neutral-700 rounded-lg p-4 bg-white dark:bg-neutral-800">
                    <div className="flex items-center justify-between mb-2">
                      <code className="text-sm font-mono text-blue-600 dark:text-blue-400">options</code>
                      <span className="text-xs bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 px-2 py-1 rounded">
                        optional
                      </span>
                    </div>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      Available choices for 'select' type notifications
                    </p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-1">
                      Type: <code>string[] | undefined</code>
                    </p>
                  </div>

                  <div className="border border-neutral-200 dark:border-neutral-700 rounded-lg p-4 bg-white dark:bg-neutral-800">
                    <div className="flex items-center justify-between mb-2">
                      <code className="text-sm font-mono text-blue-600 dark:text-blue-400">preview</code>
                      <span className="text-xs bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 px-2 py-1 rounded">
                        optional
                      </span>
                    </div>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      Structured content preview. Object with 'type' and 'content'.
                    </p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-1">
                      Type: <code>{"{ type: 'text' | 'code' | 'image'; content: string; } | undefined"}</code>
                    </p>
                    <div className="mt-3 space-y-2">
                      <div className="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-r">
                        <h4 className="font-semibold text-blue-700 dark:text-blue-300 text-xs mb-0.5">text</h4>
                        <p className="text-xs text-blue-600 dark:text-blue-400">
                          Plain text content (default). Rendered in monospace font.
                        </p>
                      </div>
                      <div className="border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20 p-3 rounded-r">
                        <h4 className="font-semibold text-green-700 dark:text-green-300 text-xs mb-0.5">code</h4>
                        <p className="text-xs text-green-600 dark:text-green-400">
                          Code content. Rendered in a code block with syntax highlighting.
                        </p>
                      </div>
                      <div className="border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/20 p-3 rounded-r">
                        <h4 className="font-semibold text-purple-700 dark:text-purple-300 text-xs mb-0.5">image</h4>
                        <p className="text-xs text-purple-600 dark:text-purple-400">
                          Image content. Can be URL or descriptive placeholder text.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="border border-neutral-200 dark:border-neutral-700 rounded-lg p-4 bg-white dark:bg-neutral-800">
                    <div className="flex items-center justify-between mb-2">
                      <code className="text-sm font-mono text-blue-600 dark:text-blue-400">placeholder</code>
                      <span className="text-xs bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 px-2 py-1 rounded">
                        optional
                      </span>
                    </div>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      Placeholder text for 'input' type notifications
                    </p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-1">
                      Type: <code>string | undefined</code>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Surface>
  )
}

export default function NotificationCardsPage() {
  const [notifications, setNotifications] = useState<CustomNotification[]>([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [initialColorMap, setInitialColorMap] = useState<Map<string, string>>(new Map())
  const [modalContent, setModalContent] = useState<{ status: string; preview: any } | null>(null)

  useEffect(() => {
    const loadedNotifications = loadNotificationsFromStorage()
    setNotifications(loadedNotifications)
    setIsLoaded(true)

    // Build the color map from the *original* demo data set
    const demoData = getInitialNotifications()
    const newMap = new Map<string, string>()
    demoData.forEach((notification, i) => {
      newMap.set(notification.id, pastelBackgrounds[i % pastelBackgrounds.length])
    })
    setInitialColorMap(newMap)
  }, []) // Runs once on initial mount

  // Save to localStorage whenever notifications change
  useEffect(() => {
    if (isLoaded) {
      saveNotificationsToStorage(notifications)
    }
  }, [notifications, isLoaded])

  const handleDismiss = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  const handleAddNotification = (formData: {
    status: string
    requirement: string
    type: 'approve' | 'select' | 'input' | 'edit'
    options?: string[]
    placeholder?: string
    preview?: {
      type: 'text' | 'code' | 'image'
      content: string
    }
  }) => {
    const newNotification: CustomNotification = {
      id: Date.now().toString(),
      status: formData.status,
      requirement: formData.type === 'approve' ? undefined : formData.requirement,
      timestamp: 'Just now',
      notificationType: formData.type,
      options: formData.options,
      placeholder: formData.placeholder,
      preview: formData.preview,
    }

    setNotifications(prev => [newNotification, ...prev])
  }

  const handleReset = () => {
    const resetData = resetNotificationsStorage()
    setNotifications(resetData)
  }

  const handleAction = (id: string, action: string) => {
    console.log(`Action: ${action} for notification: ${id}`)
    // Remove notification after action is taken
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  const handleOpenModal = (content: { status: string; preview: any }) => {
    setModalContent(content)
  }

  const handleCloseModal = () => {
    setModalContent(null)
  }

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-900 p-6 relative">
      {/* Reset Button - Top Right Corner */}
      <div className="absolute top-6 right-6 z-10">
        <Button
          type="button"
          onClick={handleReset}
          variant="ghost"
          buttonSize="small"
          className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 flex items-center gap-2 bg-white dark:bg-neutral-800 shadow-md hover:shadow-lg transition-shadow border border-neutral-200 dark:border-neutral-700"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </Button>
      </div>

      <div className="h-[calc(100vh-3rem)]">
        <div className="flex flex-row h-full gap-8">
          {/* Tabbed Panel - Left Side */}
          <div className="flex-1 h-full min-w-0">
            <div className="w-full h-full">
              <TabPanel notifications={notifications} onAddNotification={handleAddNotification} />
            </div>
          </div>

          {/* Mobile Frame - Right Side (2/3 width) */}
          <div className="grow-[2] shrink basis-0 flex justify-center items-center">
            <MobileFrame modalContent={modalContent} onCloseModal={handleCloseModal}>
              <div className="p-4 h-full">
                <div className="mb-6 text-center">
                  <Image
                    src="/notifications/wwlogo.png"
                    alt="Wordware Logo"
                    width={300}
                    height={42}
                    className="mx-auto h-12 w-auto"
                  />
                </div>

                <div className="space-y-3 pb-8">
                  {notifications.length === 0 ? (
                    <div className="text-center py-12">
                      <Bell className="w-12 h-12 text-neutral-300 dark:text-neutral-600 mx-auto mb-4" />
                      <p className="text-neutral-500 dark:text-neutral-400 text-sm">No notifications</p>
                      <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-1">
                        Use the form to add notifications
                      </p>
                    </div>
                  ) : (
                    notifications.map(notification => {
                      const color = initialColorMap.get(notification.id) || getColorFromIdHash(notification.id)
                      return (
                        <NotificationCard
                          key={notification.id}
                          {...notification}
                          cardBgColor={color}
                          onDismiss={handleDismiss}
                          actions={getActionsForNotification(notification, handleAction)}
                          notificationType={notification.notificationType}
                          placeholder={notification.placeholder}
                          preview={notification.preview}
                          onOpenModal={handleOpenModal}
                        />
                      )
                    })
                  )}
                </div>
              </div>
            </MobileFrame>
          </div>
        </div>
      </div>
    </div>
  )
}
