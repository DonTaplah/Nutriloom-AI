import React, { useState, useRef } from 'react';
import { Upload, Camera, X, CheckCircle, AlertCircle, Scan, Image, Eye, Brain, Zap, TrendingUp, Award, Crown } from 'lucide-react';
import { User } from '../types/User';
import { analyzeImage, DishAnalysisResult, getNutritionGradeColor, getHealthScoreColor } from '../services/imageAnalysis';

interface VideoUploadPageProps {
  onBack: () => void;
  user: User;
  onPricing: () => void;
}

const ScanYourDishPage: React.FC<VideoUploadPageProps> = ({ onBack, user, onPricing }) => {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [scanResults, setScanResults] = useState<DishAnalysisResult | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
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
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const analyzeImageWithAI = async () => {
    if (!uploadedImage) return;
    
    setIsUploading(true);
    setUploadStatus('uploading');
    setUploadProgress(0);
    setError(null);

    try {
      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + Math.random() * 20;
        });
      }, 300);

      // Analyze image with OpenAI
      const analysis = await analyzeImage(uploadedImage);
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      setScanResults(analysis);
      setUploadStatus('success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze image');
      setUploadStatus('error');
    } finally {
      setIsUploading(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <>
      {user.plan !== 'pro' ? (
        // Pro-only access gate
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 flex items-center justify-center">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-slate-300 hover:text-purple-400 transition-colors duration-200 mb-8"
            >
              <X size={20} />
              <span>Back</span>
            </button>
            
            <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl p-12 border border-purple-500/30">
              <div className="w-24 h-24 bg-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Scan size={48} className="text-white" />
              </div>
              
              <h1 className="text-4xl font-bold gradient-text-white mb-4">
                <span className="gradient-text-primary">SYD</span> - <span className="gradient-text-secondary">Scan Your Dish</span>
              </h1>
              
              <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Crown size={32} className="text-white" />
              </div>
              
              <h2 className="text-2xl font-bold gradient-text-purple mb-4">Pro Feature</h2>
              
              <p className="gradient-text-slate text-lg mb-8 leading-relaxed">
                SYD (Scan Your Dish) is an advanced AI-powered feature that analyzes your food photos to provide:
              </p>
              
              <div className="grid md:grid-cols-2 gap-4 mb-8 text-left">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span className="gradient-text-slate">Complete nutritional breakdown</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span className="gradient-text-slate">Ingredient identification</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span className="gradient-text-slate">Health scoring & grading</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span className="gradient-text-slate">Cooking method analysis</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span className="gradient-text-slate">Dietary flags & allergens</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span className="gradient-text-slate">AI recommendations</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={onPricing}
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Upgrade to Pro
                </button>
                <button
                  onClick={onBack}
                  className="px-8 py-4 bg-slate-700/60 border border-slate-600 text-slate-300 rounded-xl font-semibold hover:bg-slate-600/60 hover:text-white transition-all duration-200"
                >
                  Back to Home
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Original SYD functionality for Pro users
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
              <span className="gradient-text-primary">SYD</span> - <span className="gradient-text-secondary">Scan Your Dish</span>
            </h1>
            <p className="text-xl gradient-text-slate max-w-2xl mx-auto leading-relaxed">
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
                    <h3 className="text-2xl font-bold gradient-text-white mb-2">
                      Drop your dish photo here
                    </h3>
                    <p className="gradient-text-slate mb-4">
                      or click to browse your files
                    </p>
                    <p className="text-sm gradient-text-slate">
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
                      <h3 className="text-lg font-semibold gradient-text-white mb-2 truncate">
                        {uploadedImage.name}
                      </h3>
                      
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="gradient-text-slate">Size:</span>
                          <div className="gradient-text-white font-medium">
                            {formatFileSize(uploadedImage.size)}
                          </div>
                        </div>
                        
                        <div>
                          <span className="gradient-text-slate">Type:</span>
                          <div className="gradient-text-white font-medium">
                            {uploadedImage.type}
                          </div>
                        </div>
                        
                        <div>
                          <span className="gradient-text-slate">Modified:</span>
                          <div className="gradient-text-white font-medium">
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
                      <div className="flex items-center gap-2">
                        <Brain size={20} className="text-purple-400 animate-pulse" />
                        <span className="gradient-text-white font-medium">AI Analyzing Dish...</span>
                      </div>
                      <span className="gradient-text-purple font-medium">{Math.round(uploadProgress)}%</span>
                    </div>
                    <div className="w-full bg-slate-600 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                    <p className="gradient-text-slate text-sm mt-2">
                      Using advanced computer vision to identify ingredients, nutrition, and health metrics...
                    </p>
                  </div>
                )}

                {/* Error Display */}
                {uploadStatus === 'error' && error && (
                  <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-6">
                    <div className="flex items-center gap-3">
                      <AlertCircle size={24} className="text-red-400" />
                      <div>
                        <h3 className="text-red-400 font-semibold">Analysis Failed</h3>
                        <p className="text-red-300 text-sm">{error}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Scan Results */}
                {uploadStatus === 'success' && scanResults && (
                  <div className="space-y-6">
                    {/* Dish Identification */}
                    <div className="bg-gradient-to-r from-purple-500 to-indigo-500 bg-opacity-20 border border-purple-500 rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Brain size={24} className="text-purple-400" />
                        <div>
                          <h3 className="gradient-text-purple font-semibold text-lg">AI Analysis Complete!</h3>
                          <p className="gradient-text-white text-xl font-bold">{scanResults.dishName}</p>
                          <div className="flex items-center gap-4 mt-2">
                            <p className="gradient-text-purple text-sm">Confidence: {scanResults.confidence}%</p>
                            <p className="gradient-text-purple text-sm">Cuisine: {scanResults.cuisine}</p>
                            <p className="gradient-text-purple text-sm">Type: {scanResults.mealType}</p>
                          </div>
                        </div>
                      </div>
                      <p className="gradient-text-slate text-sm">{scanResults.description}</p>
                    </div>

                    {/* Ingredients Analysis */}
                    <div className="bg-slate-700 rounded-xl p-6">
                      <h3 className="gradient-text-white font-semibold text-lg mb-4 flex items-center gap-2">
                        <Zap size={20} className="text-yellow-400" />
                        Ingredient Analysis
                      </h3>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <h4 className="gradient-text-green font-medium mb-2">Primary Ingredients</h4>
                          <div className="space-y-1">
                            {scanResults.ingredients.primary.map((ingredient, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                <span className="gradient-text-slate text-sm">{ingredient}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="gradient-text-blue font-medium mb-2">Secondary Ingredients</h4>
                          <div className="space-y-1">
                            {scanResults.ingredients.secondary.map((ingredient, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                <span className="gradient-text-slate text-sm">{ingredient}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="gradient-text-purple font-medium mb-2">Seasonings & Spices</h4>
                          <div className="space-y-1">
                            {scanResults.ingredients.seasonings.map((ingredient, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                                <span className="gradient-text-slate text-sm">{ingredient}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Macro Breakdown */}
                    <div className="bg-slate-700 rounded-xl p-6">
                      <h3 className="gradient-text-white font-semibold text-lg mb-4">Macronutrient Breakdown</h3>
                      <div className="space-y-3">
                        {scanResults.macroBreakdown.map((macro, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className={`w-4 h-4 rounded-full ${macro.color}`}></div>
                              <span className="gradient-text-white font-medium">{macro.name}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="w-32 bg-slate-600 rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full ${macro.color}`}
                                  style={{ width: `${macro.percentage}%` }}
                                ></div>
                              </div>
                              <span className="gradient-text-slate text-sm w-12 text-right">{macro.percentage}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Nutrition Breakdown */}
                    <div className="bg-slate-700 rounded-xl p-6">
                      <h3 className="gradient-text-white font-semibold text-lg mb-4">Complete Nutritional Analysis</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold gradient-text-purple">{scanResults.nutritionalAnalysis.calories}</div>
                          <div className="gradient-text-slate text-sm">Calories</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold gradient-text-red">{scanResults.nutritionalAnalysis.protein}g</div>
                          <div className="gradient-text-slate text-sm">Protein</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold gradient-text-yellow">{scanResults.nutritionalAnalysis.carbs}g</div>
                          <div className="gradient-text-slate text-sm">Carbs</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold gradient-text-orange">{scanResults.nutritionalAnalysis.fat}g</div>
                          <div className="gradient-text-slate text-sm">Fat</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold gradient-text-green">{scanResults.nutritionalAnalysis.fiber}g</div>
                          <div className="gradient-text-slate text-sm">Fiber</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold gradient-text-pink">{scanResults.nutritionalAnalysis.sugar}g</div>
                          <div className="gradient-text-slate text-sm">Sugar</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold gradient-text-blue">{scanResults.nutritionalAnalysis.sodium}mg</div>
                          <div className="gradient-text-slate text-sm">Sodium</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold gradient-text-indigo">{scanResults.nutritionalAnalysis.cholesterol}mg</div>
                          <div className="gradient-text-slate text-sm">Cholesterol</div>
                        </div>
                      </div>
                    </div>

                    {/* Health Metrics */}
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 bg-opacity-20 border border-green-500 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="gradient-text-green font-semibold text-lg flex items-center gap-2">
                            <Award size={20} />
                            Health Metrics
                          </h3>
                          <p className="gradient-text-green text-sm">AI-powered nutritional assessment</p>
                        </div>
                        <div className="text-right">
                          <div className={`text-4xl font-bold ${getHealthScoreColor(scanResults.healthMetrics.healthScore)}`}>
                            {scanResults.healthMetrics.healthScore}/10
                          </div>
                          <div className={`text-lg font-semibold ${getNutritionGradeColor(scanResults.healthMetrics.nutritionGrade)}`}>
                            Grade: {scanResults.healthMetrics.nutritionGrade}
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="gradient-text-green font-medium mb-2">Dietary Flags</h4>
                          <div className="flex flex-wrap gap-2">
                            {scanResults.healthMetrics.dietaryFlags.map((flag, index) => (
                              <span key={index} className="px-2 py-1 bg-green-500/20 text-green-300 rounded-full text-xs">
                                {flag}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="gradient-text-orange font-medium mb-2">Allergens</h4>
                          <div className="flex flex-wrap gap-2">
                            {scanResults.healthMetrics.allergens.map((allergen, index) => (
                              <span key={index} className="px-2 py-1 bg-orange-500/20 text-orange-300 rounded-full text-xs">
                                {allergen}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Cooking Analysis */}
                    <div className="bg-slate-700 rounded-xl p-6">
                      <h3 className="gradient-text-white font-semibold text-lg mb-4 flex items-center gap-2">
                        <TrendingUp size={20} className="text-indigo-400" />
                        Cooking Analysis
                      </h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="gradient-text-indigo font-medium mb-2">Cooking Methods</h4>
                          <div className="space-y-1">
                            {scanResults.cookingAnalysis.cookingMethod.map((method, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
                                <span className="gradient-text-slate text-sm">{method}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="gradient-text-slate">Difficulty:</span>
                            <span className="gradient-text-white font-medium">{scanResults.cookingAnalysis.difficulty}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="gradient-text-slate">Cook Time:</span>
                            <span className="gradient-text-white font-medium">{scanResults.cookingAnalysis.estimatedCookTime} min</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="gradient-text-slate">Serving Size:</span>
                            <span className="gradient-text-white font-medium">{scanResults.cookingAnalysis.servingSize}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* AI Recommendations */}
                    <div className="bg-slate-700 rounded-xl p-6">
                      <h3 className="gradient-text-white font-semibold text-lg mb-4 flex items-center gap-2">
                        <Brain size={20} className="text-purple-400" />
                        AI Recommendations
                      </h3>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <h4 className="gradient-text-yellow font-medium mb-2">Improvements</h4>
                          <div className="space-y-1">
                            {scanResults.recommendations.improvements.map((improvement, index) => (
                              <div key={index} className="flex items-start gap-2">
                                <div className="w-2 h-2 bg-yellow-400 rounded-full mt-1.5 flex-shrink-0"></div>
                                <span className="gradient-text-slate text-sm">{improvement}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="gradient-text-blue font-medium mb-2">Perfect Pairings</h4>
                          <div className="space-y-1">
                            {scanResults.recommendations.pairings.map((pairing, index) => (
                              <div key={index} className="flex items-start gap-2">
                                <div className="w-2 h-2 bg-blue-400 rounded-full mt-1.5 flex-shrink-0"></div>
                                <span className="gradient-text-slate text-sm">{pairing}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="gradient-text-green font-medium mb-2">Healthy Alternatives</h4>
                          <div className="space-y-1">
                            {scanResults.recommendations.alternatives.map((alternative, index) => (
                              <div key={index} className="flex items-start gap-2">
                                <div className="w-2 h-2 bg-green-400 rounded-full mt-1.5 flex-shrink-0"></div>
                                <span className="gradient-text-slate text-sm">{alternative}</span>
                              </div>
                            ))}
                          </div>
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
                      onClick={analyzeImageWithAI}
                      disabled={isUploading}
                      className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${
                        isUploading
                          ? 'bg-slate-600 text-slate-400 cursor-not-allowed'
                          : 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:from-purple-600 hover:to-indigo-600 shadow-lg hover:shadow-xl'
                      }`}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <Brain size={20} />
                        {isUploading ? 'AI Analyzing...' : 'Start AI Analysis'}
                      </div>
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
                      Analyze Another Dish
                    </button>
                  )}
                  
                  {uploadStatus === 'error' && (
                    <button 
                      onClick={analyzeImageWithAI}
                      className="flex-1 py-3 px-6 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-all duration-200"
                    >
                      Try Again
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Scan Guidelines */}
          <div className="mt-8 bg-slate-800 rounded-xl p-6 border border-purple-500 border-opacity-30">
            <h2 className="text-xl font-bold gradient-text-white mb-4">AI Analysis Guidelines</h2>
            <div className="grid md:grid-cols-2 gap-6 text-sm">
              <div>
                <h3 className="font-semibold gradient-text-purple mb-2">Supported Formats</h3>
                <ul className="gradient-text-slate space-y-1">
                  <li>• JPG/JPEG (recommended)</li>
                  <li>• PNG</li>
                  <li>• WebP</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold gradient-text-purple mb-2">Requirements</h3>
                <ul className="gradient-text-slate space-y-1">
                  <li>• Maximum file size: 10MB</li>
                  <li>• Minimum resolution: 480p</li>
                  <li>• Clear, well-lit photos</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold gradient-text-purple mb-2">Best Practices</h3>
                <ul className="gradient-text-slate space-y-1">
                  <li>• Take photos from above</li>
                  <li>• Ensure good lighting</li>
                  <li>• Show the complete dish</li>
                  <li>• Avoid shadows and glare</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold gradient-text-purple mb-2">AI Analysis Features</h3>
                <ul className="gradient-text-slate space-y-1">
                  <li>• Advanced ingredient identification</li>
                  <li>• Complete nutritional analysis</li>
                  <li>• Health scoring & dietary flags</li>
                  <li>• Cooking method analysis</li>
                  <li>• Personalized recommendations</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      )}
    </>
  );
};

export default ScanYourDishPage;