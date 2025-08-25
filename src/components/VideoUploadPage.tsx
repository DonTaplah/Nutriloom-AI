import React, { useState, useRef } from 'react';
import { Upload, Play, X, CheckCircle, AlertCircle, Film, FileVideo } from 'lucide-react';

interface VideoUploadPageProps {
  onBack: () => void;
}

const VideoUploadPage: React.FC<VideoUploadPageProps> = ({ onBack }) => {
  const [uploadedVideo, setUploadedVideo] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleVideoUpload = (file: File) => {
    if (file && file.type.startsWith('video/')) {
      setUploadedVideo(file);
      const videoUrl = URL.createObjectURL(file);
      setVideoPreview(videoUrl);
      setUploadStatus('idle');
    } else {
      setUploadStatus('error');
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleVideoUpload(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleVideoUpload(file);
    }
  };

  const removeVideo = () => {
    setUploadedVideo(null);
    if (videoPreview) {
      URL.revokeObjectURL(videoPreview);
    }
    setVideoPreview(null);
    setUploadStatus('idle');
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const simulateUpload = () => {
    if (!uploadedVideo) return;
    
    setIsUploading(true);
    setUploadStatus('uploading');
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setUploadStatus('success');
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-300 hover:text-orange-400 transition-colors duration-200 mb-6"
          >
            <X size={20} />
            <span>Back</span>
          </button>
          
          <div className="text-center">
            <div className="flex justify-center items-center mb-6">
              <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-full p-4">
                <Film size={48} className="text-white" />
              </div>
            </div>
            <h1 className="text-5xl font-bold text-white mb-4">
              Upload Your Video
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Share your culinary creations with the community. Upload MP4 videos to showcase your cooking skills.
            </p>
          </div>
        </div>

        {/* Main Upload Section */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-800 rounded-2xl shadow-xl p-8 border border-slate-700">
            
            {!uploadedVideo ? (
              /* Upload Area */
              <div
                className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
                  dragActive
                    ? 'border-orange-400 bg-orange-500 bg-opacity-10'
                    : 'border-slate-600 hover:border-orange-400 hover:bg-slate-700'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="video/mp4,video/webm,video/ogg"
                  onChange={handleFileSelect}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                
                <div className="flex flex-col items-center gap-6">
                  <div className="w-24 h-24 bg-orange-500 bg-opacity-20 rounded-full flex items-center justify-center">
                    <Upload size={48} className="text-orange-400" />
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Drop your video here
                    </h3>
                    <p className="text-slate-300 mb-4">
                      or click to browse your files
                    </p>
                    <p className="text-sm text-slate-400">
                      Supports MP4, WebM, and OGG formats • Max size: 100MB
                    </p>
                  </div>
                  
                  <button className="px-8 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-amber-600 transition-all duration-200 shadow-lg hover:shadow-xl">
                    Choose Video File
                  </button>
                </div>
              </div>
            ) : (
              /* Video Preview and Details */
              <div className="space-y-6">
                {/* Video Preview */}
                <div className="relative bg-black rounded-xl overflow-hidden">
                  <video
                    src={videoPreview || ''}
                    controls
                    className="w-full h-64 md:h-96 object-contain"
                    poster=""
                  >
                    Your browser does not support the video tag.
                  </video>
                  
                  <button
                    onClick={removeVideo}
                    className="absolute top-4 right-4 p-2 bg-red-500 bg-opacity-80 text-white rounded-full hover:bg-red-600 transition-colors duration-200"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Video Details */}
                <div className="bg-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-500 bg-opacity-20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileVideo size={24} className="text-blue-400" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-white mb-2 truncate">
                        {uploadedVideo.name}
                      </h3>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-slate-400">Size:</span>
                          <div className="text-white font-medium">
                            {formatFileSize(uploadedVideo.size)}
                          </div>
                        </div>
                        
                        <div>
                          <span className="text-slate-400">Type:</span>
                          <div className="text-white font-medium">
                            {uploadedVideo.type}
                          </div>
                        </div>
                        
                        <div>
                          <span className="text-slate-400">Modified:</span>
                          <div className="text-white font-medium">
                            {new Date(uploadedVideo.lastModified).toLocaleDateString()}
                          </div>
                        </div>
                        
                        <div>
                          <span className="text-slate-400">Status:</span>
                          <div className="flex items-center gap-2">
                            {uploadStatus === 'success' && (
                              <>
                                <CheckCircle size={16} className="text-green-400" />
                                <span className="text-green-400 font-medium">Uploaded</span>
                              </>
                            )}
                            {uploadStatus === 'error' && (
                              <>
                                <AlertCircle size={16} className="text-red-400" />
                                <span className="text-red-400 font-medium">Error</span>
                              </>
                            )}
                            {uploadStatus === 'uploading' && (
                              <span className="text-orange-400 font-medium">Uploading...</span>
                            )}
                            {uploadStatus === 'idle' && (
                              <span className="text-slate-400 font-medium">Ready</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Upload Progress */}
                {uploadStatus === 'uploading' && (
                  <div className="bg-slate-700 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium">Uploading...</span>
                      <span className="text-orange-400 font-medium">{Math.round(uploadProgress)}%</span>
                    </div>
                    <div className="w-full bg-slate-600 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-orange-500 to-amber-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Upload Success */}
                {uploadStatus === 'success' && (
                  <div className="bg-green-500 bg-opacity-20 border border-green-500 rounded-xl p-6">
                    <div className="flex items-center gap-3">
                      <CheckCircle size={24} className="text-green-400" />
                      <div>
                        <h3 className="text-green-400 font-semibold">Upload Successful!</h3>
                        <p className="text-green-300 text-sm">Your video has been uploaded and is ready to share.</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  {uploadStatus !== 'success' && (
                    <button
                      onClick={simulateUpload}
                      disabled={isUploading}
                      className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${
                        isUploading
                          ? 'bg-slate-600 text-slate-400 cursor-not-allowed'
                          : 'bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600 shadow-lg hover:shadow-xl'
                      }`}
                    >
                      {isUploading ? 'Uploading...' : 'Upload Video'}
                    </button>
                  )}
                  
                  <button
                    onClick={removeVideo}
                    className="flex-1 sm:flex-none px-6 py-3 bg-slate-600 text-slate-300 rounded-xl font-semibold hover:bg-slate-500 hover:text-white transition-all duration-200"
                  >
                    Remove Video
                  </button>
                  
                  {uploadStatus === 'success' && (
                    <button className="flex-1 py-3 px-6 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-all duration-200">
                      Share Video
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Upload Guidelines */}
          <div className="mt-8 bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h2 className="text-xl font-bold text-white mb-4">Upload Guidelines</h2>
            <div className="grid md:grid-cols-2 gap-6 text-sm">
              <div>
                <h3 className="font-semibold text-orange-400 mb-2">Supported Formats</h3>
                <ul className="text-slate-300 space-y-1">
                  <li>• MP4 (recommended)</li>
                  <li>• WebM</li>
                  <li>• OGG</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-orange-400 mb-2">Requirements</h3>
                <ul className="text-slate-300 space-y-1">
                  <li>• Maximum file size: 100MB</li>
                  <li>• Minimum resolution: 720p</li>
                  <li>• Maximum duration: 10 minutes</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-orange-400 mb-2">Best Practices</h3>
                <ul className="text-slate-300 space-y-1">
                  <li>• Use good lighting</li>
                  <li>• Keep camera steady</li>
                  <li>• Show clear cooking steps</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-orange-400 mb-2">Content Policy</h3>
                <ul className="text-slate-300 space-y-1">
                  <li>• Food and cooking content only</li>
                  <li>• No copyrighted music</li>
                  <li>• Family-friendly content</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoUploadPage;