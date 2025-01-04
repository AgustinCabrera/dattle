import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Log {
  id: number
  timestamp: string
  level: string
  message: string
}

const logs: Log[] = [
  { id: 1, timestamp: '2023-05-01 10:30:00', level: 'INFO', message: 'User login successful' },
  { id: 2, timestamp: '2023-05-01 11:15:00', level: 'WARNING', message: 'Failed login attempt' },
  { id: 3, timestamp: '2023-05-01 12:00:00', level: 'ERROR', message: 'Database connection failed' },
  { id: 4, timestamp: '2023-05-01 13:45:00', level: 'INFO', message: 'New animal registered' },
  { id: 5, timestamp: '2023-05-01 14:30:00', level: 'WARNING', message: 'Low storage space' },
]

export function SystemLogs() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">System Logs</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Timestamp</TableHead>
            <TableHead>Level</TableHead>
            <TableHead>Message</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logs.map((log) => (
            <TableRow key={log.id}>
              <TableCell>{log.timestamp}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  log.level === 'INFO' ? 'bg-blue-100 text-blue-800' :
                  log.level === 'WARNING' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {log.level}
                </span>
              </TableCell>
              <TableCell>{log.message}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

