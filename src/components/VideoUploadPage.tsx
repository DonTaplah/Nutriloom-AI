import React, { useState, useRef } from 'react';
import { Upload, Camera, X, CheckCircle, AlertCircle, Scan, Image, Eye } from 'lucide-react';

interface VideoUploadPageProps {
  onBack: () => void;
}

const ScanYourDishPage: React.FC<VideoUploadPageProps> = ({ onBack }) => {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [scanResults, setScanResults] = useState<any>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      setUploadedImage(file);
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      setUploadStatus('idle');
      setScanResults(null);
    } else {
      setUploadStatus('error');
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleImageUpload(file);
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
      handleImageUpload(file);
    }
  };

  const removeImage = () => {
    setUploadedImage(null);
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setImagePreview(null);
    setUploadStatus('idle');
    setUploadProgress(0);
    setScanResults(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const simulateUpload = () => {
    if (!uploadedImage) return;
    
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
          // Simulate food classification results
          setScanResults({
            dishName: 'Grilled Chicken Salad',
            confidence: 94,
            foodClasses: [
              { name: 'Protein', percentage: 45, color: 'bg-red-500' },
              { name: 'Vegetables', percentage: 35, color: 'bg-green-500' },
              { name: 'Carbohydrates', percentage: 15, color: 'bg-yellow-500' },
              { name: 'Fats', percentage: 5, color: 'bg-orange-500' }
            ],
            nutrition: {
              calories: 320,
              protein: 28,
              carbs: 12,
              fat: 18,
              fiber: 4
            },
            healthScore: 8.5
          });
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-300 hover:text-purple-400 transition-colors duration-200 mb-6"
          >
            <X size={20} />
            <span>Back</span>
          </button>
          
          <div className="text-center">
            <div className="flex justify-center items-center mb-6">
              <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full p-4">
                <Scan size={48} className="text-white" />
              </div>
            </div>
            <h1 className="text-5xl font-bold text-white mb-4">
              SYD - Scan Your Dish
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Discover the nutritional breakdown of your meals. Upload a photo of your dish and let AI analyze its food classes and nutritional content.
            </p>
          </div>
        </div>

        {/* Main Scan Section */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-800 rounded-2xl shadow-xl p-8 border border-purple-500 border-opacity-30">
            
            {!uploadedImage ? (
              /* Image Upload Area */
              <div
                className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
                  dragActive
                    ? 'border-purple-400 bg-purple-500 bg-opacity-10'
                    : 'border-slate-600 hover:border-purple-400 hover:bg-slate-700'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  onChange={handleFileSelect}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                
                <div className="flex flex-col items-center gap-6">
                  <div className="w-24 h-24 bg-purple-500 bg-opacity-20 rounded-full flex items-center justify-center">
                    <Camera size={48} className="text-purple-400" />
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Drop your dish photo here
                    </h3>
                    <p className="text-slate-300 mb-4">
                      or click to browse your files
                    </p>
                    <p className="text-sm text-slate-400">
                      Supports JPG, PNG, and WebP formats • Max size: 10MB
                    </p>
                  </div>
                  
                  <button className="px-8 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-indigo-600 transition-all duration-200 shadow-lg hover:shadow-xl">
                    Choose Image File
                  </button>
                </div>
              </div>
            ) : (
              /* Image Preview and Analysis */
              <div className="space-y-6">
                {/* Image Preview */}
                <div className="relative bg-black rounded-xl overflow-hidden">
                  <img
                    src={imagePreview || ''}
                    alt="Uploaded dish"
                    className="w-full h-64 md:h-96 object-contain"
                  />
                  
                  <button
                    onClick={removeImage}
                    className="absolute top-4 right-4 p-2 bg-red-500 bg-opacity-80 text-white rounded-full hover:bg-red-600 transition-colors duration-200"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Image Details */}
                <div className="bg-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-purple-500 bg-opacity-20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Image size={24} className="text-purple-400" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-white mb-2 truncate">
                        {uploadedImage.name}
                      </h3>
                      
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-slate-400">Size:</span>
                          <div className="text-white font-medium">
                            {formatFileSize(uploadedImage.size)}
                          </div>
                        </div>
                        
                        <div>
                          <span className="text-slate-400">Type:</span>
                          <div className="text-white font-medium">
                            {uploadedImage.type}
                          </div>
                        </div>
                        
                        <div>
                          <span className="text-slate-400">Modified:</span>
                          <div className="text-white font-medium">
                            {new Date(uploadedImage.lastModified).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Scan Progress */}
                {uploadStatus === 'uploading' && (
                  <div className="bg-slate-700 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium">Analyzing dish...</span>
                      <span className="text-purple-400 font-medium">{Math.round(uploadProgress)}%</span>
                    </div>
                    <div className="w-full bg-slate-600 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Scan Results */}
                {uploadStatus === 'success' && scanResults && (
                  <div className="space-y-6">
                    {/* Dish Identification */}
                    <div className="bg-gradient-to-r from-purple-500 to-indigo-500 bg-opacity-20 border border-purple-500 rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Eye size={24} className="text-purple-400" />
                        <div>
                          <h3 className="text-purple-400 font-semibold text-lg">Dish Identified!</h3>
                          <p className="text-white text-xl font-bold">{scanResults.dishName}</p>
                          <p className="text-purple-300 text-sm">Confidence: {scanResults.confidence}%</p>
                        </div>
                      </div>
                    </div>

                    {/* Food Classes */}
                    <div className="bg-slate-700 rounded-xl p-6">
                      <h3 className="text-white font-semibold text-lg mb-4">Food Classification</h3>
                      <div className="space-y-3">
                        {scanResults.foodClasses.map((foodClass: any, index: number) => (
                          <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className={`w-4 h-4 rounded-full ${foodClass.color}`}></div>
                              <span className="text-white font-medium">{foodClass.name}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="w-32 bg-slate-600 rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full ${foodClass.color}`}
                                  style={{ width: `${foodClass.percentage}%` }}
                                ></div>
                              </div>
                              <span className="text-slate-300 text-sm w-12 text-right">{foodClass.percentage}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Nutrition Breakdown */}
                    <div className="bg-slate-700 rounded-xl p-6">
                      <h3 className="text-white font-semibold text-lg mb-4">Nutritional Analysis</h3>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-400">{scanResults.nutrition.calories}</div>
                          <div className="text-slate-400 text-sm">Calories</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-red-400">{scanResults.nutrition.protein}g</div>
                          <div className="text-slate-400 text-sm">Protein</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-yellow-400">{scanResults.nutrition.carbs}g</div>
                          <div className="text-slate-400 text-sm">Carbs</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-orange-400">{scanResults.nutrition.fat}g</div>
                          <div className="text-slate-400 text-sm">Fat</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-400">{scanResults.nutrition.fiber}g</div>
                          <div className="text-slate-400 text-sm">Fiber</div>
                        </div>
                      </div>
                    </div>

                    {/* Health Score */}
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 bg-opacity-20 border border-green-500 rounded-xl p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-green-400 font-semibold text-lg">Health Score</h3>
                          <p className="text-green-300 text-sm">Based on nutritional balance and ingredients</p>
                        </div>
                        <div className="text-right">
                          <div className="text-4xl font-bold text-green-400">{scanResults.healthScore}/10</div>
                          <div className="text-green-300 text-sm">Excellent!</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Simple Success Message */}
                {uploadStatus === 'success' && !scanResults && (
                  <div className="bg-green-500 bg-opacity-20 border border-green-500 rounded-xl p-6">
                    <div className="flex items-center gap-3">
                      <CheckCircle size={24} className="text-green-400" />
                      <div>
                        <h3 className="text-green-400 font-semibold">Analysis Complete!</h3>
                        <p className="text-green-300 text-sm">Your dish has been analyzed successfully.</p>
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
                          : 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:from-purple-600 hover:to-indigo-600 shadow-lg hover:shadow-xl'
                      }`}
                    >
                      {isUploading ? 'Analyzing...' : 'Scan My Dish'}
                    </button>
                  )}
                  
                  <button
                    onClick={removeImage}
                    className="flex-1 sm:flex-none px-6 py-3 bg-slate-600 text-slate-300 rounded-xl font-semibold hover:bg-slate-500 hover:text-white transition-all duration-200"
                  >
                    Remove Image
                  </button>
                  
                  {uploadStatus === 'success' && (
                    <button 
                      onClick={removeImage}
                      className="flex-1 py-3 px-6 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-all duration-200"
                    >
                      Scan Another Dish
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Scan Guidelines */}
          <div className="mt-8 bg-slate-800 rounded-xl p-6 border border-purple-500 border-opacity-30">
            <h2 className="text-xl font-bold text-white mb-4">Scanning Guidelines</h2>
            <div className="grid md:grid-cols-2 gap-6 text-sm">
              <div>
                <h3 className="font-semibold text-purple-400 mb-2">Supported Formats</h3>
                <ul className="text-slate-300 space-y-1">
                  <li>• JPG/JPEG (recommended)</li>
                  <li>• PNG</li>
                  <li>• WebP</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-purple-400 mb-2">Requirements</h3>
                <ul className="text-slate-300 space-y-1">
                  <li>• Maximum file size: 10MB</li>
                  <li>• Minimum resolution: 480p</li>
                  <li>• Clear, well-lit photos</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-purple-400 mb-2">Best Practices</h3>
                <ul className="text-slate-300 space-y-1">
                  <li>• Take photos from above</li>
                  <li>• Ensure good lighting</li>
                  <li>• Show the complete dish</li>
                  <li>• Avoid shadows and glare</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-purple-400 mb-2">What We Analyze</h3>
                <ul className="text-slate-300 space-y-1">
                  <li>• Food classification</li>
                  <li>• Nutritional breakdown</li>
                  <li>• Ingredient identification</li>
                  <li>• Health score rating</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
