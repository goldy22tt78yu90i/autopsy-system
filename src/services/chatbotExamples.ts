// Example: How to Extend the ChatBot Service
// This file demonstrates common customizations

import chatbotService from './chatbotService'
import type { IncidentData } from './chatbotService'

// Example 1: Adding custom incident summaries
export function getDetailedIncidentReport(severity: string) {
  const incidents = chatbotService.getAllIncidents()
  const filtered = incidents.filter((i) => i.severity === severity)
  return chatbotService.generateSummary(filtered)
}

// Example 2: Custom response for specific queries
export function handleCustomQuery(query: string): string {
  if (query.toLowerCase().includes('latest')) {
    const incidents = chatbotService.getAllIncidents()
    const latest = incidents.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, 5)
    return chatbotService.generateSummary(latest)
  }

  if (query.toLowerCase().includes('urgent') || query.toLowerCase().includes('emergency')) {
    const incidents = chatbotService.getAllIncidents()
    const urgent = incidents.filter((i) => i.severity === 'critical' || i.severity === 'high')
    return chatbotService.generateSummary(urgent)
  }

  // Fallback to default chatbot response
  return chatbotService.generateResponse(query)
}

// Example 3: Adding new incident types to the mock data
export function addNewIncidents() {
  const newIncidents: IncidentData[] = [
    {
      id: 'INC006',
      timestamp: '2026-04-27T15:00:00Z',
      type: 'object',
      description: 'Suspicious drone detected over restricted airspace',
      severity: 'critical',
      location: 'Sector 7, Airspace',
      confidence: 96.8,
      involved: { objects: ['Drone-Unknown-X1'] },
      status: 'active',
    },
    {
      id: 'INC007',
      timestamp: '2026-04-27T14:45:00Z',
      type: 'person',
      description: 'Multiple unauthorized personnel attempting gate breach',
      severity: 'high',
      location: 'East Gate',
      confidence: 97.2,
      involved: { people: ['Group-Intruders-5'] },
      status: 'active',
    },
  ]

  newIncidents.forEach((incident) => chatbotService.addIncident(incident))
}

// Example 4: Interactive demo with multiple queries
export function runDemoSession() {
  const testQueries = [
    'Show me all critical incidents',
    'What person incidents are active?',
    'Summarize incidents in Sector 7',
    'Tell me about suspicious objects',
    'How many high severity incidents are there?',
    'Show me resolved incidents',
  ]

  console.log('=== ChatBot Demo Session ===\n')

  testQueries.forEach((query, index) => {
    console.log(`Query ${index + 1}: "${query}"`)
    const response = chatbotService.generateResponse(query)
    console.log('Response:')
    console.log(response)
    console.log('\n---\n')
  })
}

// Example 5: Creating a filtered incident report
export function generateIncidentReport(filters: {
  severity?: string
  type?: string
  status?: string
  location?: string
}) {
  const incidents = chatbotService.getAllIncidents()

  let filtered = incidents

  if (filters.severity) {
    filtered = filtered.filter((i) => i.severity === filters.severity)
  }

  if (filters.type) {
    filtered = filtered.filter((i) => i.type === filters.type)
  }

  if (filters.status) {
    filtered = filtered.filter((i) => i.status === filters.status)
  }

  if (filters.location) {
    filtered = filtered.filter((i) => i.location.toLowerCase().includes(filters.location?.toLowerCase() || ''))
  }

  return {
    filters,
    count: filtered.length,
    incidents: filtered,
    summary: chatbotService.generateSummary(filtered),
  }
}

// Example 6: Export incident data to CSV format
export function exportIncidentsToCSV() {
  const incidents = chatbotService.getAllIncidents()

  let csv = 'ID,Type,Severity,Status,Location,Description,Confidence,Timestamp\n'

  incidents.forEach((incident) => {
    const row = [
      incident.id,
      incident.type,
      incident.severity,
      incident.status,
      incident.location,
      `"${incident.description}"`,
      incident.confidence,
      incident.timestamp,
    ].join(',')

    csv += row + '\n'
  })

  return csv
}

// Example 7: Get incident statistics
export function getIncidentStats() {
  const incidents = chatbotService.getAllIncidents()

  const stats = {
    total: incidents.length,
    bySeverity: {
      critical: incidents.filter((i) => i.severity === 'critical').length,
      high: incidents.filter((i) => i.severity === 'high').length,
      medium: incidents.filter((i) => i.severity === 'medium').length,
      low: incidents.filter((i) => i.severity === 'low').length,
    },
    byStatus: {
      active: incidents.filter((i) => i.status === 'active').length,
      resolved: incidents.filter((i) => i.status === 'resolved').length,
      pending: incidents.filter((i) => i.status === 'pending').length,
    },
    byType: {
      person: incidents.filter((i) => i.type === 'person').length,
      object: incidents.filter((i) => i.type === 'object').length,
      behavior: incidents.filter((i) => i.type === 'behavior').length,
    },
    averageConfidence: (incidents.reduce((sum, i) => sum + i.confidence, 0) / incidents.length).toFixed(1),
    locations: [...new Set(incidents.map((i) => i.location))],
  }

  return stats
}

// Example 8: Time-based incident analysis
export function getIncidentsByTimeRange(startDate: Date, endDate: Date) {
  const incidents = chatbotService.getAllIncidents()

  return incidents.filter((incident) => {
    const incidentTime = new Date(incident.timestamp)
    return incidentTime >= startDate && incidentTime <= endDate
  })
}

// Usage in React component:
/*
import { handleCustomQuery, getIncidentStats } from './chatbotExamples'

export function MyComponent() {
  const handleQuery = () => {
    const userInput = "Show urgent incidents"
    const response = handleCustomQuery(userInput)
    console.log(response)
  }

  const showStats = () => {
    const stats = getIncidentStats()
    console.log('Incident Statistics:', stats)
  }

  return (
    <div>
      <button onClick={handleQuery}>Get Response</button>
      <button onClick={showStats}>Show Stats</button>
    </div>
  )
}
*/
