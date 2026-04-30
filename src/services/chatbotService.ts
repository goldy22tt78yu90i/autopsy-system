// Mock incident data structure
export interface IncidentData {
  id: string
  timestamp: string
  type: 'object' | 'person' | 'behavior'
  description: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  location: string
  confidence: number
  involved: {
    objects?: string[]
    people?: string[]
  }
  status: 'active' | 'resolved' | 'pending'
}

// Mock incident database
const mockIncidents: IncidentData[] = [
  {
    id: 'INC001',
    timestamp: '2026-04-27T14:30:00Z',
    type: 'person',
    description: 'Unauthorized person detected in restricted zone',
    severity: 'high',
    location: 'Sector 7, Gate A',
    confidence: 98.5,
    involved: { people: ['Person-A-7392'] },
    status: 'active',
  },
  {
    id: 'INC002',
    timestamp: '2026-04-27T13:15:00Z',
    type: 'object',
    description: 'Unidentified package left at entrance',
    severity: 'critical',
    location: 'Main Entrance',
    confidence: 99.2,
    involved: { objects: ['Package-Unknown'] },
    status: 'pending',
  },
  {
    id: 'INC003',
    timestamp: '2026-04-27T12:00:00Z',
    type: 'behavior',
    description: 'Loitering detected near perimeter',
    severity: 'medium',
    location: 'East Perimeter',
    confidence: 87.3,
    involved: { people: ['Person-B-1203'] },
    status: 'resolved',
  },
  {
    id: 'INC004',
    timestamp: '2026-04-27T11:20:00Z',
    type: 'object',
    description: 'Suspicious vehicle identified',
    severity: 'medium',
    location: 'Parking Lot B',
    confidence: 92.1,
    involved: { objects: ['Vehicle-VAN-4521'] },
    status: 'active',
  },
  {
    id: 'INC005',
    timestamp: '2026-04-27T10:05:00Z',
    type: 'person',
    description: 'Crowd gathering detected',
    severity: 'low',
    location: 'Sector 3, Plaza',
    confidence: 95.8,
    involved: { people: ['Group-Sector3'] },
    status: 'resolved',
  },
]

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface FilterCriteria {
  type?: 'object' | 'person' | 'behavior'
  severity?: string
  status?: string
  location?: string
  keyword?: string
}

class ChatBotService {
  private incidents: IncidentData[] = mockIncidents

  /**
   * Parse user query and extract filter criteria
   */
  parseQuery(query: string): FilterCriteria {
    const lowerQuery = query.toLowerCase()
    const criteria: FilterCriteria = {}

    // Detect incident type
    if (lowerQuery.includes('person') || lowerQuery.includes('people')) {
      criteria.type = 'person'
    } else if (lowerQuery.includes('object') || lowerQuery.includes('package') || lowerQuery.includes('vehicle')) {
      criteria.type = 'object'
    } else if (lowerQuery.includes('behavior') || lowerQuery.includes('loitering') || lowerQuery.includes('crowd')) {
      criteria.type = 'behavior'
    }

    // Detect severity level
    if (lowerQuery.includes('critical')) {
      criteria.severity = 'critical'
    } else if (lowerQuery.includes('high')) {
      criteria.severity = 'high'
    } else if (lowerQuery.includes('medium')) {
      criteria.severity = 'medium'
    } else if (lowerQuery.includes('low')) {
      criteria.severity = 'low'
    }

    // Detect status
    if (lowerQuery.includes('active') || lowerQuery.includes('ongoing')) {
      criteria.status = 'active'
    } else if (lowerQuery.includes('resolved')) {
      criteria.status = 'resolved'
    } else if (lowerQuery.includes('pending')) {
      criteria.status = 'pending'
    }

    // Detect location keywords
    if (lowerQuery.includes('sector')) {
      const sectorMatch = query.match(/sector\s+\d+/i)
      if (sectorMatch) {
        criteria.location = sectorMatch[0]
      }
    } else if (lowerQuery.includes('entrance') || lowerQuery.includes('gate')) {
      criteria.location = 'Entrance'
    } else if (lowerQuery.includes('perimeter')) {
      criteria.location = 'Perimeter'
    } else if (lowerQuery.includes('parking')) {
      criteria.location = 'Parking'
    }

    // Keep original query as keyword fallback
    criteria.keyword = query

    return criteria
  }

  /**
   * Filter incidents based on criteria
   */
  filterIncidents(criteria: FilterCriteria): IncidentData[] {
    return this.incidents.filter((incident) => {
      if (criteria.type && incident.type !== criteria.type) return false
      if (criteria.severity && incident.severity !== criteria.severity) return false
      if (criteria.status && incident.status !== criteria.status) return false
      if (criteria.location && !incident.location.toLowerCase().includes(criteria.location.toLowerCase())) {
        return false
      }
      return true
    })
  }

  /**
   * Generate a summary of incidents
   */
  generateSummary(incidents: IncidentData[]): string {
    if (incidents.length === 0) {
      return 'No incidents found matching your criteria.'
    }

    const totalIncidents = incidents.length
    const criticalCount = incidents.filter((i) => i.severity === 'critical').length
    const highCount = incidents.filter((i) => i.severity === 'high').length
    const activeCount = incidents.filter((i) => i.status === 'active').length
    const avgConfidence = (incidents.reduce((sum, i) => sum + i.confidence, 0) / totalIncidents).toFixed(1)

    const locations = [...new Set(incidents.map((i) => i.location))].join(', ')
    const types = [...new Set(incidents.map((i) => i.type))].join(', ')

    let summary = `**Incident Summary** (${totalIncidents} total)\n\n`
    summary += `📊 **Statistics:**\n`
    summary += `• Total Incidents: ${totalIncidents}\n`
    summary += `• Active: ${activeCount} | Resolved: ${incidents.filter((i) => i.status === 'resolved').length}\n`
    summary += `• Critical: ${criticalCount} | High: ${highCount}\n`
    summary += `• Average Confidence: ${avgConfidence}%\n\n`

    summary += `📍 **Locations:** ${locations}\n`
    summary += `🏷️ **Types:** ${types}\n\n`

    summary += `**Detailed Incidents:**\n`
    incidents.forEach((incident, index) => {
      const severityEmoji =
        {
          critical: '🔴',
          high: '🟠',
          medium: '🟡',
          low: '🟢',
        }[incident.severity] || '⚪'

      summary += `${index + 1}. ${severityEmoji} **[${incident.id}]** ${incident.description}\n`
      summary += `   └─ Location: ${incident.location} | Confidence: ${incident.confidence}% | Status: ${incident.status}\n`
    })

    return summary
  }

  /**
   * Generate chatbot response based on user query
   */
  generateResponse(query: string): string {
    const criteria = this.parseQuery(query)
    const filteredIncidents = this.filterIncidents(criteria)
    return this.generateSummary(filteredIncidents)
  }

  /**
   * Get all incidents (for reference)
   */
  getAllIncidents(): IncidentData[] {
    return this.incidents
  }

  /**
   * Add a new incident (for future integration with real API)
   */
  addIncident(incident: IncidentData): void {
    this.incidents.push(incident)
  }
}

export default new ChatBotService()
