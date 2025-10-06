'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, ScatterChart, Scatter } from 'recharts'

interface DataPoint {
  timestamp: string
  events: number
  latency: number
  errors: number
  throughput: number
}

const generateMockData = (): DataPoint[] => {
  const data: DataPoint[] = []
  const baseTime = Date.now() - (24 * 60 * 60 * 1000) // 24 hours ago
  
  for (let i = 0; i < 24; i++) {
    const timestamp = new Date(baseTime + (i * 60 * 60 * 1000)).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
    
    data.push({
      timestamp,
      events: Math.floor(Math.random() * 1000000) + 500000,
      latency: Math.random() * 100 + 50,
      errors: Math.floor(Math.random() * 1000),
      throughput: Math.random() * 5000 + 8000
    })
  }
  
  return data
}

const pieData = [
  { name: 'Successful', value: 94.5, color: '#00ff00' },
  { name: 'Retries', value: 4.2, color: '#ffff00' },
  { name: 'Failed', value: 1.3, color: '#ff0000' }
]

const scatterData = Array.from({ length: 50 }, () => ({
  x: Math.random() * 100,
  y: Math.random() * 100,
  z: Math.random() * 1000
}))

export default function DataVizDemo() {
  const [data, setData] = useState<DataPoint[]>([])
  const [activeChart, setActiveChart] = useState<'line' | 'bar' | 'pie' | 'scatter'>('line')
  const [isLive, setIsLive] = useState(false)

  const mockData = useMemo(() => generateMockData(), [])

  useEffect(() => {
    setData(mockData)
  }, [mockData])

  useEffect(() => {
    let interval: NodeJS.Timeout
    
    if (isLive) {
      interval = setInterval(() => {
        setData(prevData => {
          const newData = [...prevData]
          const lastTimestamp = new Date()
          
          newData.push({
            timestamp: lastTimestamp.toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit' 
            }),
            events: Math.floor(Math.random() * 1000000) + 500000,
            latency: Math.random() * 100 + 50,
            errors: Math.floor(Math.random() * 1000),
            throughput: Math.random() * 5000 + 8000
          })
          
          return newData.slice(-24)
        })
      }, 2000)
    }
    
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isLive])

  const chartVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 }
  }

  return (
    <div className="bg-gray-900 border border-green-600 rounded-lg p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-cyan-400">Real-time Data Pipeline Dashboard</h3>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsLive(!isLive)}
              className={`px-4 py-2 rounded-lg font-bold transition-all ${
                isLive 
                  ? 'bg-red-600 text-white hover:bg-red-500' 
                  : 'bg-green-600 text-black hover:bg-green-500'
              }`}
            >
              {isLive ? '⏸ Pause Live Data' : '▶ Start Live Data'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-black border border-cyan-400 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-cyan-400">
              {data.length > 0 ? (data[data.length - 1]?.events || 0).toLocaleString() : '0'}
            </div>
            <div className="text-sm text-gray-400">Events/Hour</div>
          </div>
          
          <div className="bg-black border border-green-400 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-400">
              {data.length > 0 ? Math.round(data[data.length - 1]?.latency || 0) : '0'}ms
            </div>
            <div className="text-sm text-gray-400">Avg Latency</div>
          </div>
          
          <div className="bg-black border border-yellow-400 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-yellow-400">
              {data.length > 0 ? (data[data.length - 1]?.throughput || 0).toFixed(1) : '0'}K
            </div>
            <div className="text-sm text-gray-400">Throughput/sec</div>
          </div>
          
          <div className="bg-black border border-red-400 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-red-400">
              {data.length > 0 ? data[data.length - 1]?.errors || 0 : '0'}
            </div>
            <div className="text-sm text-gray-400">Errors</div>
          </div>
        </div>

        <div className="flex gap-2 mb-6">
          {(['line', 'bar', 'pie', 'scatter'] as const).map((chartType) => (
            <button
              key={chartType}
              onClick={() => setActiveChart(chartType)}
              className={`px-4 py-2 rounded-lg font-bold transition-all capitalize ${
                activeChart === chartType
                  ? 'bg-cyan-600 text-black'
                  : 'border border-cyan-600 text-cyan-400 hover:bg-cyan-900'
              }`}
            >
              {chartType} Chart
            </button>
          ))}
        </div>
      </div>

      <motion.div
        key={activeChart}
        variants={chartVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.3 }}
        className="h-80"
      >
        <ResponsiveContainer width="100%" height="100%">
          {activeChart === 'line' && (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis 
                dataKey="timestamp" 
                stroke="#64748b"
                fontSize={12}
              />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid #06b6d4',
                  borderRadius: '8px',
                  color: '#f1f5f9'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="events" 
                stroke="#00ffff" 
                strokeWidth={2}
                name="Events"
              />
              <Line 
                type="monotone" 
                dataKey="latency" 
                stroke="#ff00ff" 
                strokeWidth={2}
                name="Latency (ms)"
              />
            </LineChart>
          )}

          {activeChart === 'bar' && (
            <BarChart data={data.slice(-12)}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="timestamp" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid #06b6d4',
                  borderRadius: '8px',
                  color: '#f1f5f9'
                }}
              />
              <Legend />
              <Bar dataKey="throughput" fill="#00ff00" name="Throughput" />
              <Bar dataKey="errors" fill="#ff0000" name="Errors" />
            </BarChart>
          )}

          {activeChart === 'pie' && (
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid #06b6d4',
                  borderRadius: '8px',
                  color: '#f1f5f9'
                }}
              />
            </PieChart>
          )}

          {activeChart === 'scatter' && (
            <ScatterChart data={scatterData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis 
                type="number" 
                dataKey="x" 
                stroke="#64748b" 
                fontSize={12}
                name="Feature A"
              />
              <YAxis 
                type="number" 
                dataKey="y" 
                stroke="#64748b" 
                fontSize={12}
                name="Feature B"
              />
              <Tooltip 
                cursor={{ strokeDasharray: '3 3' }}
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid #06b6d4',
                  borderRadius: '8px',
                  color: '#f1f5f9'
                }}
              />
              <Scatter dataKey="z" fill="#ffff00" />
            </ScatterChart>
          )}
        </ResponsiveContainer>
      </motion.div>

      <div className="mt-6 text-sm text-gray-400">
        <p className="mb-2">
          <span className="text-yellow-400">Demo:</span> This dashboard shows real-time metrics from a data pipeline processing millions of events.
          The visualization updates automatically and supports multiple chart types for different analytical perspectives.
        </p>
        <p>
          <span className="text-cyan-400">Technologies:</span> Apache Kafka, Apache Spark, PostgreSQL, Redis, Docker, Kubernetes
        </p>
      </div>
    </div>
  )
}