'use client'

import { useState } from 'react'
import { Surface } from '@/components/ui/Surface'
import { ChevronDown, ChevronRight, Check } from 'lucide-react'

export default function TraceViewTestsPage() {
  const [activeTab, setActiveTab] = useState<'timeline' | 'tree' | 'waterfall'>('timeline')
  
  const sampleCode = `function processData(input) {
  // Start processing
  console.time('processData');
  
  // Parse input
  const data = JSON.parse(input);
  
  // Filter relevant items
  const filteredItems = data.items.filter(item => {
    return item.active && item.value > 10;
  });
  
  // Calculate results
  let result = 0;
  for (const item of filteredItems) {
    result += complexCalculation(item);
  }
  
  // Format output
  const output = { 
    result,
    count: filteredItems.length,
    timestamp: new Date().toISOString()
  };
  
  console.timeEnd('processData');
  return output;
}

function complexCalculation(item) {
  // This is an expensive operation
  console.time('complexCalculation');
  let value = item.value;
  
  for (let i = 0; i < 1000; i++) {
    value = Math.sqrt(value * item.coefficient);
  }
  
  console.timeEnd('complexCalculation');
  return value;
}`

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 flex">
      {/* Left Panel - Correlation Guess UI */}
      <div className="flex-1 overflow-auto p-0 bg-white dark:bg-slate-900">
        <div className="max-w-3xl mx-auto p-4">
          {/* Task Header with Checkbox */}
          <div className="flex items-start mb-4">
            <div className="mr-2 mt-1">
              <div className="w-5 h-5 bg-green-100 dark:bg-green-900 border border-green-600 dark:border-green-400 rounded flex items-center justify-center">
                <Check className="w-3 h-3 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <div>
              <h2 className="text-base font-medium mb-1">Correlation Guess</h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                Analyze two sets of values (data and y) and provide a guess about whether they have a correlation.
              </p>
              <div className="flex items-center">
                <button className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs px-3 py-1 rounded-md hover:bg-slate-50 dark:hover:bg-slate-700 mr-2">
                  Cancel
                </button>
                <button className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs px-3 py-1 rounded-md hover:bg-slate-50 dark:hover:bg-slate-700">
                  Output 1
                </button>
                <div className="ml-auto flex items-center text-xs text-slate-500">
                  <span>See All</span>
                  <ChevronDown className="w-4 h-4 ml-1" />
                </div>
              </div>
            </div>
          </div>

          {/* Description Box */}
          <div className="mb-4 p-3 text-sm border border-slate-200 dark:border-slate-700 rounded-md">
            <p>This is a data cleaning assistant. Read exactly *500* raw text ratings and convert to data={"{0, 1, 2, ..., data.length-1}"}, for vectors x, and record every rating in order as y.</p>
          </div>

          {/* Inputs Section */}
          <div className="mb-6">
            <div className="flex items-center mb-2">
              <label className="text-xs uppercase font-medium text-slate-500 dark:text-slate-400">Inputs</label>
              <div className="border-t border-slate-200 dark:border-slate-700 flex-grow ml-3"></div>
            </div>
            <div className="mb-4">
              <p className="text-xs text-green-600 dark:text-green-400 my-1">&lt;data&gt;</p>
              <code className="block text-xs text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 p-2 rounded-md mb-1">[data]=[0,1,2,3,4,5,...]</code>
              <p className="text-xs text-green-600 dark:text-green-400 my-1">&lt;/data&gt;</p>
            </div>
            <div>
              <p className="text-xs text-green-600 dark:text-green-400 my-1">&lt;ratings&gt;</p>
              <code className="block text-xs text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 p-2 rounded-md mb-1">[ratings]=[3.4, 2.7, 4.1, 3.3, 4.8, ...]</code>
              <p className="text-xs text-green-600 dark:text-green-400 my-1">&lt;/ratings&gt;</p>
            </div>
          </div>

          {/* Plan Section */}
          <div className="mb-6">
            <p className="text-sm mb-2">Given the ratings (list), you plan the following relation metrics {"{r, slope, and intercept}"} using a simple model.</p>
            
            <div className="p-3 border border-slate-200 dark:border-slate-700 rounded-md mb-3">
              <h3 className="text-sm font-medium mb-2">INSTRUCTION (follow in order):</h3>
              <ol className="pl-6 list-decimal space-y-4 text-sm">
                <li>
                  <p className="font-medium">Correlation: I will start out by finding with the corr_coeff (r):</p>
                  <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">
                    - Calculate r = sum((x_i - x_mean) * (y_i - y_mean)) / sqrt(sum((x_i - x_mean)²) * sum((y_i - y_mean)²))
                  </p>
                </li>
                <li>
                  <p className="font-medium">Regression: I need to do r.i . rank(data1,data2), so I need to find:</p>
                  <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">
                    - slope = sum((x_i - x_mean) * (y_i - y_mean)) / sum((x_i - x_mean)²)<br />
                    - intercept = y_mean - slope * x_mean
                  </p>
                </li>
                <li>
                  <p className="font-medium">Interpret your guess. A decent metric to tell r &gt; 0 with sufficiently data samples is if r &gt; sqrt(4/n) + 0.2, where n is the number of data points.</p>
                  <ul className="list-disc pl-5 mt-1 text-sm text-slate-700 dark:text-slate-300">
                    <li>If r is close to 0, there's probably no (or very insignificant) correlation</li>
                    <li>If |r| &gt; sqrt(4/n) + 0.2, there likely is a real (and likely linear) trend.</li>
                    <li>If r is close to 1 or -1, the model might even be predictive already.</li>
                  </ul>
                </li>
              </ol>
            </div>

            <div className="text-sm text-slate-700 dark:text-slate-300">
              <p className="mb-1">Step 1: Calculate all metrics, including r, slope, and intercept.</p>
              <p className="mb-1">Step 2: Compare with the critical r value (4/n) + 0.2 where n=data.length to make conclusions.</p>
              <p className="mb-1">Step 3: Output your guess about correlation, with appropriate confidence level.</p>
              <p>Step 4: Give advice on what further analysis might help if needed.</p>
            </div>
          </div>

          {/* Results Section */}
          <div className="mb-6">
            <div className="flex items-center mb-2">
              <label className="text-xs uppercase font-medium text-slate-500 dark:text-slate-400">Results</label>
              <div className="border-t border-slate-200 dark:border-slate-700 flex-grow ml-3"></div>
            </div>
            
            <div className="p-3 border border-slate-200 dark:border-slate-700 rounded-md mb-3">
              <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">
                You are a statistical assistant whose TASK? (attach data, a sample of values) is to run the correlation function (r). You will examine whether $DATA_matches$RATINGS.
              </p>
              
              <div className="bg-green-50 dark:bg-green-900/30 p-3 rounded-md mb-3">
                <div className="font-medium text-green-700 dark:text-green-400 text-sm">Output:</div>
                <p className="text-sm text-green-700 dark:text-green-400 mt-1">r = 0.9927</p>
              </div>
              
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Since r is extremely close to 1, there is a very strong positive linear correlation between the two variables. The data points follow an almost perfect straight line with a positive slope of 1.1754.
              </p>
            </div>
          </div>

          {/* Trace/Debug Section */}
          <div className="mb-6">
            <div className="flex items-center mb-2">
              <label className="text-xs uppercase font-medium text-slate-500 dark:text-slate-400">Debug</label>
              <div className="border-t border-slate-200 dark:border-slate-700 flex-grow ml-3"></div>
            </div>
            
            <div className="p-3 border border-slate-200 dark:border-slate-700 rounded-md">
              <div className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                <p>
                  <span className="text-blue-500">•</span> Calculated mean values: data = 5.5, y = 10.35
                </p>
                <p>
                  <span className="text-blue-500">•</span> Calculated standard deviations: data = 3.03, y = 3.57
                </p>
                <p>
                  <span className="text-purple-500">•</span> Correlation coefficient (r) = 0.9927
                </p>
                <p>
                  <span className="text-purple-500">•</span> p-value = 3.42e-9 (statistically significant)
                </p>
                <p>
                  <span className="text-red-500">•</span> Linear regression: y = 1.1754x + 3.872
                </p>
              </div>
            </div>
          </div>

          {/* Variables Section */}
          <div>
            <div className="flex items-center mb-2">
              <label className="text-xs uppercase font-medium text-slate-500 dark:text-slate-400">Variables</label>
              <div className="border-t border-slate-200 dark:border-slate-700 flex-grow ml-3"></div>
            </div>
            
            <div className="grid grid-cols-3 gap-2">
              <div className="p-2 border border-slate-200 dark:border-slate-700 rounded-md">
                <span className="block text-xs text-slate-500 mb-1">data</span>
                <code className="text-xs bg-slate-100 dark:bg-slate-700 px-1 py-0.5 rounded block truncate">
                  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
                </code>
              </div>
              <div className="p-2 border border-slate-200 dark:border-slate-700 rounded-md">
                <span className="block text-xs text-slate-500 mb-1">y</span>
                <code className="text-xs bg-slate-100 dark:bg-slate-700 px-1 py-0.5 rounded block truncate">
                  [5.1, 6.3, 7.8, 8.2, 9.6, 11.1, 12.5, 13.0, 14.2, 15.7]
                </code>
              </div>
              <div className="p-2 border border-slate-200 dark:border-slate-700 rounded-md">
                <span className="block text-xs text-slate-500 mb-1">correlation</span>
                <code className="text-xs bg-slate-100 dark:bg-slate-700 px-1 py-0.5 rounded block truncate">
                  0.9927
                </code>
              </div>
              <div className="p-2 border border-slate-200 dark:border-slate-700 rounded-md">
                <span className="block text-xs text-slate-500 mb-1">slope</span>
                <code className="text-xs bg-slate-100 dark:bg-slate-700 px-1 py-0.5 rounded block truncate">
                  1.1754
                </code>
              </div>
              <div className="p-2 border border-slate-200 dark:border-slate-700 rounded-md">
                <span className="block text-xs text-slate-500 mb-1">intercept</span>
                <code className="text-xs bg-slate-100 dark:bg-slate-700 px-1 py-0.5 rounded block truncate">
                  3.872
                </code>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Trace Visualization */}
      <div className="w-[480px] border-l border-slate-200 dark:border-slate-800 overflow-auto">
        <div className="p-4">
          <div className="flex space-x-2 mb-4">
            <button 
              className={`px-3 py-1.5 text-xs font-medium rounded-md ${
                activeTab === 'timeline' 
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' 
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}
              onClick={() => setActiveTab('timeline')}
            >
              Timeline
            </button>
            <button 
              className={`px-3 py-1.5 text-xs font-medium rounded-md ${
                activeTab === 'tree' 
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' 
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}
              onClick={() => setActiveTab('tree')}
            >
              Tree
            </button>
            <button 
              className={`px-3 py-1.5 text-xs font-medium rounded-md ${
                activeTab === 'waterfall' 
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' 
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}
              onClick={() => setActiveTab('waterfall')}
            >
              Waterfall
            </button>
          </div>

          <Surface className="mb-4">
            {activeTab === 'timeline' && (
              <div className="p-4">
                <h3 className="text-sm font-medium mb-3">Timeline View</h3>
                <div className="space-y-2">
                  <div className="h-8 bg-blue-100 dark:bg-blue-900 rounded-sm relative px-2 flex items-center">
                    <span className="text-xs text-blue-800 dark:text-blue-300">processData (1253ms)</span>
                  </div>
                  <div className="h-8 bg-green-100 dark:bg-green-900 rounded-sm ml-4 relative px-2 flex items-center">
                    <span className="text-xs text-green-800 dark:text-green-300">JSON.parse (45ms)</span>
                  </div>
                  <div className="h-8 bg-purple-100 dark:bg-purple-900 rounded-sm ml-4 relative px-2 flex items-center">
                    <span className="text-xs text-purple-800 dark:text-purple-300">filter (120ms)</span>
                  </div>
                  <div className="h-8 bg-red-100 dark:bg-red-900 rounded-sm ml-4 relative px-2 flex items-center">
                    <span className="text-xs text-red-800 dark:text-red-300">complexCalculation (988ms)</span>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'tree' && (
              <div className="p-4">
                <h3 className="text-sm font-medium mb-3">Tree View</h3>
                <ul className="pl-5 border-l border-slate-200 dark:border-slate-700 space-y-2">
                  <li className="text-xs">
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                      <span className="font-medium">processData</span>
                      <span className="ml-2 text-slate-500">1253ms</span>
                    </div>
                    <ul className="pl-5 border-l border-slate-200 dark:border-slate-700 mt-2 space-y-2">
                      <li className="text-xs">
                        <div className="flex items-center">
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                          <span className="font-medium">JSON.parse</span>
                          <span className="ml-2 text-slate-500">45ms</span>
                        </div>
                      </li>
                      <li className="text-xs">
                        <div className="flex items-center">
                          <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                          <span className="font-medium">filter</span>
                          <span className="ml-2 text-slate-500">120ms</span>
                        </div>
                      </li>
                      <li className="text-xs">
                        <div className="flex items-center">
                          <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                          <span className="font-medium">complexCalculation</span>
                          <span className="ml-2 text-slate-500">988ms</span>
                        </div>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            )}
            
            {activeTab === 'waterfall' && (
              <div className="p-4">
                <h3 className="text-sm font-medium mb-3">Waterfall View</h3>
                <div className="space-y-2 relative">
                  <div className="flex items-center h-6">
                    <span className="w-24 text-xs">processData</span>
                    <div className="flex-1 relative h-4">
                      <div className="absolute top-0 left-0 bg-blue-200 dark:bg-blue-800 h-full rounded-sm" style={{width: '100%'}}></div>
                    </div>
                    <span className="ml-2 text-xs text-slate-500">1253ms</span>
                  </div>
                  <div className="flex items-center h-6">
                    <span className="w-24 text-xs">JSON.parse</span>
                    <div className="flex-1 relative h-4">
                      <div className="absolute top-0 left-0 bg-green-200 dark:bg-green-800 h-full rounded-sm" style={{width: '3.6%', marginLeft: '0.8%'}}></div>
                    </div>
                    <span className="ml-2 text-xs text-slate-500">45ms</span>
                  </div>
                  <div className="flex items-center h-6">
                    <span className="w-24 text-xs">filter</span>
                    <div className="flex-1 relative h-4">
                      <div className="absolute top-0 left-0 bg-purple-200 dark:bg-purple-800 h-full rounded-sm" style={{width: '9.6%', marginLeft: '4.8%'}}></div>
                    </div>
                    <span className="ml-2 text-xs text-slate-500">120ms</span>
                  </div>
                  <div className="flex items-center h-6">
                    <span className="w-24 text-xs">complexCalc</span>
                    <div className="flex-1 relative h-4">
                      <div className="absolute top-0 left-0 bg-red-200 dark:bg-red-800 h-full rounded-sm" style={{width: '78.8%', marginLeft: '14.8%'}}></div>
                    </div>
                    <span className="ml-2 text-xs text-slate-500">988ms</span>
                  </div>
                </div>
              </div>
            )}
          </Surface>

          <Surface className="p-4">
            <h3 className="text-xs font-medium mb-3">Selected Span</h3>
            <div className="space-y-2">
              <div>
                <label className="block text-xs mb-1 text-slate-600 dark:text-slate-400">Name</label>
                <div className="text-sm font-medium">complexCalculation</div>
              </div>
              <div>
                <label className="block text-xs mb-1 text-slate-600 dark:text-slate-400">Duration</label>
                <div className="text-sm font-medium">988 ms</div>
              </div>
              <div>
                <label className="block text-xs mb-1 text-slate-600 dark:text-slate-400">Start Time</label>
                <div className="text-sm font-medium">185 ms</div>
              </div>
              <div>
                <label className="block text-xs mb-1 text-slate-600 dark:text-slate-400">Function</label>
                <div className="text-sm font-medium flex items-center">
                  <span className="text-blue-500 mr-1">complexCalculation</span>
                  <span className="text-xs text-slate-500">line 26</span>
                </div>
              </div>
            </div>
          </Surface>
        </div>
      </div>
    </div>
  )
} 